const localKey = "pokemon_list_data";
const createPokemon = (pokemon)=>{
    // localStorage
    //  - Se guarda dentro del navegador (cache del navegador)
    //  - Se persiste entre ejecuciones
    //  - Puede contener datos independiente de la sesion del usuario (guardan por sitio)
    // - "Se persiste eternamente"
    // - Permite guardar datos primitivos (comunmente string)  
    // sessionStorage
    // - depende de la sesion del usuario
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lista = [...lista, pokemon];
    localStorage.setItem(localKey, JSON.stringify(lista));
}


const getPokemon = ()=>{
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return [];
}

export {createPokemon, getPokemon};