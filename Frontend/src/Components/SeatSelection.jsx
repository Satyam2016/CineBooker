import { useEffect, useState } from "react";
import axios from "axios";
import useBookingStore from "../store/useBookingStore";

const SeatSelection = ({ goBack, showConfirmation }) => {
  const {
    selectedMovie,
    selectedCinema,
    selectedShowtime,
    selectedSeats,
    bookedSeats,
    toggleSeat,
    confirmBooking,
    setBookedSeats
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const seatIds = Array.from({ length: 100 }, (_, i) => `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`);
  const total = selectedSeats.length * 250;

  // Fetch booked seats for this show
  useEffect(() => {
    if (!selectedShowtime) return;

    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${selectedShowtime.showId}/booked-seats`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setBookedSeats(res.data); // update store
        console.log("Booked seats:", res.data);
      } catch (err) {
        console.error("Failed to fetch booked seats:", err);
      }
    };

    fetchBookedSeats();
  }, [selectedShowtime, setBookedSeats]);

  const handleBooking = async () => {
    if (!selectedSeats.length) return;

    setLoading(true);
    setError(null);

    try {
      const user_id = 1; // replace with actual logged-in user
      const show_id = selectedShowtime.showId;

      await axios.post("http://localhost:5000/api/bookings", {
        user_id,
        show_id,
        seat_ids: selectedSeats
      }, {
        headers: { "Content-Type": "application/json" }
      },
      );

      confirmBooking();
      showConfirmation();
    } catch (err) {
      console.error(err);
      setError("Booking failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button onClick={goBack} className="mb-4 px-4 py-2 border rounded-lg">← Back</button>
      <h1 className="text-sm text-gray-300 mb-4">
        Home / Cinemas / {selectedCinema?.name} / Movies / {selectedMovie?.title} / Screen {selectedShowtime?.screen} - {new Date(selectedShowtime?.showTime).toLocaleTimeString()}
      </h1>

      <div className="grid grid-cols-10 gap-2 bg-white/10 p-4 rounded-xl mt-4">
        {seatIds.map((id) => {
          const isSelected = selectedSeats.includes(id);
          const isBooked = bookedSeats.includes(id); // check if booked
          return (
            <div
              key={id}
              className={`p-2 text-sm text-center cursor-pointer rounded-md ${isBooked ? "bg-gray-500 text-white cursor-not-allowed" :
                isSelected ? "bg-yellow-400 text-black" :
                  "bg-green-600 text-white"
                }`
              }
              onClick={() => {
                if (isBooked) return; // can't select booked seats
                if (!isSelected && selectedSeats.length >= 6) {
                  alert("You can select a maximum of 6 seats at a time.");
                  return;
                }
                toggleSeat(id);
              }}
            >
              {id}
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 bg-white/10 p-4 rounded-xl">
        <p>Seats: {selectedSeats.join(", ") || "None"}</p>
        <p>Tickets: {selectedSeats.length}</p>
        <p>Total: ₹{total}</p>
        <button
          className="w-full mt-4 bg-yellow-400 text-black font-bold py-2 rounded-lg disabled:opacity-50"
          disabled={selectedSeats.length === 0 || loading}
          onClick={handleBooking}
        >
          {loading ? "Booking..." : "Proceed to Pay"}
        </button>
      </div>
    </div >
  );
};

export default SeatSelection;
