import React, { useEffect, useState } from 'react'
import PokemonForm from '../components/PokemonForm'
import PokemonView from '../components/PokemonView'
import { createPokemon, deleteAll, getPokemon } from '../services/PokemonService'
import { Snackbar, Alert } from '@mui/material'

function PokemonContainer() {
    const [pokemonData, setPokemonData] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const handleCreate = (pokemon) => {
        createPokemon(pokemon);
        setSnackbar({
            open: true,
            message: `Pokemon registrado: ${pokemon.nombre || 'Nuevo pokemon disponible'}`,
            severity: 'success'
        });
        const data = getPokemon();
        setPokemonData(data); 
    }

    const handleEnviar = ()=>{
        deleteAll();
        setPokemonData([]);
        setSnackbar({
            open: true,
            message: 'F a los pokemon',
            severity: 'error'
        });
    }

    useEffect(()=>{
        //Si el arreglo de dependencias esta vacio, este callback se ejecuta solo una vez.
        const data = getPokemon();
        setPokemonData(data); 
    }, []);

    return (
        <>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <div className='row container-fluid px-4'>
                <div className="col-12 col-md-6">
                    <PokemonForm onCreatePokemon={handleCreate} ></PokemonForm>
                </div>
                <div className="col-12 col-md-6">
                    <PokemonView onEnviarPC={handleEnviar} pokemonData={pokemonData} />
                </div>
            </div>
        </>
    )
}

export default PokemonContainer
