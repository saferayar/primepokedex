import React, { useState } from 'react'
import { Card, CardContent, CardHeader, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import dropIcon from '../assets/drop.png';
import fireIcon from '../assets/fire.png';
import plantIcon from '../assets/plant.png';
import thunderIcon from '../assets/thunder.png';

function PokemonView({pokemonData, onEnviarPC}) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onEnviarPC();
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTipoIcono = (nombre) => {
    switch(nombre){
      case 'fuego': return fireIcon;
      case 'agua': return dropIcon;
      case 'planta': return plantIcon;
      case 'electrico': return thunderIcon;
      default: return null;
    }
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - pokemonData.length);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar pokemon de lista"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea enviar realmente al pc de bill?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus color="error">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <div className='mt-5'>
        <Card variant="outlined">
          <CardHeader 
            title="Pokedex" 
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <Button 
                variant="contained" 
                color="error" 
                sx={{ borderRadius: 28 }} 
                onClick={handleClickOpen}
              >
                Enviar al pc de bill
              </Button>
            }
          />
          <CardContent>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="pokemon table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Número</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pokemonData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell>
                          {row.tipo && row.tipo.nombre ? (
                            <img 
                              src={getTipoIcono(row.tipo.nombre)} 
                              alt={row.tipo.nombre} 
                              style={{ width: '64px', height: 'auto' }} 
                            />
                          ) : null}
                        </TableCell>
                        <TableCell align="right">{row.numero}</TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 73 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pokemonData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default PokemonView
