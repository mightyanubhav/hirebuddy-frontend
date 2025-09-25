// components/MessagesSection.jsx
const MessagesSection = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  userId,
}) => {
  return (
    
    <div className="mt-6 border-t pt-4">
      <h4 className="font-medium mb-4">Messages</h4>

      {/* Messages List */}
      <div className="space-y-3 max-h-60 overflow-y-auto p-2">
        {messages.map((message) => {
          // Debug each message
         
          const isSender = String(message.sender) === String(userId);
      
          return (
            <div
              key={message._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  isSender
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    isSender
                      ? "text-right text-gray-200"
                      : "text-left text-gray-500"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
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

export default MessagesSection;
