import React ,{useEffect, useState} from "react";
import MaterialCard from "../../components/MaterialCard"
import DeckCard from "../../components/DeckCard"
import {Grid, Box, Typography, Dialog, DialogActions,DialogContent, Button, TextField} from '@mui/material';
import axios from 'axios'
import NotificationsSlider from '../../components/NotificationsSlider'

const Admin = () => {
    const [open, setOpen] = useState(false);
    const [materialMeasures, setMaterialMeasures] = useState([]);
    const UPDATE_MS = 5000; // 5 seconds
  
      const getMaterialMeasures = () => {
        axios.get(`http://localhost:5000/iot/materials`)
          .then(response => {
            setMaterialMeasures(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

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
        if (temperature > 22 ||temperature < 18 || humidity > 70 || humidity < 35 ){
            return 'danger'
        }
        if (temperature === 22 ||temperature === 18 || humidity === 70 || humidity === 35 ){
            return 'warning'
        }
        else{
            return 'normal'
        }
    }

    const  getDeckCritical = (deck) => {
        if (deck.status === "Disponível") {
            return 'normal'
        }
        else if (deck.status === 'Desconhecido'){
            return 'danger'
        }
        else{
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
           }} >
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
        <NotificationsSlider onClick={() => setOpen(true)}/>
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
    </Box>
    )
}

export default Admin;