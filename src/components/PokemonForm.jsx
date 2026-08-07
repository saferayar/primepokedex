import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardActions, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
  
function PokemonForm({onCreatePokemon = ()=>{}}) {

    const handleClick = ()=>{
        // 1. Construir un objeto pokemon
        const pokemonObj = {nombre, numero, tipo};
        // 2. Llamar a la funcion de creacion que me pasaron por props
        onCreatePokemon(pokemonObj);
    }

    const tipos = [
        { nombre:"fuego", imagen: "fire"},
        { nombre: "agua", imagen: "drop"},
        { nombre: "electrico", imagen: "thunder"},
        { nombre: "planta", imagen: "plant"}
    ];

    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState(1);
    const [tipo, setTipo] = useState(null);
    return (
        <div className='mt-5'>
            <Card variant="outlined">
                <CardHeader title="Registro pokemon" titleTypographyProps={{ variant: 'h6', align: 'center' }} />
                <CardContent>
                    <div className='mb-3'>
                        <TextField
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            variant="outlined"
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            fullWidth
                            id="numero"
                            label="Numero"
                            type="number"
                            slotProps={{
                                htmlInput: { min: 1, max: 151 }
                            }}
                            value={numero}
                            onChange={(e) => setNumero(Number(e.target.value))}
                            variant="outlined"
                        />
                    </div>
                    <div className="mb-3">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="tipo-label">Tipo</InputLabel>
                            <Select
                                labelId="tipo-label"
                                id="tipo"
                                value={tipo ? tipo.nombre : ""}
                                label="Tipo"
                                onChange={(e) => {
                                    const selected = tipos.find(t => t.nombre === e.target.value);
                                    setTipo(selected);
                                }}
                            >
                                {tipos.map((t) => (
                                    <MenuItem key={t.nombre} value={t.nombre}>
                                        {t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={handleClick} variant='contained' color='info' sx={{ borderRadius: 28 }}>
                        Registrar
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default PokemonForm
