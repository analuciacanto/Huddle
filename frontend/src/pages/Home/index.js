import { useState, useEffect } from 'react'
import TasksTable from '../../components/TasksTable'
import axios from "../../api/axios"
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const UPDATE_MS = 5000; // 5 seconds
  const ALERT_TIMER_MS = 3000 // 3 seconds
  
  // call retrieveTasks on page load
  useEffect(() => {
    retrieveTasks();
  }, []);

  // call retrieveTasks on each update interval
  useEffect(() => {
    const interval = setInterval(() => {
      retrieveTasks();
    }, UPDATE_MS);
      
    return () => {
      clearInterval(interval);
    }
  }, []);


  const retrieveTasks = () => {
    axios.get(`/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  const updateTask = (e) => {
    axios.put(
      `/task`, 
      {
        "id": e.target.id.value,
        "responsableId": e.target.responsableId.value,
        "status": e.target.status.value,
        "dateToComplete": e.target.dateToComplete.value
      })
      .then(() => {
        retrieveTasks();
        setSuccessAlert(true);

        setTimeout(() => {
          setSuccessAlert(false);
        }, ALERT_TIMER_MS)
      })
      .catch(e => {
        console.log(e);
        setErrorAlert(true);

        setTimeout(() => {
          setErrorAlert(false);
        }, ALERT_TIMER_MS)
      })
  };

  const completeTask = (e) => {
    axios.delete(
      `/task`,
      {
        data: {"id": e.target.id.value}
      })
    .then(() => {
      retrieveTasks();
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, ALERT_TIMER_MS)
    })
    .catch(e => {
      console.log(e);
      setErrorAlert(true);

      setTimeout(() => {
        setErrorAlert(false);
      }, ALERT_TIMER_MS)
    })
  };


  return (
    <div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40px'
        }}>
            <TasksTable data={tasks} updateTask={updateTask} completeTask={completeTask} />
        </div>
        <Box sx={{ width: '20%', margin: 'auto', marginTop: '50px'}}>
        <Collapse in={successAlert || errorAlert}>
          {successAlert ? <Alert severity="success">Tarefa editada com sucesso!</Alert> : null}
          {errorAlert ? <Alert severity="error">Erro!</Alert> : null}
        </Collapse>
        </Box>
    </div>
  )
}

export default Home