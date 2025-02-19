import React from "react";
import SentibyteObject from "../SentibyteObject";

const SentibytesForWatchlist = ({sentibytes}) => {
  return (
    <div className="h-full sentibytes-container">
      <div className="pt-1">
        <ul>
          {sentibytes.map((data) => (
            <SentibyteObject key={data.id} data={data} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SentibytesForWatchlist;
