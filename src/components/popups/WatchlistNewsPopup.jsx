import React from "react";
import Article1 from "../Article1";
import useStore from "../../stores/useStore";

const WatchlistNewsPopup = () => {
  const {setshowWatchlistnewsPopup}=useStore()
  const sampleData = [
    {
      ticker: "TATAMOTORS",
      name: "Tata Motors Ltd",
      related_news: [
        {
          Source: "Economic Times",
          heading: "Tata Motors reports 20% increase in Q3 profits",
          date: "2025-01-09",
          content: "",
          author: "Priya Sharma",
          link: "https://economictimes.indiatimes.com/tata-motors-q3-results",
        },
        {
          Source: "Moneycontrol",
          heading: "Tata Motors launches new EV in India",
          date: "2025-01-08",
          content: "",
          author: "Rohit Gupta",
          link: "https://www.moneycontrol.com/news/tata-motors-new-ev",
        },
      ],
    },
    {
      ticker: "RELIANCE",
      name: "Reliance Industries Ltd",
      related_news: [
        {
          Source: "CNBC TV18",
          heading: "Reliance to invest $10 billion in green energy projects",
          date: "2025-01-07",
          content: "",
          author: "Ankit Mehra",
          link: "https://www.cnbctv18.com/reliance-green-energy-investment",
        },
        {
          Source: "Business Standard",
          heading: "Reliance Q3 revenue crosses $25 billion mark",
          date: "2025-01-06",
          content: "",
          author: "Neha Jain",
          link: "https://www.business-standard.com/reliance-q3-revenue",
        },
      ],
    },
    {
      ticker: "INFY",
      name: "Infosys Ltd",
      related_news: [
        {
          Source: "Livemint",
          heading: "Infosys wins $2 billion contract in the US",
          date: "2025-01-05",
          content: "",
          author: "Sanjay Kumar",
          link: "https://www.livemint.com/infosys-us-contract",
        },
        {
          Source: "Times of India",
          heading: "Infosys to increase workforce by 10% in 2025",
          date: "2025-01-04",
          content: "",
          author: "Manisha Singh",
          link: "https://timesofindia.indiatimes.com/infosys-workforce-increase",
        },
      ],
    },
  ];

  return (
    <div className="fixed w-screen h-full bg-gray-900 z-10 backdrop-blur bg-opacity-50">
      WatchlistNews

      <div>
        {
          sampleData.map(data=><Article1 data={data} />)
        }
      </div>
      <div>
        <button className="px-3 m-2 text-[12px] p-1 bg-gray-700 rounded-lg border-gray-400 border-[1px]" onClick={()=>setshowWatchlistnewsPopup(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default WatchlistNewsPopup;
