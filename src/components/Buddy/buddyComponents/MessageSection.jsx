import React from "react";

const MessageSection = ({ messages, newMessage, onNewMessageChange, onSendMessage, userId }) => {
  return (
    <div className="p-3">
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded-md text-sm ${msg.sender === userId ? "bg-blue-100 ml-6" : "bg-gray-100 mr-6"}`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          placeholder="Type message..."
          onKeyPress={(e) => { if (e.key === "Enter") onSendMessage(); }}
          className="flex-1 border border-gray-300 rounded-l-md py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={onSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-r-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageSection;
