import { useState } from "react";

import Navbar from "../Components/Navbar";
import CinemaList from "../Components/CinemaList";
import MovieList from "../Components/MovieList";
import SeatSelection from "../Components/SeatSelection";
import ConfirmationCard from "../Components/ConfirmationCard";
import useBookingStore from "../store/useBookingStore";


const CustomerPage = () => {
  const [page, setPage] = useState("cinemas");
  const [showConfirm, setShowConfirm] = useState(false);
  const reset = useBookingStore((s) => s.reset);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <Navbar />
      {page === "cinemas" && <CinemaList goToMovies={() => setPage("movies")} />}
      {page === "movies" && <MovieList goToSeats={() => setPage("seats")} goBack={() => setPage("cinemas")} />}
      {page === "seats" && <SeatSelection goBack={() => setPage("movies")} showConfirmation={() => setShowConfirm(true)} />}
      {showConfirm && <ConfirmationCard resetApp={() => { reset(); setPage("cinemas"); setShowConfirm(false); }} />}
    </div>
  );
};
export default CustomerPage;