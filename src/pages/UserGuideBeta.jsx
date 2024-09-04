import React, { useState, useEffect, useRef } from "react";

const UserGuide = () => {
  const [position, setPosition] = useState(0); // 0 means st1 is in the center
  const svgRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const pathLengthRef = useRef(0);
  const [current_pos, setCurrent_pos] = useState(1);

  const stepList = [
    "Technical Filters",
    "Fundamental Filters",
    "Strategy Type",
    "Combine Filters",
    "Portfolio Filters"
];
  
  useEffect(() => {
    // Set the width of the SVG to match the container width
    const updateSvgWidth = () => {
      if (svgRef.current) {
        setSvgWidth(svgRef.current.clientWidth);
        const path = document.getElementById("arch");
        pathLengthRef.current = path.getTotalLength();
      }
    };
    updateSvgWidth();
    window.addEventListener("resize", updateSvgWidth);
    return () => window.removeEventListener("resize", updateSvgWidth);
  }, []);

  const elements = ["st1", "st2", "st3", "st4", "st5"];

  const moveElements = (direction) => {
    if (
      (direction === "left" && position >= elements.length - 1) ||
      (direction === "right" && position <= 0)
    ) {
      return; // Prevent moving beyond bounds
    }

    const path = document.getElementById("arch");
    const length = path.getTotalLength();
    const stepSize = length / 5; // Move each step by 1/5 of the path length

    const step = () => {
      const stElements = elements.map((id) => document.getElementById(id));
      const isMovingRight = direction === "right";
      if (isMovingRight) {
        setCurrent_pos(current_pos - 1);
        if (current_pos < 1) {
          setCurrent_pos(1);
        }
      } else if (!isMovingRight) {
        setCurrent_pos(current_pos + 1);
        if (current_pos > 5) {
          setCurrent_pos(5);
        }

      }
      // return
      // if(isMovingRight && current_pos>0){
      //   pos-=1
      // }
      // else if(isMovingRight && current_pos<=0){
      //   return
      // }

      // if(!isMovingRight && current_pos<5){
      //   pos+=1
      // }
      // else if(!isMovingRight && pos>=5){
      //   return
      // }

      stElements.forEach((element) => {
        const currentLength = parseFloat(element.dataset.position);
        const newPosition = isMovingRight
          ? currentLength + stepSize
          : currentLength - stepSize;

        if (element.style.display !== "none") {
          const point = path.getPointAtLength(newPosition);
          element.style.transition = "left 0.3s ease-out, top 0.3s ease-out";
          element.style.left = `${point.x - 35}px`; // Adjust left position to center the element
          element.style.top = `${point.y + 70}px`; // Adjust top position to center the element
          element.dataset.position = newPosition;
        }
      });

      setPosition((prev) => (isMovingRight ? prev - 1 : prev + 1));
    };

    requestAnimationFrame(step);
  };

  const handleLeftClick = () => {
    moveElements("left");
  };

  const handleRightClick = () => {
    moveElements("right");
  };

  useEffect(() => {
    const path = document.getElementById("arch");
    const length = path.getTotalLength();
    elements.forEach((id, index) => {
      const element = document.getElementById(id);
      const point = path.getPointAtLength(length / 2 + (index-current_pos+1) * (length / 5));
      // const point = path.getPointAtLength(length / 2 + (index) * (length / 5));
      element.dataset.position = length / 2 + index * (length / 5);
      element.style.left = `${point.x - 35}px`; // Adjust left position to center the element
      element.style.top = `${point.y + 70}px`; // Adjust top position to center the element
    });
  }, [svgWidth]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* <section className="mx-20"><h1>UserGuide</h1></section> */}
      {current_pos}
      <div className=" w-full h-full flex items-end border-[0px]">
        <section className="relative top-[-100px] bg-opacity-0 border-[0px] border-purple-400 w-full h-[400px] bg-black">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} 200`} // Dynamic viewBox based on container width
            className="border-[0px] h-full absolute z-0"
            width="100%"
            height="100%"
          >
            <path
              id="arch"
              d={`M0,350 A${svgWidth / 2},300 0 0,1 ${svgWidth},350`}
              stroke="white"
              strokeWidth="0.2px"
              fill="none"
            ></path>
          </svg>
          <div className="absolute justify-center w-full items-center bottom-[-150px]">
            <img
              src="/images/backtesting_badge.svg"
              // src="/images/bt_badge.png"
              className=" mx-auto w-[450px]"
            />
          </div>
          {elements.map((id) => (
            // <div>

            <div
              key={id}
              id={id}
              className={`${
                `st${current_pos}` === id
                  ? "shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]"
                  : ""
              } bg-white absolute rounded-full w-[50px] h-[50px] text-black p-4 font-bold z-10 text-[12px]`}
              style={{ display: "block" }} // Initially show all elements
            >
              <div
                className={` ${
                  id.slice(-1) != current_pos &&
                  current_pos - parseInt(id.slice(-1)) <= 2
                    ? "block"
                    : "hidden"
                }  
                border-[#583250] border-solid border-[1px] bg-opacity-50 absolute px-4 p-2 bg-[#111F29] text-white rounded-full w-max top-[-70px] left-[55px]`}
                style={{
                  boxShadow: "inset 0 0 5px 5px rgba(63,36,59, 0.2)",
                }}
              >
                <svg
                  width="100"
                  height="150"
                  className={`${
                    id.slice(-1) != current_pos &&
                    current_pos - parseInt(id.slice(-1)) <= 2
                      ? "block"
                      : "hidden"
                  } absolute bottom-[-86px] left-[-35px]`}
                >
                  <circle cx="30" cy="50" r="5" fill="white" />

                  <path
                    d="M30,50  L20,50 Q5,50 5,65 L5,100"
                    stroke="white"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                {/* {stepList[parseInt(id.slice[-1])] } */}
                {stepList[parseInt(id.slice(-1))-1]}
              
              </div>

              {/* -----l shaped line */}

              <div
                className={` ${id == `st${current_pos}` ? "block" : "hidden"}  
                border-[#583250] z-10 border-solid border-[2px]  absolute px-4 p-2 bg-[#111F29] text-center text-white rounded-lg h-[100px]  w-[500PX] top-[-168px] left-[-221px]`}
                style={{
                  boxShadow: " 0 0 5px 5px rgba(255,255,255, 0.2)",
                }}
              >
                <svg
                  width="100"
                  height="150"
                  className={`${
                    id != `st${current_pos}` ? "hidden" : "block"
                  } absolute bottom-[-120px] left-[240px]`}
                >
                  <circle cx="5" cy="35" r="5" fill="white" className="z-0" />
                  {/* <circle cx="5" cy="100" r="5" fill="white" /> */}

                  <path
                    d="M5,30  
                  L5,100
                  "
                    stroke="white"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                {stepList[parseInt(id.slice(-1))-1]}
                <p className=" font-normal">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ipsa, eaque architecto modi culpa repellat sit.
                </p>
              </div>
              {/* ---straight line */}

              <div className=" flex h-full w-full justify-center items-center">
                <div className="w-max">Step{id.toUpperCase().slice(-1)}</div>
              </div>
            </div>
            // </div>
          ))}

          <div className="flex absolute bottom-[70px] items-center w-full  justify-center">
            <div className="flex justify-between w-[65%]">
              <div
                className="z-10 rightbutton w-10 h-10 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
                onClick={handleRightClick}
              >
                <b>&#8592;</b>
              </div>
              <div
                className="z-10 leftbutton w-10 h-10 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
                onClick={handleLeftClick}
              >
                <b>&#8594;</b>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserGuide;
