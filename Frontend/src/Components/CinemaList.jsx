import { useEffect } from "react";
import axios from "axios";
import useBookingStore from "../store/useBookingStore";

const CinemaList = ({ goToMovies }) => {
  const { cinemas, setCinemas, selectCinema } = useBookingStore();

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cinemas",
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setCinemas(res.data);
        console.log("Cinemas data:", res.data);
      } catch (err) {
        console.error("Failed to fetch cinemas:", err);
      }
    };

    fetchCinemas();
  }, [setCinemas]);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-2">Select Your Cinema</h1>
      <div className="text-gray-300 mb-4">Home / Cinemas</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cinemas.map((cinema) => (
          <div
            key={cinema.cinema_id}
            className="bg-white/10 p-6 rounded-xl cursor-pointer hover:border-yellow-400 border"
            onClick={() => {
              selectCinema(cinema);
              goToMovies();
            }}
          >
            
            <h3 className="text-xl text-yellow-400">{cinema.name}</h3>
            <p>{cinema.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaList;
