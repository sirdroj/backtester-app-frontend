import React from "react";

const MainMenueBeta = () => {
  return (
    <div className="mt-10">
      <section className="mx-10">
        <div className=" p-2 px-4 bg-black bg-opacity-10 rounded-md flex justify-between">
          <div className="flex">
            <b className=" shadow-gl">HeadLines</b> -{`[`}
            <div class="relative overflow-hidden whitespace-nowrap">
              <span class="inline-block animate-scroll text-sm">
                Some Finance headlines running Some Finance headlines running
              </span>
            </div>
            {` ]`}
          </div>
          <div>
            <span className="mx-2">
              <b>NIFTY </b>{" "}
              <span className="text-green-600 rotate-z-on-load">&#8593; 0.2%</span>
              </span>
            <span className="mx-2 ">
              <b>SENSEX </b> 
              <span className=" text-red-600 rotate-z-on-load">&#8595; 0.2%</span>
            </span>
          </div>
        </div>
        <div className="flex mt-4">
            <div className="w-1/3">
                <div className="p-1 bg-black bg-opacity-15 rounded-lg">
                    <h2 className="w-full text-center text-2xl">BackTest</h2>
                    <p className="p-3">some info about backtesting Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, voluptate voluptas. Impedit esse facilis id animi! Obcaecati, autem architecto. Dolorum!</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default MainMenueBeta;
