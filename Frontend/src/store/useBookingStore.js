import { create } from "zustand";

const useBookingStore = create((set) => ({
  cinemas: [
    { id: 1, name: "PVR Cinemas", location: "Downtown Plaza", screens: 8, icon: "🎭" },
    { id: 2, name: "INOX Megaplex", location: "City Center Mall", screens: 6, icon: "🎪" },
    { id: 3, name: "Cinepolis", location: "Grand Boulevard", screens: 10, icon: "🎬" },
    { id: 4, name: "Carnival Cinemas", location: "Metro Junction", screens: 5, icon: "🎞️" },
    { id: 5, name: "MovieMax", location: "Riverside Complex", screens: 7, icon: "🎥" },
    { id: 6, name: "Star Cinema", location: "Sunset Avenue", screens: 4, icon: "⭐" }
  ],
  movies: [
    { id: 1, title: "Inception", genre: "Sci-Fi", duration: "2h 28m", rating: "8.8", icon: "🌀", showtimes: ["10:00 AM", "2:30 PM", "6:45 PM", "10:15 PM"] },
    { id: 2, title: "The Dark Knight", genre: "Action", duration: "2h 32m", rating: "9.0", icon: "🦇", showtimes: ["11:30 AM", "3:00 PM", "7:30 PM", "11:00 PM"] },
    { id: 3, title: "Interstellar", genre: "Sci-Fi", duration: "2h 49m", rating: "8.6", icon: "🚀", showtimes: ["12:00 PM", "4:30 PM", "8:45 PM"] },
    { id: 4, title: "Avengers Endgame", genre: "Action", duration: "3h 1m", rating: "8.4", icon: "⚡", showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"] },
    { id: 5, title: "The Matrix", genre: "Sci-Fi", duration: "2h 16m", rating: "8.7", icon: "🕶️", showtimes: ["10:30 AM", "2:00 PM", "6:00 PM", "9:30 PM"] },
    { id: 6, title: "Dune", genre: "Adventure", duration: "2h 35m", rating: "8.0", icon: "🏜️", showtimes: ["11:00 AM", "3:30 PM", "7:00 PM", "10:30 PM"] }
  ],

  selectedCinema: null,
  selectedMovie: null,
  selectedShowtime: null,
  selectedSeats: [],
  bookedSeats: [],

  // Actions
  selectCinema: (cinema) => set({ selectedCinema: cinema, selectedMovie: null, selectedShowtime: null, selectedSeats: [] }),
  selectMovie: (movie, showtime) => set({ selectedMovie: movie, selectedShowtime: showtime, selectedSeats: [] }),
  toggleSeat: (seatId) => set((state) => {
    if (state.bookedSeats.includes(seatId)) return state;
    let updated = [...state.selectedSeats];
    if (updated.includes(seatId)) {
      updated = updated.filter((s) => s !== seatId);
    } else {
      if (updated.length >= 6) return state;
      updated.push(seatId);
    }
    return { selectedSeats: updated };
  }),
  confirmBooking: () => set((state) => ({
    bookedSeats: [...state.bookedSeats, ...state.selectedSeats],
    confirmation: {
      cinema: state.selectedCinema,
      movie: state.selectedMovie,
      showtime: state.selectedShowtime,
      seats: state.selectedSeats,
      total: state.selectedSeats.length * 250,
    },
    selectedSeats: [],
  })),
  reset: () => set({ selectedCinema: null, selectedMovie: null, selectedShowtime: null, selectedSeats: [], bookedSeats: [], confirmation: null }),
}));

export default useBookingStore;
