import React, { useEffect, useRef, useState } from "react";
// import TechnicalFiltersForm from "../components/forms/technicalFiltersForm";
import FundamentalForm from "../../components/backtest forms/FundamentalForm";
import StrategyType from "../../components/backtest forms/StrategyType";
import TechnicalForm2 from "../../components/backtest forms/TechnicalForm2";
import CombineFilters from "../../components/backtest forms/CombineFilters";
import { Link, useNavigate } from "react-router-dom";
import TechnicalFormExplorer from "../../components/Explore forms/TechnicalFormExplorer";
import FundamentalFormExplore from "../../components/Explore forms/FundamentalFormExplore";
import StrategyTypeExplorer from "../../components/Explore forms/StrategyTypeExplorer";
import CombineFiltersExplorer from "../../components/Explore forms/CombineFiltersExplorer";
import useStore from "../../stores/useStore";
import currentAPI from "../../apiendpoint";

const Explore_home_responsive = () => {
  const pathRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index
  const { set_explore_inputs_Data } = useStore();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const dc = {
    0: <TechnicalFormExplorer />,
    1: <FundamentalFormExplore />,
    2: <StrategyTypeExplorer />,
    3: <CombineFiltersExplorer />,
  };
  const items = [
    "Technical Filters",
    "Fundamental Filters",
    "Strategy Type",
    "Combine Filters",
  ];

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      handlePrev();
    } else if (event.deltaY > 0) {
      handleNext();
    }
  };

  const itemRefs = useRef([]);

  const updateItemPositions = () => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const centerIndex = Math.floor(items.length / 2);

    items.forEach((_, index) => {
      const relativeIndex = index - currentIndex + 2; // Adjust for circular behavior
      const point = path.getPointAtLength(
        (totalLength / (items.length + 0)) * relativeIndex
      );

      const item = itemRefs.current[index];
      if (item) {
        const distanceFromCenter = Math.abs(centerIndex - relativeIndex);
        const scale = 1 - distanceFromCenter * 0.2; // Scale based on distance from center

        item.style.position = "absolute";
        item.style.left = `${point.x}px`;
        item.style.top = `${point.y - 30}px`;
        item.style.transform = `scale(${Math.max(scale, 0.5)})`; // Prevent scale from going negative
        item.style.transition =
          "left 0.5s ease, top 0.5s ease, transform 0.5s ease"; // Smooth transitions
      }
    });
  };

  useEffect(() => {
    updateItemPositions();
  }, [currentIndex,dimensions]);

  const handleNext = () => {
    if (currentIndex == 3) {
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next item
  };

  const handlePrev = () => {
    if (currentIndex == 0) {
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1); // Move to the previous item
  };

  const { explore_inputs_Data, send_Full_Explore_Data } = useStore();

  const navigate = useNavigate();

  function handle_explore() {
    console.log({ explore_inputs_Data });
    send_Full_Explore_Data(explore_inputs_Data);
    navigate("logs");
    set_explore_inputs_Data({});
  }

  return (
    <div className="flex z-[100] p-20 px-0 w-screen  h-[1080px]  fixed left-0 top-0 text-white border-[px]">
      <div className="relative w-[16%]  z-[0]   top-[-9%]  " onWheel={handleWheel}>
        {/* <div className="h-screen flex items-center justify-center absolute left-[20px] border-[1px] border-red-500">
          <div className=" space-y-80 z-[100]">
            <div
              className=" z-10 rightbutton w-10 h-10 bg-black border-gray-700 border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handlePrev}
            >
              <b>&#8593;</b>
            </div>
            <div
              className=" z-10 rightbutton w-10 h-10 bg-black border-gray-700 border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleNext}
            >
              <b>&#8595;</b>
            </div>
          </div>
        </div> */}
        <div className=" h-screen ">
          <ul className="relative left-[-35%] top-[2%]">
            {items.map((item, index) => (
              <li
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => setCurrentIndex(index)}
                className={`${
                  currentIndex === index
                    ? "shadow-[0_0_5px_5px_rgba(255,255,255,0.5)] bg-slate-100 dark:bg-gray-700 dark:bg-opacity-100 dark:text-gray-100"
                    : "bg-slate-100 dark:bg-gray-700 z-10 dark:text-gray-300 dark:bg-opacity-100"
                } cursor-pointer    p-3 items-center  text-center relative  border-[1px] border-[#111F29] text-black w-[70%] text-[12px] font-semibold rounded-xl z-[1000]`}
              >
                {item}

                <svg
                  width="100"
                  height="150"
                  className={`${
                    currentIndex == index
                      ? " rotate-y-0 duration-300  opacity-100 z-0"
                      : " right-[-50px] opacity-0  "
                  } absolute bottom-[-79px] right-[-100px]`}
                >
                  <circle cx={`${window.innerWidth*0.020}`} cy="50" r="6" fill="white" />
                  <path
                    d={`M0,50 L${window.innerWidth*0.021},50`}
                    stroke="white"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
              </li>
            ))}
          </ul>
          <svg
            width={window.innerHeight}
            height={window.innerWidth}
            className="absolute left  border-[0px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="arch"
              ref={pathRef}
              d={`M ${window.innerWidth*0.01},${-window.innerHeight*0.05} A ${window.innerWidth*0.42},${window.innerHeight} 0 0,1 ${window.innerWidth*0.01},${window.innerHeight*1.1} `}
              fill="none"
              stroke="white"
              strokeWidth="1"
              className="h-screen border-[1px]"
            />
          </svg>
        </div>
      </div>

      <div className={`w-[57%]   `}
        style={{  height: `${window.innerHeight*0.78}px` }}
      >
        <div
          id="formsection"
          className="m-2 w-[100%]  h-full bg-black bg-opacity-10 rounded-lg"
          style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
        >
          <div className="relative my-[1%] h-[98%] overflow-y-scroll">
            <style>{`
        /* Scrollbar styles for webkit browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
          width: 8px; /* Adjust width */
          height: 8px; /* Adjust height for horizontal scrollbar */
        }
        
        ::-webkit-scrollbar-track {
          background: #ccc; /* Background of the scrollbar track */
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888; /* Color of the scrollbar thumb */
          border-radius: 10px; /* Rounded corners for thumb */
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555; /* Color on hover */
        }

        /* For Firefox */
        scrollbar-width: thin; /* Makes scrollbar thin */
        scrollbar-color: #888 #f1f1f1; /* thumb color and track color */
      `}</style>

            <div className="flex justify-end border-b-[1px] border-gray-700 text-sm">
              <Link
                to={"/explorer/logs"}
                className=" cursor-pointer px-6 py-1 m-1 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B] "
              >
                View logs
              </Link>
            </div>
            <section className="relative">
              {dc[currentIndex]}

              <div className="mt-10 w-full p-4 flex justify-end">
                {/* <div className="z-10 px-2 w-20 leftbutton h-7 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer">
                Save
              </div> */}
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between px-10 mt-0 text-[12px]">
          <div
            onClick={handlePrev}
            className="scale-[120%] cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
            style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Prev
          </div>
          {currentIndex != 3 && (
            <div
              onClick={handleNext}
              className="scale-[120%] cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
              style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Next
            </div>
          )}
          {currentIndex == 3 && (
            // <Link to={"/explorer/logs"}>
            <div
              // onClick={handleNext}
              className="scale-[120%] flex cursor-pointer pl-6 px-5 py-1 m-2 active:shadow-none shadow-lg sha bg-green-300 bg-opacity-10 rounded-lg border-[1px] border-green-400"
              style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
              onClick={handle_explore}
            >
              Submit
              <svg width="20" height="20" className={``}>
                <circle cx="15" cy="10" r="5" fill="#05FF00" className="z-0" />
              </svg>
            </div>
            // </Link>
          )}
        </div>
      </div>
      <div className="w-[25%] ml-[20px] mx-2"
      style={{  height: `${window.innerHeight*0.805}px` }}
      >
        <div className=" p-2 h-full overflow">
          <div
            className="border-[1px] p-1 pr-3 h-full rounded-lg px-2 overflow-y-scroll"
            style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
          >
            <h1 className="w-full text-center border-b-2 border-gray-500 mb-4">Saved Filters</h1>
            {/* <div>{Object.keys(explore_inputs_Data).length}</div> */}
            {/* <div>{Object.keys(explore_inputs_Data.technical_filters).length}</div> */}
            {Object.entries(explore_inputs_Data).map(([filter]) => {
              if ((Object.entries(explore_inputs_Data[filter]).length = 0)) {
                return;
              }
              let x = explore_inputs_Data[filter];
              if (filter == "technical_filters") {
                return (
                  <div className="  rounded">
                    <div className="bg-green-500 m-1 w-full rounded-md p-1 bg-opacity-10 ">
                    <div className="font-bold">{filter} :-</div>
                    {/* {console.log("explore_inputs_Data[filter]",explore_inputs_Data[filter])} */}

                      {Object.entries(x).map(([sub, subinput]) => (
                        <div className="ml-1  pl-[2px] p-1 my-2">
                        <div>{sub}:-</div>
                        <div className="border-l-[1px] ml-1 pl-1">
                          {Object.entries(subinput).map(([key, val]) => (
                            <div>
                              {key} <b className="text-gray-800">:</b> {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      ))}
                    </div>
                    {/* <button onClick={() => ""}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6_12293)">
                        <path
                          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_12293">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button> */}
                  </div>
                );
              }
              if (filter == "fundamental_filters") {
                return (
                  <div className=" rounded ">
                    <div className="bg-blue-500 m-1 w-full rounded-md p-1 bg-opacity-10 ">
                      <div className="font-bold">{filter} :-</div>
                      {/* {console.log("explore_inputs_Data[filter]",explore_inputs_Data[filter])} */}

                      {Object.entries(x).map(([field, inputs]) => (
                        <div 
                        className=" bg-gray-600 rounded-md pl-1 bg-opacity-60"
                        style={{
                            boxShadow: '-2px 5px 5px rgba(55, 65, 81, 1)', // Adds shadow below the element
                          }}
                        >
                          <span className="font-semibold">{field}:-</span>
                          {Object.entries(inputs).map(([sub, subinput]) => (
                            <div className="ml-1  pl-[2px] p-1 my-2">
                              <div>{sub}:-</div>
                              <div className="border-l-[1px] ml-1 pl-1">
                                {Object.entries(subinput).map(([key, val]) => (
                                  <div>
                                    {key} <b className="text-gray-800">:</b> {val}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    {/* <button onClick={() => ""}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6_12293)">
                        <path
                          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_12293">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button> */}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore_home_responsive;
