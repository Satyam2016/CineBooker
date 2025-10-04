import useBookingStore from "../store/useBookingStore";

const ConfirmationCard = ({ resetApp }) => {
  const { confirmation } = useBookingStore();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-2xl max-w-lg text-center text-white">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl text-yellow-400 mb-2">Booking Confirmed!</h2>
        <div className="bg-white/10 p-4 rounded-xl text-left">
          <p><b>Cinema:</b> {confirmation?.cinema?.name}</p>
          <p><b>Movie:</b> {confirmation?.movie?.title}</p>
          <p><b>Showtime:</b> {confirmation?.showtime}</p>
          <p><b>Seats:</b> {confirmation?.seats?.join(", ")}</p>
          <p><b>Total:</b> ₹{confirmation?.total}</p>
        </div>
        <button onClick={resetApp} className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg">Book Another Show</button>
      </div>
    </div>
  );
};
export default ConfirmationCard;
