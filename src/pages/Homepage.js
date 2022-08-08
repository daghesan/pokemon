import axios from "axios"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";
import Title from "../components/Title";
import pokedex from "../img/pokedex.png"

export default function Homepage() {

    const limit = 64
    const nPages = 6

    const [ pokemon, setPokemon ] = useState(null)
    const [ totalCount, setTotalCount ] = useState(0)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ maxPageLimit, setMaxPageLimit ] = useState(6);
    const [ minPageLimit, setMinPageLimit ] = useState(0);
    const [ filter, setFilter ] = useState("")

    const getPokemon = async () => {

        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${limit*(currentPage-1)}&limit=${limit}`);
            setTotalCount(response.data.count)
            setPokemon(response.data.results);
        }catch(error){
            console.log(`Error fetching data: ${error}`)
        }

    }


    useEffect( () => {
        getPokemon();
    }, [currentPage] )
    
    function filterPokemon(){
        const pokemonCopy = [...pokemon]

        if (filter === ""){
            return pokemonCopy
        }else{
            return pokemonCopy.filter(p => (p.name.toLowerCase()).includes(filter))
        }
    }

    const onChangeFilter = (event) =>{
        setFilter(event.target.value);
    }

    const onResetPage = () => {
        setCurrentPage(1)
    }

    const onPageChange = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const onPrevClick = () =>{
        if((currentPage-1) <= minPageLimit){
            setMaxPageLimit(maxPageLimit - nPages);
            setMinPageLimit(minPageLimit - nPages);
        }
        setCurrentPage(prev=> prev-1);
    }

    const onNextClick = () => {
        if(currentPage+1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + nPages);
            setMinPageLimit(minPageLimit + nPages);
        }
        setCurrentPage(prev=>prev+1);
        console.log("next page limits: ", maxPageLimit, minPageLimit);
    }
   


  return (
    <div className="Homepage">
        
        <Title></Title>
        <Navbar onResetPage={onResetPage}></Navbar>


        <form className="Form">
            <label for="search">Search Pokemon</label>
            <input id="search" value={filter} onChange={onChangeFilter} />
        </form>


        <div id="grid-container">
            { 
            !pokemon ? (
                <div className="Loading">
                <p>Loading Pokedex...</p>
                <img src={pokedex} alt=""></img>
                </div>
            ) : filterPokemon().map((p,index) => {
                return <PokemonCard 
                key={index} 
                name={p.name} 
                ></PokemonCard>
            } ) 
            }
            
        </div>
        { pokemon ? (
        <Pagination 
        count={totalCount} 
        totalPages={Math.ceil(totalCount / limit)} 
        currentPage={currentPage} 
        min={minPageLimit} 
        max={maxPageLimit}
        onPrevClick={onPrevClick} 
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        ></Pagination>) : ""}
        
    </div>    
  )
}
