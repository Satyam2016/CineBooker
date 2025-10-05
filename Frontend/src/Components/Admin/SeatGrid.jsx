
export default function SeatGrid({ showId, bookings = [] }) {
  const seats = [];
  const ROWS = 10;
  const COLUMNS = 10;

  for (let row = 0; row < ROWS; row++) {
    const rowLetter = String.fromCharCode(65 + row);
    for (let col = 1; col <= COLUMNS; col++) {
      const seatId = `${rowLetter}${col}`;
      const booking = bookings.find((b) => b.seat === seatId);
      seats.push({ seatId, booking });
    }
  }

  return (
    <div className="grid grid-cols-10 gap-2 max-w-[600px] mx-auto">
      {seats.map((s) => (
        <div key={s.seatId} className="relative group">
          <div
            className={`flex items-center justify-center p-2 text-xs font-semibold rounded-md aspect-square cursor-pointer transition-transform ${
              s.booking
                ? "bg-gray-400 border-2 border-gray-600"
                : "bg-green-400 border-2 border-green-600"
            }`}
          >
            {s.seatId}
          </div>

          {s.booking && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 p-2 rounded-md bg-black bg-opacity-90 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              <div className="font-semibold">{s.booking.user}</div>
              <div className="text-xs">{s.booking.email}</div>
              <div className="text-xs">{s.booking.phone}</div>
              <div className="text-xs">Booking ID: {s.booking.bookingId}</div>
              <div className="text-xs">Seat: {s.seat}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
