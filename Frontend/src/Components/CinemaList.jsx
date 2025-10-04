import useBookingStore from "../store/useBookingStore";

const CinemaList = ({ goToMovies }) => {
  const { cinemas, selectCinema } = useBookingStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-2">Select Your Cinema</h1>
      <div className="text-gray-300 mb-4">Home / Cinemas</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="bg-white/10 p-6 rounded-xl cursor-pointer hover:border-yellow-400 border"
            onClick={() => {
              selectCinema(cinema);
              goToMovies();
            }}
          >
            <div className="text-4xl">{cinema.icon}</div>
            <h3 className="text-xl text-yellow-400">{cinema.name}</h3>
            <p>{cinema.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CinemaList;
