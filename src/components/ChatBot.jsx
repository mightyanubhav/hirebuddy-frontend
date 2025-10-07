import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from "react-icons/fa";
import { backend_url } from "../context/HardCodedValues";
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hey there 👋! I'm BuddyBot — your travel assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (showChat && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChat, isMinimized]);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { 
    sender: "user", 
    text: input,
    timestamp: new Date()
  };
  setMessages(prev => [...prev, userMessage]);
  setInput("");
  setIsTyping(true);

  try {
    const res = await fetch(`${backend_url}/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = {
      sender: "bot",
      text: data.reply || "I'm having trouble right now. Try again later!",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (err) {
    console.error("Chatbot fetch error:", err);
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ I'm facing a connection issue. Please try again later.",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};


  const generateReply = (input) => {
    const text = input.toLowerCase();

    if (text.includes("book") || text.includes("buddy"))
      return {
        text: "You can find and book a travel buddy from the 'Find Buddy' section. Want me to guide you there?",
        options: ["Yes, show me", "No, thanks"]
      };

    if (text.includes("payment"))
      return { 
        text: "All payments are handled securely via our gateway. Do you want to know about refunds?", 
        options: ["Yes", "No"] 
      };

    if (text.includes("chat"))
      return { 
        text: "You can chat with your booked buddy in the Messages tab inside your dashboard." 
      };

    if (text.includes("yes"))
      return { 
        text: "Great! Redirecting you to the right page 🚀 (Feature under construction in demo)" 
      };

    if (text.includes("no"))
      return { 
        text: "Alright! Let me know if you need anything else 😊" 
      };

    return { 
      text: "I'm still learning 🤖. Try asking about booking, payments, or chat!" 
    };
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { 
      sender: "user", 
      text: option,
      timestamp: new Date()
    }]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(option);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: reply.text, 
        options: reply.options,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group z-50"
          style={{background: 'linear-gradient(to right, #2563eb, #7c3aed)'}}
        >
          <FaRobot size={24} />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {showChat && (
        <div 
          className={`fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 ${
            isMinimized ? 'h-14' : 'h-[500px]'
          }`}
          style={{background: 'white'}}
        >
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center"
            style={{background: 'linear-gradient(to right, #2563eb, #7c3aed)'}}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaRobot size={20} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-bold text-white">BuddyBot</span>
                <div className="text-xs text-blue-100">Online • Travel Assistant</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaMinus size={14} />
              </button>
              <button 
                onClick={() => setShowChat(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div 
                className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
                style={{background: '#f9fafb'}}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        msg.sender === "user" 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none" 
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                      }`}>
                        <div className="text-sm">{msg.text}</div>
                        <div className={`text-xs mt-1 ${
                          msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                        }`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                      {msg.options && (
                        <div className="flex flex-wrap mt-2 gap-2">
                          {msg.options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(opt)}
                              className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - FIXED */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                  <button 
                    onClick={handleSend} 
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">
                  BuddyBot • Your travel assistant
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;