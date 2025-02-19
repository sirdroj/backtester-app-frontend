import React, { useState } from 'react'
import useStore from '../../stores/useStore';
import SentibyteObject from '../SentibyteObject';
import AddWatchlist from '../../pages/AddWatchlist';
import ManageWatchlists from './ManageWatchlists';

const WatchlistSentibytes2 = () => {
  const [showmanageWatchlist, setshowmanageWatchlist] = useState(false);
  const { sentibytes, sentibytesloading, sentibyteserror } = useStore();
  return (
    <div className="">
      {!showmanageWatchlist && (
        <div>
          <div className="h-full sentibytes-container">
            <div className="pt-1">
              {sentibytesloading && <span>Loading ....</span>}
              {sentibyteserror && <span>error fetching data ....</span>}
              <ul>
                {sentibytes.map((data) => (
                  <SentibyteObject key={data.id} data={data} />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              onClick={() => setshowmanageWatchlist(true)}
              className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
            >
              Manage Watchlists
            </button>
          </div>
        </div>
      )}
      {showmanageWatchlist && (
        <ManageWatchlists
        showmanageWatchlist={showmanageWatchlist}
        setshowmanageWatchlist={setshowmanageWatchlist}
        />
      )}
    </div>
  );
};

export default WatchlistSentibytes2