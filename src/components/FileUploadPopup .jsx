import { useState } from 'react';

const FileUploadPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files); // Handle file input change here
    setIsPopupOpen(false); // Close popup after file selection
  };

  return (
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
            {/* Image Upload Option */}
            <div className="flex items-center space-x-2">
              <label htmlFor="image-upload" className="flex items-center space-x-1 cursor-pointer">
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
                <span>Upload Image</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Document Upload Option */}
            <div className="flex items-center space-x-2">
              <label htmlFor="doc-upload" className="flex items-center space-x-1 cursor-pointer">
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
            <div className="flex items-center space-x-2">
              <label htmlFor="video-upload" className="flex items-center space-x-1 cursor-pointer">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadPopup;
