import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox } from '@mui/material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TasksTable( { data, updateTask, completeTask }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rowInfo, setRowInfo] = useState();
  const [formData, setFormData] = useState();


  const handleOpen = (row) => { setRowInfo(row); setOpen(true); };
  const handleClose = () => { setOpen(false); setChecked(false); };

  const handleSubmit = (e) => {
    // prompt confirm if task completed checkbox is checked
    // save form inputs and open confirmation dialog
    if (checked) {
      setFormData(e);
      setConfirmOpen(true)
    }

    else {
      updateTask(e);
      handleClose();
    }
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    completeTask(formData);
    setOpen(false);
    setChecked(false);
  };

  const columns = [
      { id: 'id', label: 'Evento' },
      { id: 'status', label: 'Status' },
      { id: 'responsableId', label: 'Responsável' },
      { id: 'createdAt', label: 'Data\u00a0de\u00a0Criação' },
      { id: 'dateToComplete', label: 'Prazo' }]
      

  return (
    <>    
    <Paper sx={{ width: '50%' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, backgroundColor: '#f6f6f6' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleOpen(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>

  <Dialog open={open} onClose={handleClose}>
  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
    <DialogTitle>
      Editar Tarefa
    </DialogTitle>
    <DialogContent>
    <TextField
        disabled
        margin="dense"
        id="id"
        label="Evento"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={rowInfo ? rowInfo.id : ''}
    />

    <TextField
        margin="dense"
        id="status"
        label="Status"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={rowInfo ? rowInfo.status : ''}
    />

    <TextField
        margin="dense"
        id="responsableId"
        label="Responsável"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={rowInfo ? rowInfo.responsableId : ''}
    />

    <TextField
        margin="dense"
        id="dateToComplete"
        label="Prazo"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={rowInfo ? rowInfo.dateToComplete : ''}
    />

    Tarefa Concluida
    <Checkbox
      checked={checked}
      onChange={(e) => {setChecked(e.target.checked)}}
      id="completed"
    />

    </DialogContent>
    <DialogActions>
      <Button type="submit" variant="contained">
        Salvar
      </Button>
    </DialogActions>
  </form>
  </Dialog>



  <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
    <DialogTitle>
      Tem certeza que deseja concluir a tarefa?
    </DialogTitle>
    <DialogActions>
      <Button variant="contained" color="error" onClick={() => setConfirmOpen(false)}>
        Não
      </Button>
      <Button variant="contained" color="success" onClick={handleConfirm}>
        Sim
      </Button>
    </DialogActions>
  </Dialog>
  </>
  )
}

export default TasksTable