import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import { useTable } from "react-table";


function TasksTable( { data, updateTask, completeTask }) {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [rowInfo, setRowInfo] = React.useState();
  const [formData, setFormData] = React.useState();


  const handleOpen = (row) => {
    setRowInfo(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

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
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Evento',
        accessor: 'id',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Responsável',
        accessor: 'responsableId',
      },
      {
        Header: 'Data de Criação',
        accessor: 'createdAt',
      },
      {
        Header: 'Prazo',
        accessor: 'dateToComplete',
      },
    ],
    []
  )
  
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
      

  return (
    <>
    <table {...getTableProps()} style={{ borderSpacing: '0px 2px' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                background: '#fafafa',
                border: 'none',
                color: 'black',
                padding: '20px 50px 20px 50px',
                fontWeight: 'bold',
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()} onClick={() => handleOpen(row.original)}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '20px 50px 20px 50px',
                    background: 'white',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>

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