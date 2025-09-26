import React, { useState, useCallback } from "react";
import MessageSection from "./MessageSection";
import SocketMessages from "../../Booking/SocketMessages";
import { backend_url } from "../../../context/HardCodedValues"
import { useAuth } from "../../../context/AuthContext"

const BookingCard = ({ booking, isSelected, chatMode, onSelectBooking, onChatModeChange }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  const updateBookingStatus = async (status) => {
    try {
      const token = user?.token;
      const response = await fetch(
        `${backend_url}/buddy/booking/${booking._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        alert(`Booking ${status.toLowerCase()} successfully!`);
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(
        `${backend_url}/buddy/messages?bookingId=${booking._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        onSelectBooking(booking._id);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [booking._id, user?.token, onSelectBooking]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !booking._id) return;

    try {
      const token = user?.token;
      const response = await fetch(`${backend_url}/buddy/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: booking._id,
          text: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUserId = () => {
    const token = user?.token;
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (e) {
      return e;
    }
  };

  const userId = getUserId();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            Booking with {booking.customer?.name}
          </h3>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span>{" "}
            {new Date(booking.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {booking.location}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                booking.status === "Confirmed"
                  ? "bg-green-100 text-green-800"
                  : booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>
        <div className="flex space-x-2">
          {booking.status === "Pending" && (
            <>
              <button
                onClick={() => updateBookingStatus("Confirmed")}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => updateBookingStatus("Declined")}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Decline
              </button>
            </>
          )}

          <button
            onClick={() => {
              fetchMessages();
              onChatModeChange("history");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Messages
          </button>

          <button
            onClick={() => {
              onSelectBooking(booking._id);
              onChatModeChange("live");
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Live Chat
          </button>
        </div>
      </div>

      {isSelected && chatMode === "history" && (
        <MessageSection
          messages={messages}
          newMessage={newMessage}
          onNewMessageChange={setNewMessage}
          onSendMessage={sendMessage}
          userId={userId}
        />
      )}

      {isSelected && chatMode === "live" && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-4">Live Chat</h4>
          <SocketMessages bookingId={booking._id} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default BookingCard;