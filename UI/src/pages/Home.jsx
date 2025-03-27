import React from 'react'
import Nav from "../componets/Nav"
import Hero from "../images/home.png"
import CardGrid from '../componets/CardGrid'
import Upcoming from '../componets/Upcoming'
import Footer from '../componets/Footer'

const Home = () => {
  return (
    <>

    <Nav/>
    <div className= " bg-purple-500 text-white py-12 px-12 flex items-center justify-between  bg-cover" >
    <div>
      <h2 className="text-4xl font-bold mb-4">Your Next Movie Night Starts Here – Book Tickets in a Click!</h2>
    </div>
    <div>
        <img src={Hero} />
    </div>
</div>
<CardGrid />
<Upcoming />
<Footer />

    </>
  )
}

export default Home