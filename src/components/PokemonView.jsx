import { Panel } from 'primereact/panel'
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Image} from 'primereact/image';
import React from 'react'
import dropIcon from '../assets/drop.png';
import fireIcon from '../assets/fire.png';
import plantIcon from '../assets/plant.png';
import thunderIcon from '../assets/thunder.png';
import { Button } from 'primereact/button';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
function PokemonView({pokemonData, onEnviarPC}) {
    // {nombre,tipo,numero}
  const handleEnviarPC = ()=>{
    // 1. Confirm dialog para asegurarme de que si quieren efectuar la operacion
    confirmDialog({message: "Desea enviar realmente al pc de bill?", header: "Eliminar pokemon de lista", accept:onEnviarPC })
  }
  
  const tipoColumnTemplate = (row)=>{
    let icono = null;
    
    switch(row.tipo.nombre){
      case 'fuego': icono = fireIcon;
      break;
      case 'agua': icono = dropIcon;
      break;
      case 'planta': icono = plantIcon;
      break;
      case 'electrico': icono = thunderIcon;
    }
    return <Image width='64px' preview src={icono} />
  }
  return (
    <>
    <ConfirmDialog></ConfirmDialog>
    <div className='mt-5'>
      <Panel header="Pokedex">
        <Button severity='danger' label='Enviar al pc de bill' rounded onClick={handleEnviarPC} ></Button>
        <DataTable value={pokemonData} paginator rows={5} >
            <Column header="Nombre" field='nombre'></Column>
            <Column header="Tipo" body={tipoColumnTemplate}></Column>
            <Column header="Numero" sortable field='numero'></Column>
        </DataTable>
      </Panel>
    </div>
    </>
  )
}

export default PokemonView
