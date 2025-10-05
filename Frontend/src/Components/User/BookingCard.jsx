import useBookingStore from "../../store/useBookingStore";

export default function BookingCard({ booking, onCancel, showCancel }) {
  const formattedDate = new Date(booking.booked_at).toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });
  function getSeatNumbers(seats) {
  if (!Array.isArray(seats)) return [];
  const seatNumbers = seats.flatMap((seat) => seat.seat_number?.data || []);

  return seatNumbers;
}


  return (
    <div className={`rounded-2xl border-2 border-white/20 backdrop-blur-lg bg-white/10 hover:shadow-xl hover:border-yellow-400 transition ${booking.status === "upcoming" ? "border-l-4 border-green-500" : "opacity-80 border-l-4 border-gray-500"}`}>
      <div className="bg-black/30 p-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-yellow-400">{booking.movie_title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === "upcoming" ? "bg-green-500/20 text-green-400 border border-green-500" : "bg-gray-500/30 text-gray-300 border border-gray-400"}`}>
          {booking.status === "upcoming" ? "● Upcoming" : "● Completed"}
        </span>
      </div>
      <div className="p-5">
        <div className="space-y-2 text-white/90">
          <div>🎫 Booking ID: <strong>{booking.booking_id}</strong></div>
          <div>🏢 {booking.cinema_name}, {booking.cinema_location}</div>
          <div>📺 {booking.screen_name}</div>
          <div>📅 {formattedDate} at {booking.time}</div>
        </div>
        <div className="bg-yellow-400/20 border border-yellow-400 p-3 rounded-md mt-4">
          <p className="text-sm text-white/70">Your Seats</p>
          <p className="text-yellow-400 font-semibold text-lg">💺 {getSeatNumbers(booking.seats).join(", ")}</p>
        </div>
        <div className="flex justify-between items-center border-t border-white/20 mt-4 pt-4">
          <div>
            <p className="text-white/70 text-sm">Total Amount</p>
            <p className="text-yellow-400 text-xl font-bold">₹{booking.amount}</p>
          </div>
          {showCancel ? (
            <button className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition" onClick={() => onCancel(booking.booking_id)}>Cancel</button>
          ) : (
            <button className="px-4 py-2 border border-white/40 rounded-md hover:bg-white/20">View</button>
          )}
        </div>
      </div>
    </div>
  );
}
