import React, { useState } from "react";

const ChatHistory = ({
  setMessages,
  startNewChat,
  history,
  setHistory,
}) => {
  const [popupIndex, setPopupIndex] = useState(null); // Track which popup is open
  const [isRenaming, setIsRenaming] = useState(null); // Track which chat is being renamed
  const [newName, setNewName] = useState(""); // New name for renaming

  const startRenaming = (index, currentName) => {
    setIsRenaming(index);
    setNewName(currentName || `Chat ${index + 1}`);
    setPopupIndex(null); // Close the popup
  };
  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };
  const renameChat = (index) => {
    setIsRenaming(null); // Stop renaming mode
    const updatedHistory = [...history];
    updatedHistory[index].name = newName || updatedHistory[index].name;
    setHistory(updatedHistory);
    setNewName("");
  };
  const togglePopup = (index) => {
    setPopupIndex(popupIndex === index ? null : index); // Toggle the popup
  };
  return (
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
  );
};

export default ChatHistory;
