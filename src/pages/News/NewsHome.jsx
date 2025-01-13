import React, { useState } from 'react'
import GlobalNews from '../../components/GlobalNews'
import Sentibytes from '../../components/Sentibytes'
import WatchlistNews from '../../components/WatchlistNews'

const NewsHome = () => {

    const [curTab,setTab]=useState(0)

    const tabdc={0:<Sentibytes />,1:<GlobalNews />,2:<WatchlistNews />}

  return (
    <div>
        <nav className='flex justify-between px-2 '>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==0?"border-b-2":""}`} onClick={()=>setTab(0)}>SentiBytes</div>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==1?"border-b-2":""}`} onClick={()=>setTab(1)}>Global News</div>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==2?"border-b-2":""}`} onClick={()=>setTab(2)}>Watchlist News</div>
            <div className={`px-2 border-blue-600 cursor-pointer text-[14px] ${curTab==3?"border-b-2":""}`} onClick={()=>setTab(3)}>Portfolio News</div>
        </nav>
    {tabdc[curTab]}
    </div>
  )
}

export default NewsHome