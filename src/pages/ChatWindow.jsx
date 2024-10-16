import React, { useState, useRef, useEffect } from "react";
import { getBotReply } from "./ChatBot";
import FileUploadPopup from "../components/FileUploadPopup ";

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(""); // Input value
  const [history, setHistory] = useState([]); // Store chat history
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
  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = input;

      // Append user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
      ]);

      // Get bot reply
      const botReply = getBotReply(userMessage);

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

  // Handle 'Enter' key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Start a new chat, clear messages and save current chat to history
  //   const startNewChat = () => {
  //     if (messages.length > 0) {
  //       setHistory((prevHistory) => [...prevHistory, messages]); // Save current chat to history
  //       setMessages([]); // Clear chat messages
  //     }
  //   };

  const startNewChat = () => {
    if (messages.length > 0) {
      const firstMessage = messages[0].text.slice(0, 20); // Limit to 20 characters for the name
      setHistory((prevHistory) => [
        { messages: messages, name: firstMessage }, // New chat added at the beginning
        ...prevHistory, // Old chats follow
      ]);
      setMessages([]); // Clear current chat messages
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className=" z-[11] mt-7 p-4 px-2 mx-2 h-[86vh] w-[98vw] border-[1px] border-gray-800 bg-gray-700 dark:bg-slate-900 rounded-lg shadow-lg flex justify-evenly"
      style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.1)" }}
    >
      {/* Chat History */}
      <div
        className="rounded-md w-[16%] h-full p-2 dark:bg-gray-800 bg-gray-600 mb-2"
        //   style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
      >
        <h1 className="text-center font-semibold dark:text-white text-gray-200 ">History</h1>
        <button
          className="flex items-center bg-gray-700 text-white p-2 mt-2 rounded-full w-full justify-center pr-6 hover:bg-gray-600"
          onClick={startNewChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Chat
        </button>
        <div className="mt-4 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500">No chat history yet...</p>
          ) : (
            history.map((chat, index) => (
              <div
                key={index}
                className="p-2 my-1 rounded-md bg-gray-700 text-white cursor-pointer"
                onClick={() => setMessages(chat.messages)} // Load previous chat
              >
                {chat.name || `Chat ${index + 1}`}{" "}
                {/* Display the starting message */}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-[82%] flex flex-col-reverse">
        <div className="flex border-t-gray-600 mt-4 pt-2  w-full">
          <div className="flex w-full  rounded-full p-2 mr-2 focus:outline-none bg-gray-800 focus:ring-2 focus:ring-gray-400">
            {/* <div
              id="attach"
              className="flex justify-center items-center p-2 mx-1 rounded-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2982 12.2412L12.3721 20.1673C10.2147 22.3247 6.97931 22.5794 4.77977 20.3799C2.62244 18.2225 2.90283 15.0972 5.10237 12.8976L14.0122 3.98783C15.3758 2.6242 17.5711 2.6242 18.9347 3.98783C20.2984 5.35147 20.2984 7.54679 18.9347 8.91042L9.8685 17.9767C9.18884 18.6563 8.08688 18.6563 7.40721 17.9767C6.72754 17.297 6.72754 16.195 7.40721 15.5154L15.4898 7.4328"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div> */}
            <FileUploadPopup />
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Trigger send on 'Enter' key press
              className="flex-1  rounded-lg p-2 mr-2 outline-none border-none bg-gray-800  w-10/12"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-600 opacity-30"
            >
              <svg
                fill="white"
                height="25px"
                width="25px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <path
                  id="XMLID_9_"
                  d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606
                C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0
                c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80
                C261.465,190.251,261.465,199.749,255.606,205.606z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 full overflow-y-auto   rounded-md">
          {messages.length === 0 ? (
            <p className="dark:text-gray-700 text-gray-500">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md ${
                  msg.sender === "user"
                    ? "dark:bg-gray-900 bg-gray-400 text-gray-700 dark:text-white"
                    : "dark:bg-gray-800 bg-gray-200 text-gray-700 dark:text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
          {/* Empty div to help scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
