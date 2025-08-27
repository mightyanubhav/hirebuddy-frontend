import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { backend_url } from "../context/HardCodedValues";

// connect to backend on 7777
const socket = io(`${backend_url}`, {
  transports: ["websocket"], // ensures direct websocket
  withCredentials: true,
});

const SocketMessages = ({ bookingId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!bookingId) return;

    // Join room when component mounts
    socket.emit("joinRoom", bookingId);

    // Listen for messages
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("message", handleMessage);

    // Cleanup on unmount
    return () => {
      socket.off("message", handleMessage);
    };
  }, [bookingId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socket.emit("chatMessage", {
      roomId: bookingId,
      senderId: userId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-4">Instant Messages</h4>
      <div className="space-y-4 max-h-60 overflow-y-auto p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.senderId === userId
                ? "bg-blue-100 ml-8"
                : "bg-gray-100 mr-8"
            }`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SocketMessages;
