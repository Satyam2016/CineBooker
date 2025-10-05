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

  bookings: [], // <-- add this to store all bookings
  setBookings: (bookings) => set({ bookings }),

  // Actions
  setCinemas: (cinemas) => set({ cinemas }),

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

  setBookedSeats: (seats) => set({ bookedSeats: seats }),

  toggleSeat: (seatId) =>
    set((state) => {
      if (state.bookedSeats.includes(seatId)) return state; // prevent selecting booked seats
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
    set((state) => {
      const newBooking = {
        booking_id: Date.now(), // generate a unique id for the booking
        cinema: state.selectedCinema,
        movie: state.selectedMovie,
        showtime: state.selectedShowtime,
        seats: state.selectedSeats,
        total: state.selectedSeats.length * 250,
        status: "CONFIRMED",
        booked_at: new Date().toISOString(),
      };

      return {
        bookedSeats: [...state.bookedSeats, ...state.selectedSeats],
        bookings: [...state.bookings, newBooking], // <-- add new booking
        confirmation: newBooking,
        selectedSeats: [],
      };
    }),

  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })), // <-- optional action to manually add a booking

  reset: () =>
    set({
      selectedCinema: null,
      selectedMovie: null,
      selectedShowtime: null,
      selectedSeats: [],
      bookedSeats: [],
      confirmation: null,
      bookings: [],
    }),
}));

export default useBookingStore;
