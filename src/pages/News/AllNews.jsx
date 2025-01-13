import React from 'react'
import useStore from '../../stores/useStore';

const AllNews = () => {
    const { news,newserror,newsloading } = useStore();

  return (
    <div className="mx-4 mt-4 overflow-hidden">
        <h1>All news</h1>
      <ul className="overflow-x-hidden over ">
        {!newsloading &&
          !newserror &&
          news.map((item) => {
            return item.heading ? (
              <li
                key={item.id || item.heading}
                className="mx-1 bg-white bg-opacity-5 p-1 rounded-lg my-1"
              >
                <a target="blank" href={item.link}>
                  <h1 className="text-[17px]">{item.heading}</h1>
                  <p className="text-[15px] ">
                    {item.content}
                  </p>
                  <div className=" flex justify-between text-[10px] ">
                    <p className="">
                      by {item.author} on {item.source}
                    </p>
                    <p className="opacity-50">{item.date.slice(0, 16)}</p>
                  </div>
                  {/* <p className="text-[12px]">{item.content}</p> */}
                </a>
              </li>
            ) : null;
          })}
      </ul>
    </div>
  )
}

export default AllNews