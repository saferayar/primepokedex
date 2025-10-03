import React, { useRef } from 'react'
import PokemonForm from '../components/PokemonForm'
import PokemonView from '../components/PokemonView'
import { createPokemon } from '../services/PokemonService'
import {Toast} from 'primereact/toast';
function PokemonContainer() {
    const toast = useRef(null);

    const pokemonData = [{ nombre: "pikachu", tipo: "electrico", numero: 1 }, { nombre: "pikachu", tipo: "electrico", numero: 2 }, { nombre: "pikachu", tipo: "electrico", numero: 1 }, { nombre: "pikachu", tipo: "electrico", numero: 1 },
    { nombre: "pikachu", tipo: "electrico", numero: 1 }, { nombre: "pikachu", tipo: "electrico", numero: 7 }, { nombre: "pikachu", tipo: "electrico", numero: 1 }]

    const handleCreate = (pokemon) => {
        createPokemon(pokemon);
        toast.current.show({severity: "success", summary: "Pokemon registrado", detail: "Nuevo pokemon disponible"});
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='row'>
                <div className="col">
                    <PokemonForm onCreatePokemon={handleCreate} ></PokemonForm>
                </div>
                <div className="col">
                    <PokemonView pokemonData={pokemonData} />
                </div>
            </div>
        </>
    )
}

export default PokemonContainer
