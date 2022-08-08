import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import axios from "axios";

const PokemonName = () => {

    /* DEPRECATED */
     // <Route path="/pokemon/:name" element={<PokemonName />}></Route>

    const params = useParams()
    console.log("params: ");
    console.log(params);

    const [ pokemon, setPokemon ] = useState(null)

    const getPokemon = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        setPokemon(response.data);
    }

    useEffect( () => {
        getPokemon();
    }, [] )
    

    return pokemon ? (
        <div className="PokemonName">
            <Title></Title>
            <Navbar></Navbar>
           <h3>Pokemon Name: {pokemon.name}</h3> 
           
           <div>{pokemon.types.map( (t,i) => {
                return(<p key={i}> Type {i+1}: {t.type.name}</p>)
           })}
           <p>{pokemon.weight}</p>
           <img src={pokemon.sprites.front_default} alt=""></img>
           </div>
           
        </div>
    ) : (<p>Loading ...</p>)

}

export default PokemonName;