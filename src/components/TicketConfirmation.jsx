const TicketConfirmation = ({ show, selectedEvent, ticketQuantity }) => {
  if (!show || !selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-300 mb-4">
          You have purchased {ticketQuantity} ticket(s) for {selectedEvent.name}
          .
        </p>
        <p className="text-neon-green">
          Check your email for confirmation details.
        </p>
      </div>
    </div>
  );
};

export default TicketConfirmation;
