import React from 'react'
import TasksTable from '../../components/TasksTable'

const Home = () => {
    const data = React.useMemo(
        () => [
          {
            col1: 'Evento 1',
            col2: 'Local A',
            col3: 'Equipamento A',
            col4: 'Matheus',
            col5: 'Hoje 13:00',
            col6: 'Hoje 13:00',
          },
          {
            col1: 'Evento 2',
            col2: 'Local B',
            col3: 'Material B',
            col4: 'Alvaro',
            col5: 'Ontem 17:00',
            col6: 'Hoje 13:00',
          },
          {
            col1: 'Evento 3',
            col2: 'Local C',
            col3: 'Equipamento C',
            col4: 'Ana',
            col5: 'Hoje 13:00',
            col6: 'Hoje 13:00',
          },
        ],
        []
      )

  return (
    <div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40px'
        }}>
            <TasksTable data={data} />
        </div>
    </div>
  )
}

export default Home