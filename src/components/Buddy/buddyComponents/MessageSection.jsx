import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageSection = ({ messages, newMessage, onNewMessageChange, onSendMessage, userId }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 space-y-3 overflow-y-auto mb-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === userId 
                  ? "bg-blue-100 ml-auto" 
                  : "bg-gray-100 mr-auto"
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start a conversation!</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => { 
            if (e.key === "Enter") onSendMessage(); 
          }}
          className="flex-1 border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageSection;