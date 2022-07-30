import { useState, useEffect } from 'react'
import TasksTable from '../../components/TasksTable'
import axios from "../../api/axios"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const UPDATE_MS = 5000; // 5 seconds
  

  // call retrieveTasks on each update
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

  return (
    <div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40px'
        }}>
            <TasksTable data={tasks} />
        </div>
    </div>
  )
}

export default Home