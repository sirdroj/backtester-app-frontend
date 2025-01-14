import React, { useState } from 'react'
import "./sentibytes.css"; // Import the CSS file
import SentibyteObject from './SentibyteObject';
import AddPortfolio from '../pages/AddPortfolio';
import useStore from '../stores/useStore';


const PortfolioSentibytes= () => {
    const [showaddPortfolio, setshowaddPortfolio] = useState(false);
    const { portfoliosentibytes, portfoliosentibytesloading, portfoliosentibyteserror } = useStore();
    
    const addportfoliobutton=<button
    onClick={() => setshowaddPortfolio(true)}
    className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
  >
    Add Portfolio
  </button>

    if (portfoliosentibytesloading) {
      return <div>Loading...</div>;
    }
  
    if (portfoliosentibyteserror) {
      return <div>Error: {portfoliosentibyteserror}</div>;
    }
  
    if (!portfoliosentibytes || portfoliosentibytes.length === 0) {
      return (
        <div className="w-full  justify-center h-full">
          {showaddPortfolio && (
            <AddPortfolio
              setshowaddportfolio={setshowaddPortfolio}
              
            />
          )}
          {!showaddPortfolio && (
            <div className="flex justify-center items-center h-[300px] ">
              <div>
                <div className="w-full p-2 text-center">
                  You dont have a Portfolio
                </div>
                <div className="flex justify-center">
                  {addportfoliobutton}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  
    return (
      <div className="">
        {!showaddPortfolio && (
          <div>
            <div className="h-full sentibytes-container">
              <div className="pt-1">
                <ul>
                  {portfoliosentibytes.map((data) => (
                    <SentibyteObject key={data.id} data={data} />
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {/* <button
                onClick={() => setshowaddPortfolio(true)}
                className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
              >
                Add Portfolio
              </button> */}
              {addportfoliobutton}
            </div>
          </div>
        )}
        {showaddPortfolio && (
          <AddPortfolio 
            showaddPortfolio={showaddPortfolio}
            setshowaddPortfolio={setshowaddPortfolio}
          />
        )}
      </div>
    );
  };

export default PortfolioSentibytes