import React, { useState } from 'react'
import useStore from '../../stores/useStore';
import SentibyteObject from '../SentibyteObject';
import ManagePortfolios from './ManagePortfolios';

const PortfolioSentibytes2 = () => {
  const [showmanagePortfolio, setshowmanagePortfolio] = useState(false);
 const { portfoliosentibytes, portfoliosentibytesloading, portfoliosentibyteserror } = useStore();

  return (
    <div className="">
      {!showmanagePortfolio && (
        <div>
          <div className="h-full sentibytes-container">
            <div className="pt-1">
              {portfoliosentibytesloading && <span>Loading ....</span>}
              {portfoliosentibyteserror && <span>error fetching data ....</span>}
              <ul>
                {portfoliosentibytes.map((data) => (
                  <SentibyteObject key={data.id} data={data} />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              onClick={() => setshowmanagePortfolio(true)}
              className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
            >
              Manage Portfolio
            </button>
          </div>
        </div>
      )}
      {showmanagePortfolio && (
        <ManagePortfolios
        showmanagePortfolio={showmanagePortfolio}
        setshowmanagePortfolio={setshowmanagePortfolio}
        />
      )}
    </div>
  );
};


export default PortfolioSentibytes2