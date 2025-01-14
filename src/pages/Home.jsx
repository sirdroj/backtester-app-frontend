import React from 'react'
import { NavbarTop } from '../components/NavbarTop'
import MainMenue from './MainMenue'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        
        {/* <Outlet /> */}
        <MainMenue />
        {/* <MainMenueBeta /> */}
    </div>
  )
}

export default Home