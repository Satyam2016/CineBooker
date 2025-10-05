import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/User/Navbar";
import ProfileCard from "../Components/User/ProfileCard";
import Tabs from "../Components/User/Tabs";
import Modal from "../Components/User/Modal";
import BookingCard from "../Components/User/BookingCard";
import useAuthStore from "../store/useAuthStore";
import useBookingStore from "../store/useBookingStore";

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const { login, user } = useAuthStore();
  const bookings = useBookingStore((state) => state.bookings);
  const setBookings = useBookingStore((state) => state.setBookings);

  const user_id = user?.user_id;

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        login(response.data);

      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (err.response?.status === 401) localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, [login]);

  // Fetch bookings for logged-in user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user_id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/${user_id}/bookings`
        );

        const updatedData = res.data.map((b) => ({
          ...b,
          amount: (b.seats?.length || 0) * 250, // seat price
          status:
            b.status.toLowerCase() === "confirmed" ? "upcoming" : b.status.toLowerCase(),
        }));

        setBookings(updatedData);
            console.log("User bookings:", updatedData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [user_id, setBookings]);

  // Handle cancel
  const handleCancel = (id) => {
    setBookingToCancel(id);
    setCancelModalOpen(true);
  };

 const confirmCancel = async () => {
  if (!bookingToCancel) return;

  try {
    // Send DELETE request to backend
    await axios.delete(`http://localhost:5000/api/bookings/${bookingToCancel}`);

    // Update Zustand store to remove/cancel the booking
    setBookings(
      bookings.map((b) =>
        b.booking_id === bookingToCancel ? { ...b, status: "cancelled" } : b
      )
    );

    setCancelModalOpen(false);
    setSuccessModalOpen(true);
  } catch (err) {
    console.error("Error cancelling booking:", err);
  } finally {
    setBookingToCancel(null);
  }
};

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const past = bookings.filter((b) => b.status === "past");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 to-purple-700 text-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-white/80 mb-8">
          Manage your movie bookings and preferences
        </p>

        <ProfileCard bookings={bookings} />
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(currentTab === "upcoming" ? upcoming : past).map((b) => (
            <BookingCard
              key={b.booking_id}
              booking={b}
              onCancel={handleCancel}
              showCancel={currentTab === "upcoming"}
            />
          ))}
        </div>

        {/* Cancel Modal */}
        <Modal
          open={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          type="warning"
          title="Cancel Booking?"
          text="Are you sure you want to cancel this booking? This action cannot be undone."
        >
          <div className="flex justify-center gap-3">
            <button
              className="px-5 py-2 border border-white/50 rounded-md hover:bg-white hover:text-indigo-600"
              onClick={() => setCancelModalOpen(false)}
            >
              No, Keep It
            </button>
            <button
              className="px-5 py-2 bg-red-600 rounded-md hover:bg-red-700"
              onClick={confirmCancel}
            >
              Yes, Cancel
            </button>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          type="success"
          title="Booking Cancelled!"
          text="Your booking has been successfully cancelled. The refund will be processed within 5–7 business days."
        >
          <button
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-semibold rounded-md hover:shadow-lg"
            onClick={() => setSuccessModalOpen(false)}
          >
            Got it
          </button>
        </Modal>
      </div>
    </div>
  );
}
