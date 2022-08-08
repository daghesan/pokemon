import React from 'react'
import { useState } from 'react'
import Modal from './Modal'

export default function Footer() {

  const [isShown, setIsShown] = useState(false)
  const par = ["This is a React.js app that shows the Pokemon fetched from PokeAPI"]

  return (
    <div className='Footer'>
        <p onClick={() => {setIsShown(true)}}>
          Made by Davide Ghelli Santuliana, 2022 
        </p>
        { isShown ? (<Modal setIsShown={() =>{setIsShown()} } par={par}></Modal> ) : ("")} 
    </div>
  )
}
