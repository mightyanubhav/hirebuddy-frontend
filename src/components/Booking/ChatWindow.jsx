// components/ChatWindow.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { backend_url } from "../../context/HardCodedValues";

const socket = io(`${backend_url}`, {
  transports: ["websocket"],
  withCredentials: true,
});

const ChatWindow = ({
  activeChat,
  setActiveChat,
  messages,
  newMessage,
  setNewMessage,
  fetchMessages,
  sendMessage,
  userId,
  booking,
}) => {
  const [socketMessages, setSocketMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const isHistoryMode = activeChat.mode === 'history';

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, socketMessages]);

  // Socket connection for live chat
  useEffect(() => {
    if (!isHistoryMode && activeChat.bookingId) {
      socket.emit("joinRoom", activeChat.bookingId);

      const handleMessage = (msg) => {
        setSocketMessages((prev) => [...prev, msg]);
      };

      socket.on("message", handleMessage);

      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [activeChat.bookingId, isHistoryMode]);

  // Fetch messages when opening history chat
  useEffect(() => {
    if (isHistoryMode && fetchMessages) {
      fetchMessages(activeChat.bookingId);
    }
  }, [activeChat.bookingId, isHistoryMode, fetchMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (isHistoryMode) {
      sendMessage();
    } else {
      socket.emit("chatMessage", {
        roomId: activeChat.bookingId,
        senderId: userId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  const displayMessages = isHistoryMode ? messages : socketMessages;
  const otherPersonName = booking?.buddy?.name || booking?.customer?.name || "Contact";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {otherPersonName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{otherPersonName}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isHistoryMode ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                {isHistoryMode ? 'Message History' : 'Live Chat'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveChat(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-4">
            {displayMessages.map((message, index) => {
              const isSender = String(message.sender || message.senderId) === String(userId);
              
              return (
                <div
                  key={message._id || index}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-4 rounded-2xl shadow-sm ${
                      isSender
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        isSender ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            {displayMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Type your message to ${otherPersonName}...`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;