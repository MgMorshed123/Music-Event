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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

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

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Payment form not ready. Please refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create a payment intent on backend
      const { data } = await api.post("/tickets/create-payment-intent", {
        eventId: event._id,
        quantity,
      });

      // 2. Confirm payment with card element
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // 3. Confirm purchase on backend
        await api.post("/tickets/confirm", {
          eventId: event._id,
          quantity,
          paymentId: result.paymentIntent.id,
        });
        await handleTicketPurchase();
        setSelectedEvent(null);
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              color: "#fff",
              fontSize: "16px",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: {
              color: "#f44336",
            },
          },
        }}
        className="p-4 bg-gray-700 rounded-md"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading || !stripe}
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
    </form>
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
