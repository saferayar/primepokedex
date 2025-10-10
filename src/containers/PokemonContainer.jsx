import React, { useEffect, useRef, useState } from 'react'
import PokemonForm from '../components/PokemonForm'
import PokemonView from '../components/PokemonView'
import { createPokemon, deleteAll, getPokemon } from '../services/PokemonService'
import {Toast} from 'primereact/toast';
function PokemonContainer() {
    const toast = useRef(null);

    const [pokemonData, setPokemonData] = useState([]);

    const handleCreate = (pokemon) => {
        createPokemon(pokemon);
        toast.current.show({severity: "success", summary: "Pokemon registrado", detail: "Nuevo pokemon disponible"});
        const data = getPokemon();
        setPokemonData(data); 
    }

    const handleEnviar = ()=>{
        deleteAll();
        setPokemonData([]);
        toast.current.show({severity:"danger", summary: "F a los pokemon"});
    }

    useEffect(()=>{
        //Si el arreglo de dependencias esta vacio, este callback se ejecuta solo una vez.
        const data = getPokemon();
        setPokemonData(data); 
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <div className='row'>
                <div className="col">
                    <PokemonForm onCreatePokemon={handleCreate} ></PokemonForm>
                </div>
                <div className="col">
                    <PokemonView onEnviarPC={handleEnviar} pokemonData={pokemonData} />
                </div>
            </div>
        </>
    )
}

export default PokemonContainer
