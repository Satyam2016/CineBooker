import React from "react";
import StatsGrid from "../StatsGrid";

export default function OverviewSection({ cinemas, screens, movies, bookings }) {
     console.log(cinemas, screens, movies, bookings);
  return (
    <section>
      <StatsGrid
        cinemas={cinemas}
        screens={screens}
        movies={movies}
        bookings={bookings}
      />
      <div className="bg-white/10 border border-white/20 p-6 rounded-xl text-white/90">
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">
          Quick Summary
        </h3>
        <p>
          Welcome to CineBooker’s dashboard. You can manage cinemas, screens,
          movies, and shows seamlessly here. The overview gives you a snapshot
          of your platform’s performance, current bookings, and active movies.
        </p>
      </div>
    </section>
  );
}
