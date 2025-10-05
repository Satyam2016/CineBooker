import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewSection from "./sections/OverviewSection";
import CinemasSection from "./sections/CinemasSection";
import ScreensSection from "./sections/ScreensSection";
import MoviesSection from "./sections/MoviesSection";
import ShowsSection from "./sections/ShowsSection";
import axios from "axios";

export default function CineBookerDashboard() {
  const [cinemas, setCinemas] = useState([]);
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState({ 1: [] });
  const [dashboard, setDashboard] = useState({
    totalCinemas: 0,
    totalScreens: 0,
    activeMovies: 0,
    bookingsToday: 0,
  });

  const [activeSection, setActiveSection] = useState("overview");
  const [selectedShowId, setSelectedShowId] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setDashboard(res.data);
      console.log("Dashboard data:", res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, [activeSection]);

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
              cinemas={dashboard.totalCinemas}
              screens={dashboard.totalScreens}
              movies={dashboard.activeMovies}
              bookings={dashboard.bookingsToday}
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
