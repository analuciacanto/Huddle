import React from "react";
import MaterialCard from "../../components/MaterialCard"
import DeckCard from "../../components/DeckCard"
import {Grid, Box, Typography} from '@mui/material';

const Admin = () => {
    const dataMaterial = React.useMemo(
        () => [            
            {   id: 1,
                name: "Local A",
                measures: {
                     temperature: 35,
                     humidity: 60
                }                
            },
            {   id: 2,
                name: "Local B",
                measures: {
                     temperature: 22,
                     humidity: 55
                }                
            },
            {   id: 3,
                name: "Local C",
                measures: {
                     temperature: 20,
                     humidity: 60
                }                
            },
            {   id: 4,
                name: "Local D",
                measures: {
                     temperature: 20,
                     humidity: 80
                }                
            }                                
        ],
        []
      )

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

   const  getMaterialCritical = (material) => {
        if (material.measures.temperature > 22 || material.measures.temperature < 18 || material.measures.humidity > 70 || material.measures.humidity < 35 ){
            return 'danger'
        }
        if (material.measures.temperature === 22 || material.measures.temperature === 18 || material.measures.humidity === 70 || material.measures.humidity === 35 ){
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
               {dataMaterial.map((material) => (
                   <Grid item xs={6}>
                       <MaterialCard level={getMaterialCritical(material)} key={material.id} material={material} />
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
    )
}

export default Admin;