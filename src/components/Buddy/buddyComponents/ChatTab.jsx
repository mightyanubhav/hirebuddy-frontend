import React, { useState, useCallback, useEffect } from "react";
import MessageSection from "./MessageSection";
import SocketMessages from "../../Booking/SocketMessages";
import { backend_url } from "../../../context/HardCodedValues";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faXmark, 
  faComment, 
  faCommentDots,
   
} from "@fortawesome/free-solid-svg-icons";

const ChatTab = ({ booking, mode, onClose, onOpenChatTab }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  const fetchMessages = useCallback(async () => {
    try {
      const token = user?.token;
      const response = await fetch(
        `${backend_url}/buddy/messages?bookingId=${booking._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) { 
      console.error("Error fetching messages:", error); 
    }
  }, [booking._id, user?.token]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const token = user?.token;
      await fetch(`${backend_url}/buddy/messages`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          bookingId: booking._id, 
          text: newMessage 
        }),
      });
      setNewMessage("");
      // Refresh messages after sending
      if (mode === "history") {
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
      return JSON.parse(atob(token.split(".")[1])).id; 
    } catch { 
      return null; 
    }
  };

  const userId = getUserId();

  // Fetch messages when component mounts for history mode
  useEffect(() => {
    if (mode === "history") {
      fetchMessages();
    }
  }, [mode, fetchMessages]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            mode === "history" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
          }`}>
            <FontAwesomeIcon 
              icon={mode === "history" ? faComment : faCommentDots} 
              className="text-sm"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {mode === "history" ? "Message History" : "Live Chat"}
            </h3>
            <p className="text-sm text-gray-600">
              Booking #{booking._id?.slice(-6)} • {booking.customer?.name || "Customer"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Close Chat"
        >
          <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="h-96 overflow-hidden">
        {mode === "history" && (
          <MessageSection 
            messages={messages}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            userId={userId}
          />
        )}
        {mode === "live" && (
          <SocketMessages 
            bookingId={booking._id} 
            userId={userId}
            showInput={true}
          />
        )}
      </div>

      {/* Quick Action Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div className="flex gap-2">
          <button
            onClick={() => onOpenChatTab(booking._id, "history")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              mode === "history" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            History
          </button>
          <button
            onClick={() => onOpenChatTab(booking._id, "live")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              mode === "live" 
                ? "bg-purple-600 text-white" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;