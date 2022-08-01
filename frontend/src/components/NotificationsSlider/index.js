import React from 'react';
import { Box, Alert, AlertTitle} from '@mui/material';


const NotificationsSlider = (props) => {

    const dataTasks = React.useMemo(
        () => [            
            {   id: 1,
                title: "Temperatura elevada",
                description: "A temperatura está elevada no local A",
               
            },
            {   id: 2,
                title: "Umidade elevada",
                description: "A umidade está elevada no local D"         
            },
            {   id: 3,
                title: "Equipamento desconhecido",
                description: "O equipamento D encontra-se em estado desconhecido",           
            },
                            
        ],
        []
      )

    return(
        <Box display="flex" m={2}>
        {dataTasks.map((dataTask) => (  
            <Box m={1} >
             <Alert cursor="pointer" severity="error" onClick={props.onClick}>
                <AlertTitle>{dataTask.title}</AlertTitle>
                {dataTask.description} 
        </Alert>
        </Box>))}    
    </Box>
    );

}
export default NotificationsSlider;