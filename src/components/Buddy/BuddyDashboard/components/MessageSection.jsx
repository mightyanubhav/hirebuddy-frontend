import React from "react";

const MessageSection = ({ messages, newMessage, onNewMessageChange, onSendMessage, userId }) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="font-medium mb-4">Messages</h4>
      <div className="space-y-4 max-h-60 overflow-y-auto p-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`p-3 rounded-lg ${
              message.sender === userId ? "bg-blue-100 ml-8" : "bg-gray-100 mr-8"
            }`}
          >
            <p>{message.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") onSendMessage();
          }}
        />
        <button
          onClick={onSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageSection;