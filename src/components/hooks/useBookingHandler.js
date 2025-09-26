import { backend_url } from "../../context/HardCodedValues";

export const useBookingHandler = (token, selectedBuddy, setCredits, fetchBookings) => {
  const handleBooking = async (e, date, location, closeModal) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backend_url}/customer/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          buddyId: selectedBuddy._id,
          date,
          location,
        }),
      });

      if (res.ok) {
        alert("Booking request sent successfully!");
        closeModal();
        fetchBookings();
        setCredits((prev) => Math.max(prev - 1, 0));
      } else {
        const errorData = await res.json();
        alert(`Booking failed: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Booking failed. Please try again.");
    }
  };

  return { handleBooking };
};
