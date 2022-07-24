import React from 'react'
import { useTable } from "react-table";

function TasksTable( { data }) {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Evento',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Local',
            accessor: 'col2',
          },
          {
            Header: 'Equipamento/Material',
            accessor: 'col3',
          },
          {
            Header: 'Responsavel',
            accessor: 'col4',
          },
          {
            Header: 'Data de Criação',
            accessor: 'col5',
          },
          {
            Header: 'Prazo',
            accessor: 'col6',
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
          <tr {...row.getRowProps()}>
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
  )
}

export default TasksTable