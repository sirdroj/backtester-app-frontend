import React, { useState } from 'react'
import GlobalNews from '../../components/GlobalNews'
import WatchlistSentibytes from '../../components/WatchlistSentibytes'
import WatchlistNews from '../../components/WatchlistNews'
import PortfolioNews from './PortfolioNews'
import PortfolioSentibytes from '../../components/PortfolioSentibytes'
import WatchlistSentibytes2 from '../../components/sentibytes/WatchlistSentibytes2'

const NewsHome = () => {

    const [curTab,setTab]=useState(0)

    const tabdc={1:<WatchlistSentibytes2 />,0:<GlobalNews />,2:<WatchlistNews />,3:<PortfolioSentibytes />}

  return (
    <div>
        <nav className='flex justify-between px-2 '>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==0?"border-b-2":""}`} onClick={()=>setTab(0)}>Global News</div>
            {/* <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==2?"border-b-2":""}`} onClick={()=>setTab(2)}>Watchlist News</div> */}
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==1?"border-b-2":""}`} onClick={()=>setTab(1)}>Watchlist SentiBytes</div>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==3?"border-b-2":""}`} onClick={()=>setTab(3)}>Portfolio SentiBytes</div>
        </nav>
    {tabdc[curTab]}
    </div>
  )
}

export default NewsHome