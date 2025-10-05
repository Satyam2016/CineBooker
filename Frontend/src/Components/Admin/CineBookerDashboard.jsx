import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewSection from "./sections/OverviewSection";
import CinemasSection from "./sections/CinemasSection";
import ScreensSection from "./sections/ScreensSection";
import MoviesSection from "./sections/MoviesSection";
import ShowsSection from "./sections/ShowsSection";

export default function CineBookerDashboard() {
  const [cinemas, setCinemas] = useState([]);
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState({ 1: [] });

  const [activeSection, setActiveSection] = useState("overview");
  const [selectedShowId, setSelectedShowId] = useState(null);

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

         
        </main>
      </div>
    </div>
  );
}
