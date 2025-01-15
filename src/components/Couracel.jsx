import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    content:
      "Our AI reads and summarizes annual reports, providing concise insights without the need for manual review.",
    heading:"Stock Analysis"
  },
  {
    id: 2,
    content:
      "Users can develop and backtest investment strategies without any coding, democratizing access to sophisticated tools.",
      heading:"No-Code Strategy Development"  
    },
  {
    id: 3,
    content:
      "Stay informed with real-time, AI-curated news relevant to your interests.",
    heading:"AI-Powered News Aggregation"
  },
];

const Couracel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const getSlidePosition = (index) => {
    if (index === currentIndex) return "translate-x-0 z-20 scale-110";
    if (index === (currentIndex - 1 + slides.length) % slides.length)
      return "-translate-x-[50%] z-10 scale-100 opacity-75";
    if (index === (currentIndex + 1) % slides.length)
      return "translate-x-[50%] z-10 scale-100 opacity-75";
    return "translate-x-[0%] z-1 scale-100 opacity-[20%]";
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden h-full border-[0px]">
      <div className="relative flex items-center justify-center h-[95%]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute transition-transform duration-500 ease-in-out  items-center justify-center w-[35%] h-[60%] bg-gray-800 bg-bl  text-white font-bold rounded-lg shadow-lg ${getSlidePosition(
              index
            )}`}
          >
            <h1 className=" text-center m-5 border-b-2 border-gray-600">{slide.heading}</h1>
            <div className="p-4 text-center">{slide.content}</div>
          </div>
        ))}
        <button
          className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-800"
          onClick={handlePrev}
        >
          {"<"}
        </button>
        <button
          className="absolute right-12 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-800"
          onClick={handleNext}
        >
          {">"}
        </button>
      </div>
      <div
        id="posindicator"
        className="flex justify-center items-center gap-2 mt-1"
      >
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-blue-500 scale-125"
                : "bg-gray-400 scale-100"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Couracel;
