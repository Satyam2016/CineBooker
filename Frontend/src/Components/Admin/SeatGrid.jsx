export default function SeatGrid({ showId }) {
     const showBookings = getBookingsForShow(showId);
     const seats = [];
     for (let row = 0; row < 10; row++) {
          const rowLetter = String.fromCharCode(65 + row);
          for (let col = 1; col <= 10; col++) {
               const seatId = `${rowLetter}${col}`;
               const booking = showBookings.find(b => b.seat === seatId);
               seats.push({ seatId, booking });
          }
     }


     return (
          <div className="grid grid-cols-10 gap-2 max-w-[600px] mx-auto">
               {seats.map(s => (
                    <div
                         key={s.seatId}
                         className={`relative flex items-center justify-center p-2 text-xs font-semibold rounded-md aspect-square transition-transform ${s.booking ? "bg-red-400 border-2 border-red-600 hover:scale-110 z-10" : "bg-green-400 border-2 border-green-600"
                              }`}
                         title={s.booking ? `${s.booking.user} • ${s.booking.bookingId}` : "Available"}
                    >
                         {s.seatId}
                         {s.booking && (
                              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 p-2 rounded-md bg-black bg-opacity-80 text-white text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 50 }}>
                                   <div className="font-semibold">{s.booking.user}</div>
                                   <div className="text-xs">{s.booking.email}</div>
                                   <div className="text-xs">{s.booking.phone}</div>
                                   <div className="text-xs">{s.booking.bookingId}</div>
                              </div>
                         )}
                    </div>
               ))}
          </div>
     );
}