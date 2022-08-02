import { useState, useEffect } from 'react'
import TasksTable from '../../components/TasksTable'
import axios from "../../api/axios"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const UPDATE_MS = 5000; // 5 seconds
  
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
      })
      .catch(e => {
        console.log(e);
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
    })
    .catch(e => {
      console.log(e);
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
    </div>
  )
}

export default Home