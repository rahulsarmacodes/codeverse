import React, { useContext } from 'react'
import Heatmap from '../../component/heatmap/Heatmap'
import Navbar from '../../component/navbar/Navbar'
import PieChartCP from '../../component/pieChartCP/PieChartCP'
import Hero from '../../component/hero/Hero'
import HomeFooter from '../../component/homeFooter/HomeFooter'
import Features from '../../component/features/Features'
import Leaderboard from '../leaderboard/Leaderboard'


const Home = () => {
  return (
   <div className='font-Inter'>
      <Navbar/>
      <Hero/>
      <Features/>
      <HomeFooter/> 
    </div>
  )
}

export default Home
