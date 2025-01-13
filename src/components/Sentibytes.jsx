import React from "react";
import useStore from "../stores/useStore";
import SentibyteObject from "./SentibyteObject";
import "./sentibytes.css"; // Import the CSS file

const Sentibytes = () => {
  const { sentibytes, sentibytesloading, sentibyteserror } = useStore();

  if (sentibytesloading) {
    return <div>Loading...</div>;
  }

  if (sentibyteserror) {
    return <div>Error: {sentibyteserror}</div>;
  }

  if (!sentibytes || sentibytes.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="">
      <div className="h-full sentibytes-container">
        <div className="pt-1">
          <ul>
            {sentibytes.map((data) => (
              <SentibyteObject key={data.id} data={data} />
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Sentibytes;
