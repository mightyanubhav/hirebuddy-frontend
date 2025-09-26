import { useState, useCallback } from "react";
import { backend_url } from "../../context/HardCodedValues";

export const useBookings = (token) => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backend_url}/customer/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchMessages = useCallback(async (bookingId) => {
    try {
      const res = await fetch(`${backend_url}/customer/messages?bookingId=${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setSelectedBooking(bookingId);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }, [token]);

  return {
    bookings,
    messages,
    selectedBooking,
    loading,
    fetchBookings,
    fetchMessages,
    setMessages,
    setSelectedBooking
  };
};
