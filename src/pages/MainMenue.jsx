import React, { useEffect, useState } from "react";
import currentAPI from "../apiendpoint";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";
import Watchlist from "../components/Watchlist";
import Sentybytes from "../components/GlobalNews";
import NewsHome from "./News/NewsHome";
import WatchlistNewsPopup from "../components/popups/WatchlistNewsPopup";
import { MovingIndexes } from "../components/MovingIndexes";
import Couracel from "../components/Couracel";

const MainMenue = () => {
  // const [news, setNews] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [showWatchNews, setShowWAtchNews] = useState(false);
  const { showWatchlistnewsPopup, indexTrend } = useStore();
  return (
    <div className="mt-10 relative ">
      {showWatchlistnewsPopup && <WatchlistNewsPopup />}
      <section className="mx-10">
        <div className="p-2 px-4 bg-black bg-opacity-10 rounded-md flex justify-between">
          <div className="flex w-full"> 
            {/* {"["} */}
            <MovingIndexes />
            {/* {` ]`} */}
          </div>
        </div>
        <div className="flex mt-4 space-x-2">
          {/* <div className="w-1/3">
            <div className="p-1 bg-black bg-opacity-15 rounded-lg">
              <h2 className="w-full text-center text-2xl">BackTest</h2>
              <p className="p-3">
                <ul class="list-disc ml-4">
                  <li>
                    Stock Analysis: Our AI reads and summarizes annual reports,
                    providing concise insights without the need for manual
                    review.
                  </li>
                  <li>
                    No-Code Strategy Development: Users can develop and backtest
                    investment strategies without any coding, democratizing
                    access to sophisticated tools.
                  </li>
                  <li>
                    AI-Powered News Aggregation: Stay informed with real-time,
                    AI-curated news relevant to your interests.
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="p-1 bg-black bg-opacity-15 rounded-lg h-[450px]">
              <Watchlist />
            </div>
          </div> */}
          <div className="w-2/3">
            <Couracel />
          </div>
          <div className="w-1/3">
            {/* <div className="flex justify-between px-2 p-1">
              <Link
                to={"/add_watchlist"}
                className="px-3 text-[12px] p-1 bg-gray-700 rounded-lg border-gray-400 border-[1px]"
              >
                Add Watchlist
              </Link>
              <Link
                to={"/add_portfolio"}
                className="px-3 text-[12px] p-1 bg-gray-700 rounded-lg border-gray-400 border-[1px]"
              >
                Add Potfolio
              </Link>
            </div> */}

            <div className="p-1 bg-black bg-opacity-15 rounded-lg h-[450px]">
              <NewsHome />
              {/* <Sentybytes /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainMenue;
