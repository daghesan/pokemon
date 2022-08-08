import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "./Modal";
import pokeAlt from "../img/poke-cursor.png"

export default function PokemonCard({name}) {

  const [ singlePokemon, setSinglePokemon ] = useState(null)
  const [ isShown, setIsShown ] = useState(false)

  const refEl = useRef(null)

  useEffect( () => {
    getSinglePokemon()
    document.addEventListener("click", handleClickOutside, true)
  }, [name])

  const handleClickOutside = (e) => {
    if (!refEl.current.contains(e.target)){ //null-check in order to fix a warning
      setIsShown(false)
    }

  }

  const getSinglePokemon = async () => {
    try{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    setSinglePokemon(response.data);
    }catch(error){
      console.log(error)
    }
}

  const renderModal = () =>{
    setIsShown(true)
  }

  function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function getPokeImage(){
    const animated = singlePokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
    const staticImg = singlePokemon.sprites.front_default
    if (animated) {
      return animated
    }else if(staticImg){
      return staticImg
    }else {
      return pokeAlt
    }
  }

  return (
   <div id="grid-item">
   {
   (singlePokemon) ? (
   <img 
   onClick={ () => renderModal()} 
   src={getPokeImage()} 
   alt={singlePokemon.name}
   ref={refEl}
   ></img>
   ) : "Loading"} 

    {isShown && singlePokemon ? ( 
      <Modal setIsShown={() => {setIsShown()}} par={["Pokedex: " + singlePokemon.id, "Name: " + capitalize(singlePokemon.name), "Weight: " + singlePokemon.weight,
      singlePokemon.types.map( (t,i) => {
        return(`Type ${i+1}: ${t.type.name} `)
      })
    ]}></Modal>

    ) : ""}
   </div>
  )
}
