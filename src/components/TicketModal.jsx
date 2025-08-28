import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../services/api";
import { useAppContext } from "../App";
import { fetchEvents } from "../pages/fetch";

const stripePromise = loadStripe(
  "pk_test_51MI1d2B9pVuzZ7tZnHg41lQHmrgtra5XGW6ecvwMk4Soco32wjtK5LvGhZYIRDI6nuU57gSkjlr8S9gzo36CVLuJ00VCpwwRhM"
);

const CheckoutForm = ({
  event,
  quantity,
  handleTicketPurchase,
  setSelectedEvent,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to purchase tickets");
      return;
    }
    setLoading(true);

    try {
      const { data } = await api.post("/tickets/create-payment-intent", {
        eventId: event._id,
        quantity,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setError(result.error.message);
      }
      if (result.paymentIntent.status === "succeeded") {
        await api.post("/tickets/confirm", {
          eventId: event._id,
          quantity,
          paymentId: result.paymentIntent.id,
        });
        await handleTicketPurchase(); // ✅ now refreshes events
        setSelectedEvent(null);
      }
    } catch (err) {
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CardElement className="bg-gray-700 p-4 rounded-md text-white" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-neon-blue/80"
      >
        {loading ? "Processing..." : `Pay $${event.ticketPrice * quantity}`}
      </button>
      <button
        type="button"
        onClick={() => setSelectedEvent(null)}
        className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-500"
      >
        Cancel
      </button>
    </div>
  );
};

const TicketModalWithStripe = ({
  selectedEvent,
  setSelectedEvent,
  handleTicketPurchase,
  ticketQuantity,
  setTicketQuantity,
}) => {
  if (!selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          {selectedEvent.name}
        </h2>
        <p className="text-gray-300 mb-4">
          Tickets available: {selectedEvent.availableTickets}
        </p>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            max={selectedEvent.availableTickets}
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(Number(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded-md w-full"
          />
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            event={selectedEvent}
            quantity={ticketQuantity}
            handleTicketPurchase={handleTicketPurchase}
            setSelectedEvent={setSelectedEvent}
          />
        </Elements>
      </div>
    </div>
  );
};

export default TicketModalWithStripe;
