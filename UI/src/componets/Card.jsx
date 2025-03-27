import React from 'react'
import poster from './marco.png'

const Card = () => {
  return (
    <>

<div className="bg-white shadow-md ">
        <a href="marco.html"><img src={poster} alt="Movie Poster" className="w-full" />
            <div className="p-4">
              <h4 className="font-bold text-lg">Marco</h4>
              <p className="text-gray-600">Malayalam</p>
            </div>
            </a>
      </div>

    </>
  )
}

export default Card