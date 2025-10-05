import { useEffect } from "react";
import axios from "axios";
import useBookingStore from "../store/useBookingStore";

const MovieList = ({ goToSeats, goBack }) => {
  const { selectedCinema, movies, selectMovie, setMovies } = useBookingStore();

  useEffect(() => {
    if (!selectedCinema) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cinemas/${selectedCinema.cinema_id}/movies`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setMovies(res.data);

      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, [selectedCinema, setMovies]);

  if (!selectedCinema) return <p>Please select a cinema first.</p>;

  return (
    <div className="p-6">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 border rounded-lg hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold">{selectedCinema.name}</h1>
      <div className="text-gray-300 mb-6">
        Home / Cinemas / {selectedCinema.name}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white/10 p-6 rounded-xl shadow-lg hover:bg-white/20 transition"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Left: Title + Description */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-5xl">{movie.icon}</div>
                  <h3 className="text-yellow-400 text-2xl font-semibold">
                    {movie.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">{movie.description}</p>
              </div>

              {/* Right: Details */}
              <div className="flex-1 md:text-right">
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-yellow-400">Genre:</span>{" "}
                  {movie.genre}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-yellow-400">Language:</span>{" "}
                  {movie.language}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-yellow-400">Duration:</span>{" "}
                  {movie.duration}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-yellow-400">Release:</span>{" "}
                  {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }) : "N/A"}
                </p>

                <div className="flex flex-wrap justify-end gap-2 mt-3">
                  {movie.showtimes.map((t, idx) => (
                    <button
                      key={t.showId}
                      className="px-3 py-1 border border-yellow-400 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                      onClick={() => {
                        selectMovie(movie, t);
                        goToSeats();
                      }}
                    >
                      Screen {t.screen.name || t.screen} •{" "}
                      {t.showTime
                        ? new Date(t.showTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "N/A"}{" "}
                      •{" "}
                      {t.showTime
                        ? new Date(t.showTime).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                        : "N/A"}
                    </button>

                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
