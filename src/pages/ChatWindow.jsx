import React, { useState, useRef, useEffect } from "react";
// import FileUploadPopup from "../components/FileUploadPopup ";
// import ChatHistory from "./chatbot/chatHistory";
import axios from "axios";
import currentAPI from "../apiendpoint";
import useStore from "../stores/useStore";

const ChatWindow = () => {
  // const [messages, setMessages] = useState([]); // Store messages
  // const [history, setHistory] = useState([]); // Store chat history

  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage on initialization
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const [history, setHistory] = useState(() => {
    // Load history from localStorage on initialization
    const storedHistory = localStorage.getItem("history");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility
  const [uploadedFile, setUploadedFile] = useState(null);

  const [input, setInput] = useState(""); // Input value
  const messagesEndRef = useRef(null); // Reference to message container's end

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [popupIndex, setPopupIndex] = useState(null); // Track which popup is open
  const [isRenaming, setIsRenaming] = useState(null); // Track which chat is being renamed
  const [newName, setNewName] = useState(""); // New name for renaming

  const [loading, setLoading] = useState(false);

  const getBotReplyAPI = async (userMessage, uploadedFile) => {
    try {
      // Create a FormData object
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("role", "user"); // Add the role to the FormData
      formData.append("content", userMessage);
      formData.append("token", token);

      // Add the user's message to the FormData

      // Check if a file is uploaded and add it to the FormData
      if (uploadedFile) {
        formData.append("file", uploadedFile); // Add the file directly
      }

      // Send the form data to the backend
      const response = await axios.post(
        // "http://127.0.0.1:8000/sentientgpt_chat/",
        `${currentAPI}/sentientgpt_chat/`,
        // `${currentAPI}/sentient_chat2/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct headers
          },
        }
      );

      console.log(response.data); // Log the response from the backend
      if (response.data && response.data.reply) {
        return response.data.reply; // Return the bot's reply from the API
      } else {
        return "Sorry, I didn't understand that.";
      }
    } catch (error) {
      console.error("Error fetching bot reply:", error);
      return "Sorry, I'm having trouble responding right now."; // Fallback message on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const togglePopup = (index) => {
    setPopupIndex(popupIndex === index ? null : index); // Toggle the popup
  };

  const startRenaming = (index, currentName) => {
    setIsRenaming(index);
    setNewName(currentName || `Chat ${index + 1}`);
    setPopupIndex(null); // Close the popup
  };

  const renameChat = (index) => {
    setIsRenaming(null); // Stop renaming mode
    const updatedHistory = [...history];
    updatedHistory[index].name = newName || updatedHistory[index].name;
    setHistory(updatedHistory);
    setNewName("");
  };
  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Update localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const validDocTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const validVideoTypes = ["video/mp4", "video/x-m4v", "video/*"];

      if (
        e.target.id === "image-upload" &&
        !validImageTypes.includes(file.type)
      ) {
        setMessage("Please upload a valid image file (JPEG, PNG, GIF).");
      } else if (
        e.target.id === "doc-upload" &&
        !validDocTypes.includes(file.type)
      ) {
        setMessage("Please upload a valid document file (PDF, DOC, DOCX).");
      } else if (
        e.target.id === "video-upload" &&
        !validVideoTypes.includes(file.type)
      ) {
        setMessage("Please upload a valid video file (MP4, M4V).");
      } else {
        setMessage("File uploaded successfully!");
        setUploadedFile(file); // Store the file in state
        setIsPopupOpen(false); // Close popup after file selection
      }
    }
  };

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

  // const sendMessage = async (input) => {
  //   if (input.trim() || uploadedFile) {
  //     const userMessage = input.trim();
  //     if (userMessage && !uploadedFile) {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: userMessage, sender: "user" },
  //       ]);
  //     }
  //     if (uploadedFile) {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: userMessage, sender: "user", filename: uploadedFile.name },
  //       ]);
  //     }

  //     const formData = new FormData();
  //     if (uploadedFile) {
  //       formData.append("file", uploadedFile);
  //       setUploadedFile(null); // Reset the uploaded file
  //     }
  //     formData.append("message", userMessage);

  //     const botReply = await getBotReplyAPI(userMessage, uploadedFile);
  //     // const botReply = await getBotReply(userMessage, uploadedFile);
  //     // setMessages((prevMessages) => [
  //     //   ...prevMessages,
  //     //   { text: botReply, sender: "bot" },
  //     // ]);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: botReply, sender: "bot" },
  //     ]);
  //     scrollToBottom();
  //   }
  // };

  const sendMessage = async (input) => {
    if (input.trim() || uploadedFile) {
      const userMessage = input.trim();
      if (userMessage && !uploadedFile) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: userMessage, sender: "user" },
        ]);
      }
      if (uploadedFile) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: userMessage, sender: "user", filename: uploadedFile.name },
        ]);
      }

      const formData = new FormData();
      if (uploadedFile) {
        formData.append("file", uploadedFile);
        setUploadedFile(null); // Reset the uploaded file
      }
      formData.append("message", userMessage);

      const botReply = await getBotReplyAPI(userMessage, uploadedFile);
      // const botReply = await getBotReply(userMessage, uploadedFile);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
      // setMessages( [
      //   ...messages,
      //   { text: botReply, sender: "bot" },
      // ]);
      scrollToBottom();
    }
  };

  // Handle 'Enter' key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
      setInput("");
      setMessage("");
    }
  };

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

  // const formatMessageWithHTML = (text) => {
  //   return { __html: text.replace(/\n/g, "<br />") };
  // };

  const formatMessageWithHTML = (text) => {
    // Remove all asterisks from the string
    const cleanedText = text.replace(/\*/g, "");

    // Remove backslashes and unwanted square brackets for mathematical expressions
    const formattedText = cleanedText
      .replace(/\#\#\#(.*?)(\n|$)/g, "<b>$1</b><br />") // Bold text between ### and newline or end of string
      .replace(/\\|[\[\]]/g, "") // Remove backslashes and square brackets
      .replace(/\n/g, "<br />"); // Replace remaining newlines with <br />

    return { __html: formattedText };
};


  return (
    <div
      className="relative  z-[11] mt-7 p-4 px-2 mx-2 h-[86vh] w-[98vw] border-[1px] border-gray-800  dark:bg-slate-900 rounded-lg shadow-lg flex justify-evenly"
      style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.1)" }}
    >
      {/* Chat History */}
      {/* <ChatHistory  setMessages={setMessages} popupIndex={popupIndex}  setNewName={setNewName} renameChat={renameChat} startRenaming={startRenaming} handleDelete={handleDelete} setPopupIndex={setPopupIndex} startNewChat={startNewChat} history={history} isRenaming={isRenaming}/> */}
      <div
        className="rounded-md w-[16%] h-full p-2 dark:bg-gray-800 bg-gray-900 bg-opacity-20 mb-2"
        //   style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
      >
        <h1 className="text-center font-semibold dark:text-white text-gray-200 ">
          History
        </h1>
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
                className="px-2 p-1 my-1 rounded-md bg-gray-700 text-white cursor-pointer "
                onClick={() => setMessages(chat.messages)} // Load previous chat
              >
                <div className=" h-10 justify-between items-center flex overflow-hidden">
                  {isRenaming === index ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={() => renameChat(index)} // Rename when input loses focus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") renameChat(index); // Rename on Enter key
                      }}
                      className="text-black rounded-md  "
                      autoFocus
                    />
                  ) : (
                    <span>{chat.name || `Chat ${index + 1}`}</span>
                  )}

                  {/* Three dots button */}
                  <div className="">
                    {isRenaming != index && (
                      <button
                        className="text-gray-400 ml-2 text-center text-2xl mb-3 "
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the main click event
                          togglePopup(index);
                        }}
                      >
                        {/* Unicode for three dots */}
                        ...
                      </button>
                    )}
                    {/* Popup for rename and delete options */}
                    {popupIndex === index && (
                      <div
                        className="fixed mt-2 w-24 bg-gray-700 rounded-md shadow-lg z-10"
                        onClick={(e) => e.stopPropagation()} // Prevent closing popup on click
                      >
                        <button
                          onClick={() => startRenaming(index, chat.name)}
                          className="block w-full px-2 py-1 text-left hover:bg-gray-800"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(index);
                            setPopupIndex(null);
                          }}
                          className="block w-full px-2 py-1 text-left hover:bg-gray-800"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-[82%] flex flex-col-reverse">
        <div className="flex border-t-gray-600 mt-4 pt-2  w-full">
          <div className="flex w-full  rounded-full p-2 mr-2 focus:outline-none bg-gray-800 focus:ring-2 focus:ring-gray-400">
            {/* <FileUploadPopup /> */}

            <div className="relative inline-block">
              {/* Attach button */}
              <div
                id="attach"
                className="flex justify-center items-center p-2 mx-1 rounded-md cursor-pointer"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
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
              </div>

              {/* Popup with upload options */}
              {isPopupOpen && (
                <div className="absolute left-0 bottom-12 bg-gray-700 shadow-lg p-4 rounded-lg">
                  <div className="flex flex-col space-y-3">
                    {/* Document Upload Option */}
                    <div className="flex items-center space-x-2">
                      <label
                        htmlFor="doc-upload"
                        className="flex items-center space-x-1 cursor-pointer"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13ZM6 10H12V12H6V10ZM6 14H18V16H6V14ZM6 18H18V20H6V18Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Upload Document</span>
                      </label>
                      <input
                        id="doc-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Video Upload Option */}
                    {/* <div className="flex items-center space-x-2">
                      <label
                        htmlFor="video-upload"
                        className="flex items-center space-x-1 cursor-pointer"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 10.5V7C17 5.9 16.1 5 15 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19H15C16.1 19 17 18.1 17 17V13.5L21 17V7L17 10.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Upload Video</span>
                      </label>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div> */}
                  </div>
                  {/* Message Display */}
                  {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
                </div>
              )}
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Trigger send on 'Enter' key press
              className="flex-1  rounded-lg p-2 mr-2 outline-none border-none bg-gray-800  w-10/12"
              placeholder="Type your message..."
            />
            <button
              onClick={() => {
                sendMessage(input);
                setInput("");
              }}
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
        {uploadedFile && (
          <div className="flex items-center bg-gray-700 w-min p-2 space-x-2 rounded-lg text-white">
            {/* Conditional icon based on file type */}
            {uploadedFile.type.startsWith("image/") ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L7.41 9.59L10 12.17L16.59 5.59L19 8L10 17Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13ZM6 10H12V12H6V10ZM6 14H18V16H6V14ZM6 18H18V20H6V18Z"
                  fill="currentColor"
                />
              </svg>
            )}

            {/* Display file name */}
            <span>{uploadedFile.name}</span>
          </div>
        )}

        <div id="messageBox" className="p-4 full overflow-y-auto rounded-md">
          {messages.length <= 0 ? (
            <p className="dark:text-gray-700 text-gray-500">
              No messages yet...
            </p>
          ) : (
            // <div>{messages.length}</div>
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md ${
                  msg.sender !== "user"
                    ? "dark:bg-gray-900 bg-gray-100 bg-opacity-15 text-gray-100 font-semibold dark:text-white"
                    : "dark:bg-gray-800 bg-gray-300 bg-opacity-75 text-gray-900 font-semibold dark:text-gray-300"
                }`}
              >
                {/* File Display */}
                {msg.filename && (
                  <div className="flex items-center bg-gray-700 w-min mb-2 p-2 space-x-2 rounded-lg text-white">
                    {/* Conditional icon based on file type */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label={`File: ${msg.filename}`} // Accessibility
                    >
                      <path
                        d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13ZM6 10H12V12H6V10ZM6 14H18V16H6V14ZM6 18H18V20H6V18Z"
                        fill="currentColor"
                      />
                    </svg>

                    {/* Display file name */}
                    <span>{msg.filename}</span>
                  </div>
                )}
                {/* Conditional Rendering for Text or File */}
                <div
                  dangerouslySetInnerHTML={formatMessageWithHTML(msg.text)}
                  />
                  {/* {msg.text} */}
              </div>
            ))
          )}
          {loading && <div>{"loading...."}</div>}
          {/* Empty div to help scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
