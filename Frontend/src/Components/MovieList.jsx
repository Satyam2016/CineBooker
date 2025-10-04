import useBookingStore from "../store/useBookingStore";

const MovieList = ({ goToSeats, goBack }) => {
  const { selectedCinema, movies, selectMovie } = useBookingStore();

  return (
    <div className="p-6">
      <button onClick={goBack} className="mb-4 px-4 py-2 border rounded-lg">← Back</button>
      <h1 className="text-3xl">{selectedCinema?.name}</h1>
      <div className="text-gray-300 mb-4">Home / Cinemas / {selectedCinema?.name}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white/10 p-4 rounded-xl">
            <div className="text-5xl">{movie.icon}</div>
            <h3 className="text-yellow-400 text-xl">{movie.title}</h3>
            <p>{movie.genre} • {movie.duration} • ⭐ {movie.rating}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.showtimes.map((t) => (
                <button
                  key={t}
                  className="px-2 py-1 border rounded-lg hover:bg-yellow-400 hover:text-black"
                  onClick={() => {
                    selectMovie(movie, t);
                    goToSeats();
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MovieList;
