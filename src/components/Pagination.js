import React from 'react'
import { useState, useEffect } from 'react'

export default function Pagination({totalPages, currentPage, min, max, onPageChange, onPrevClick, onNextClick}) {
  
 const pages = []
    for(let i=1 ; i<=totalPages; i++){
    pages.push(i);
  }

  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  }
  const handlePrevClick = ()=>{
    onPrevClick();
  }
  const handleNextClick = ()=>{
    onNextClick();
  }

  return (
        <div className="Pagination">
            <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>&laquo;</button>
            { pages ? (

                pages.map(page => {
                    if(page <= max  && page > min) {
                        return(
                    <a key={page} id={page} onClick={handlePageClick} 
                        className={currentPage===page ? 'active-page' : null}>
                        {page}
                    </a>)
                    }else{
                        return null;
                    }
                }
                )
            ) : ""      
            }
            <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>&raquo;</button>
        </div>
 
  )
}
