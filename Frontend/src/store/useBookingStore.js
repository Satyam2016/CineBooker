import { create } from "zustand";

const useBookingStore = create((set) => ({
  cinemas: [],
  movies: [],

  selectedCinema: null,
  selectedMovie: null,
  selectedShowtime: null,
  selectedSeats: [],
  bookedSeats: [],
  confirmation: null,

  // Actions
  setCinemas: (cinemas) => set({ cinemas }), // <-- new action to update cinemas

  selectCinema: (cinema) =>
    set({
      selectedCinema: cinema,
      selectedMovie: null,
      selectedShowtime: null,
      selectedSeats: [],
    }),

  setMovies: (movies) => set({ movies }),

  selectMovie: (movie, showtime) =>
    set({ selectedMovie: movie, selectedShowtime: showtime, selectedSeats: [] }),

  toggleSeat: (seatId) =>
    set((state) => {
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

  confirmBooking: () =>
    set((state) => ({
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

  reset: () =>
    set({
      selectedCinema: null,
      selectedMovie: null,
      selectedShowtime: null,
      selectedSeats: [],
      bookedSeats: [],
      confirmation: null,
    }),
}));

export default useBookingStore;
