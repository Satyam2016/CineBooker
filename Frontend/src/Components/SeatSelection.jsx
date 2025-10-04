import useBookingStore from "../store/useBookingStore";

const SeatSelection = ({ goBack, showConfirmation }) => {
  const { selectedMovie, selectedCinema, selectedShowtime, selectedSeats, toggleSeat, confirmBooking } = useBookingStore();
  const seatIds = Array.from({ length: 100 }, (_, i) => `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`);

  const total = selectedSeats.length * 250;

  return (
    <div className="p-6">
      <button onClick={goBack} className="mb-4 px-4 py-2 border rounded-lg">← Back</button>
      <h1 className="text-2xl">{selectedMovie?.title} - {selectedShowtime}</h1>
      <div className="grid grid-cols-10 gap-2 bg-white/10 p-4 rounded-xl mt-4">
        {seatIds.map((id) => {
          const isSelected = selectedSeats.includes(id);
          return (
            <div
              key={id}
              className={`p-2 text-sm text-center cursor-pointer rounded-md ${isSelected ? "bg-yellow-400 text-black" : "bg-green-600 text-white"}`}
              onClick={() => toggleSeat(id)}
            >
              {id}
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-white/10 p-4 rounded-xl">
        <p>Seats: {selectedSeats.join(", ") || "None"}</p>
        <p>Tickets: {selectedSeats.length}</p>
        <p>Total: ₹{total}</p>
        <button
          className="w-full mt-4 bg-yellow-400 text-black font-bold py-2 rounded-lg disabled:opacity-50"
          disabled={selectedSeats.length === 0}
          onClick={() => {
            confirmBooking();
            showConfirmation();
          }}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};
export default SeatSelection;
