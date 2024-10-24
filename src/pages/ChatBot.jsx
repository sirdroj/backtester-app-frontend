import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export const getBotReply = (userMessage) => {
  const trimmedMessage = userMessage.toLowerCase().trim();

  const responses = {
    greeting: [
      "Hello! How can I assist you today?",
      "Hi there! Need help with something?",
    ],
    help: [
      "Sure! I'm here to help. Ask me anything.",
      "Feel free to ask any questions you have.",
    ],
    howAreYou: [
      "I'm just a bot, but I'm doing great! How about you?",
      "I'm doing fantastic! How can I assist you?",
    ],
    name: [
      "I'm your friendly chatbot assistant!",
      "You can call me ChatBot. What's your name?",
    ],
    time: `The current time is ${new Date().toLocaleTimeString()}.`,
    date: `Today's date is ${new Date().toLocaleDateString()}.`,
    thanks: [
      "You're welcome! Let me know if you need anything else.",
      "Glad I could help! Anything else?",
    ],
    bye: [
      "Goodbye! Have a great day!",
      "Take care! Feel free to chat again anytime.",
    ],
    whatCanYouDo: [
      "I can assist with answering questions, providing time and date, and more! Just ask.",
      "I can help with information, advice, or just a friendly chat!",
    ],
    joke: [
      "Why don't skeletons fight each other? Because they don't have the guts!",
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    ],
    weather:
      "I can't check the weather right now, but you can ask me other things!",
    unknown: [
      "I'm not sure how to respond to that. Can you ask something else?",
      "Sorry, I didn't quite get that. Could you rephrase?",
    ],
  };

  // Using regular expressions for better keyword matching
  if (/hello|hi|hey/.test(trimmedMessage)) {
    return responses.greeting[
      Math.floor(Math.random() * responses.greeting.length)
    ];
  } else if (/help|assist/.test(trimmedMessage)) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  } else if (/how are you|how's it going/.test(trimmedMessage)) {
    return responses.howAreYou[
      Math.floor(Math.random() * responses.howAreYou.length)
    ];
  } else if (/your name|who are you/.test(trimmedMessage)) {
    return responses.name[Math.floor(Math.random() * responses.name.length)];
  } else if (/time/.test(trimmedMessage)) {
    return responses.time;
  } else if (/date/.test(trimmedMessage)) {
    return responses.date;
  } else if (/thank you|thanks/.test(trimmedMessage)) {
    return responses.thanks[
      Math.floor(Math.random() * responses.thanks.length)
    ];
  } else if (/bye|goodbye/.test(trimmedMessage)) {
    return responses.bye[Math.floor(Math.random() * responses.bye.length)];
  } else if (/what can you do|capabilities/.test(trimmedMessage)) {
    return responses.whatCanYouDo[
      Math.floor(Math.random() * responses.whatCanYouDo.length)
    ];
  } else if (/joke|make me laugh/.test(trimmedMessage)) {
    return responses.joke[Math.floor(Math.random() * responses.joke.length)];
  } else if (/weather/.test(trimmedMessage)) {
    return responses.weather;
  } else {
    return responses.unknown[
      Math.floor(Math.random() * responses.unknown.length)
    ];
  }
};

export const getBotReplyAPI = async (userMessage) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/sentientgpt_chat/",
      {
        message: userMessage,
      }
    );

    console.log(response.data); // This will log the response from the backend
    if (response.data && response.data.reply) {
      return response.data.reply; // Return the bot's reply from the API
    } else {
      return "Sorry, I didn't understand that.";
    } // Return the bot's reply from the API
  } catch (error) {
    console.error("Error fetching bot reply:", error);
    return "Sorry, I'm having trouble responding right now."; // Fallback message on error
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(""); // Input value
  const messagesEndRef = useRef(null); // Reference to message container's end

  // Toggle chatbot popup
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Scroll chat to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle sending message
  // Handle sending message
  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = input;

      // Append user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
      ]);

      // Get bot reply
      const botReply = await getBotReply(userMessage); // Use await here

      // Append bot reply after a short delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botReply, sender: "bot" },
        ]);
        scrollToBottom(); // Scroll to bottom after bot reply
      }, 500);

      // Scroll to bottom immediately after sending
      scrollToBottom();
      setInput(""); // Clear input field after sending
    }
  };

  // Function to generate bot response
  // Function to generate bot response

  // Handle 'Enter' key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative">
      {/* Chatbot button */}
      <button
        className=" z-50 fixed bottom-5 right-5 bg-gray-700 text-white rounded-full p-4 shadow-lg hover:bg-gray-600"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.2338 15.6356C20.7253 14.5238 20.9983 13.2938 20.9983 12C20.9983 7.02944 16.9692 3 11.9991 3C7.02906 3 3 7.02944 3 12C3 16.9706 7.02906 21 11.9991 21C13.5993 21 15.1019 20.5823 16.4039 19.85L21 20.9991L20.2338 15.6356Z"
            stroke="purple"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className=" z-[11] fixed bottom-20 right-5 w-80 bg-gray-800 border rounded-lg shadow-lg flex flex-col">
          {/* Chat header */}
          <div className="bg-gray-700 text-white p-3 rounded-t-lg text-center">
            <h4>Chatbot</h4>
          </div>

          {/* Chat body */}
          <div className="p-4 h-60 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md ${
                    msg.sender === "user"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-500 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {/* Empty div to help scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="flex border-t p-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Trigger send on 'Enter' key press
              className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none bg-gray-500 focus:ring-2 focus:ring-gray-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
