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
                     temperature: 38,
                     humidity: 55
                }                
            },
            {   id: 3,
                name: "Local C",
                measures: {
                     temperature: 35,
                     humidity: 60
                }                
            },
            {   id: 4,
                name: "Local D",
                measures: {
                     temperature: 38,
                     humidity: 55
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
                status: "Disponível"          
            },
            {   id: 3,
                name: "Deck C",
                equipment: "Equipamento C",
                status: "Disponível"           
            },
            {   id: 4,
                name: "Deck D",
                equipment: "Equipamento D",
                status: "Disponível"           
            }                                
        ],
        []
      )


   return(
   <Box display="flex">
    <Box
           sx={{
               width: '45%',
               height: '100%',  
               marginLeft: "5%",
               marginTop: '2%'           
           }} >
            <Typography ml={'30%'} mb={'2%'} variant="h3" component="h4">
                Materiais
            </Typography>
           <Grid container spacing={2}>
               {dataMaterial.map((material) => (
                   <Grid item xs={6}>
                       <MaterialCard key={material.id} material={material} />
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
            <Typography ml={'20%'} mb={'2%'} variant="h3" component="h4">
                Equipamentos
            </Typography>
           <Grid container spacing={2}>
               {dataDeck.map((deck) => (
                   <Grid item xs={6}>
                       <DeckCard key={deck.id} deck={deck} />
                   </Grid>
               ))}
           </Grid>    
        </Box>  
    </Box>
    )
}

export default Admin;