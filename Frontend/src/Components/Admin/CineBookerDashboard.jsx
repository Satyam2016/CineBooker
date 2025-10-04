import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsGrid from "./StatsGrid";
import OverviewSection from "./sections/OverviewSection";
import CinemasSection from "./sections/CinemasSection";
import ScreensSection from "./sections/ScreensSection";
import MoviesSection from "./sections/MoviesSection";
import ShowsSection from "./sections/ShowsSection";
import CinemaModal from "./modals/CinemaModal";
import ScreenModal from "./modals/ScreenModal";
import MovieModal from "./modals/MovieModal";

export default function CineBookerDashboard() {
  // ⬇ State (cinemas, screens, movies, shows, bookings, etc.)
  const [cinemas, setCinemas] = useState([]); // empty array initially
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState({ 1: [] }); // example booking structure

  const [activeSection, setActiveSection] = useState("overview");
  const [selectedShowId, setSelectedShowId] = useState(null);

  // Modal states
  const [isCinemaModalOpen, setCinemaModalOpen] = useState(false);
  const [isScreenModalOpen, setScreenModalOpen] = useState(false);
  const [isMovieModalOpen, setMovieModalOpen] = useState(false);

  function switchSection(section) {
    setActiveSection(section);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-700 text-white font-sans">
      <div className="flex">
        <Sidebar activeSection={activeSection} switchSection={switchSection} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Header activeSection={activeSection} />

          {activeSection === "overview" && (
            <OverviewSection
              cinemas={cinemas}
              screens={screens}
              movies={movies}
              bookings={bookings}
            />
          )}

          {activeSection === "cinemas" && (
            <CinemasSection
              cinemas={cinemas}
              onAdd={() => setCinemaModalOpen(true)}
            />
          )}

          {activeSection === "screens" && (
            <ScreensSection
              screens={screens}
              onAdd={() => setScreenModalOpen(true)}
            />
          )}

          {activeSection === "movies" && (
            <MoviesSection
              movies={movies}
              onAdd={() => setMovieModalOpen(true)}
            />
          )}

          {activeSection === "shows" && (
            <ShowsSection shows={shows} bookings={bookings} />
          )}

          {isCinemaModalOpen && (
            <CinemaModal onClose={() => setCinemaModalOpen(false)} />
          )}
          {isScreenModalOpen && (
            <ScreenModal onClose={() => setScreenModalOpen(false)} />
          )}
          {isMovieModalOpen && (
            <MovieModal onClose={() => setMovieModalOpen(false)} />
          )}
        </main>
      </div>
    </div>
  );
}
