import React from 'react'

export default function Modal({setIsShown, par}) {

/* 
Map the props to a number of <p>
*/
  return (
    <div id="modal" className="Modal">

      <div className="close-btn" onClick={() =>{setIsShown(false)}}>X</div>
      {
        par.map( (p,i) =>{ return <p key={i}>{p}</p>})
      }
      
    </div>
  )
}
