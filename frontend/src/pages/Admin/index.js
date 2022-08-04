import React ,{useEffect, useState} from "react";
import MaterialCard from "../../components/MaterialCard"
import DeckCard from "../../components/DeckCard"
import {Grid, Box, Typography, Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Collapse, Alert} from '@mui/material';
import axios from '../../api/axios'
import NotificationsSlider from '../../components/NotificationsSlider'
import AddTaskButton from '../../components/AddTaskButton'

const Admin = () => {
    const [open, setOpen] = useState(false);
    const [openAddTask, setOpenAddTask] = useState(false);
    const [materialMeasures, setMaterialMeasures] = useState([]);
    const UPDATE_MS = 5000; // 5 seconds

    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const ALERT_TIMER_MS = 3000 // 3 seconds

    const getMaterialMeasures = () => {
        axios.get(`/iot/materials`)
        .then(response => {
            setMaterialMeasures(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const sendAddTask = (e) => {
        axios.post(
            `/task`,
            {
                "responsableId": e.target.responsableId.value,
                "status": e.target.status.value,
                "dateToComplete": e.target.dateToComplete.value,
                "alertId": e.target.alertId.value
            }
        ).then(() => {
            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);
            }, ALERT_TIMER_MS)

        }).catch(e => {
            console.log(e);
            setErrorAlert(true);

            setTimeout(() => {
              setErrorAlert(false);
            }, ALERT_TIMER_MS)
        })
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getMaterialMeasures();
        }, UPDATE_MS);

        return () => {
          clearInterval(interval);
        }
    }, []);

    const dataDeck = React.useMemo(
        () => [
            {   id: 1,
                name: "Deck A",
                equipment: "Equipamento A",
                status: "Disponível"

            },
            {   id: 2,
                name: "Deck B",
                equipment: "Equipamento B",
                status: "Em uso"
            },
            {   id: 3,
                name: "Deck C",
                equipment: "Equipamento C",
                status: "Em limpeza"
            },
            {   id: 4,
                name: "Deck D",
                equipment: "Equipamento D",
                status: "Desconhecido"
            }
        ],
        []
    )


   const  getMaterialCritical = (temperature, humidity) => {
        if (temperature > 22 ||temperature < 18 || humidity > 70 || humidity < 35 ) {
            return 'danger'
        }
        if (temperature === 22 ||temperature === 18 || humidity === 70 || humidity === 35 ) {
            return 'warning'
        }
        else {
            return 'normal'
        }
    }

    const  getDeckCritical = (deck) => {
        if (deck.status === "Disponível") {
            return 'normal'
        }
        else if (deck.status === 'Desconhecido') {
            return 'danger'
        }
        else {
            return 'warning'
        }
    }

   return(
    <Box>
    <Box display="flex">
    <Box
           sx={{
               width: '45%',
               height: '100%',
               marginLeft: "5%",
               marginTop: '2%'
           }} >
            <Typography ml={'35%'} mb={'2%'} variant="h4" component="h4">
                Materiais
            </Typography>
           <Grid container spacing={2}>
               {[{}].map((material) => (
                       <Grid item xs={6}>
                       <MaterialCard level={getMaterialCritical(materialMeasures[materialMeasures.length - 1].temperature,
                        materialMeasures[materialMeasures.length - 1].humidity)}
                         key={1}
                         measures={materialMeasures[materialMeasures.length - 1]} />
                   </Grid>
               ))}
           </Grid>
        </Box>
        <Box
           sx={{
               width: '45%',
               height: '100%',
               marginRight: "5%",
               marginTop: '2%'
           }}>
            <Typography ml={'28%'} mb={'2%'} variant="h4" component="h4">
                Equipamentos
            </Typography>
           <Grid container spacing={2}>
               {dataDeck.map((deck) => (
                   <Grid item xs={6}>
                       <DeckCard level={getDeckCritical(deck)} key={deck.id} deck={deck} />
                   </Grid>
               ))}
           </Grid>
        </Box>
        </Box>

        <Box display="flex">
            <Box>
                <NotificationsSlider onClick={() => setOpen(true)} />
            </Box>

            <Box marginLeft="auto" marginRight="2%" marginTop="auto" marginBottom="auto">
                <AddTaskButton onClick={() => setOpenAddTask(true)} />
            </Box>
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Responsável"
            type="name"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Data"
            type="date"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => setOpen(false)}>Salvar</Button>
        </DialogActions>
      </Dialog>

        <Dialog open={openAddTask} onClose={() => setOpenAddTask(false)}>
        <form onSubmit={(e) => { e.preventDefault(); sendAddTask(e); }}>
        <DialogTitle>
            Adicionar Tarefa
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="responsableId"
            label="Responsável"
            type="name"
            fullWidth
            variant="standard"
        />

        <TextField
            autoFocus
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
        />

        <TextField
            autoFocus
            margin="dense"
            id="dateToComplete"
            label="Prazo"
            type="date"
            fullWidth
            variant="standard"
        />

        <TextField
            autoFocus
            margin="dense"
            id="alertId"
            label="ID do Alerta"
            type="number"
            fullWidth
            variant="standard"
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTask(false)}>Cancelar</Button>
          <Button type="submit" onClick={() => setOpenAddTask(false)}>Adicionar</Button>
        </DialogActions>
        </form>
      </Dialog>

        <Box sx={{ width: '20%', margin: 'auto', marginTop: '50px'}}>
        <Collapse in={successAlert || errorAlert}>
            {successAlert ? <Alert severity="success">Tarefa adicionada com sucesso!</Alert> : null}
            {errorAlert ? <Alert severity="error">Erro!</Alert> : null}
        </Collapse>
        </Box>
    </Box>
    )
}

export default Admin;