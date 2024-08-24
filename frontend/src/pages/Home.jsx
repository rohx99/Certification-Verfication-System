/* eslint-disable no-unused-vars */

import React from 'react'
import Hero from '../components/Hero'
import Register from './Register'
import Description from '../components/Description'

const Home = () => {
  return (
    <div className='bg-gradient-to-t from-[#111111] to-[#21251f] flex flex-col items-center justify-center'>
    <Hero />
    <Description />
    <Register/>
    </div>
  )
}

export default Home