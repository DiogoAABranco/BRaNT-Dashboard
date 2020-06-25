import React from 'react';
import MaterialTable from 'material-table'
import DialogEditByStep from './DialogEditByStep'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom'



function convertState(inState){
  if (inState == true) return "Completa";
  else return "Por fazer";
}
function handleDeleteSession(e){
  console.log(e);
}
function idSession(sessions,id){
  let first = sessions[0].id;
  let finalId = id - first + 1
  return "Sessão " + finalId;
}
export default function ListSessions(props) {
    return (
      <MaterialTable
        title="Sessões"
          options={{
              search: true,
              paging: true,
              showTitle:true,
              header:true,
              headerStyle:{
                  "fontWeight": 900,
                      "fontSize": 16,
                  color:"rgb(78, 36, 50)"
              }
          }}
          columns={[
              { title: 'ID', field: 'id', render: rowData =>{if(rowData.id !== null)return idSession(props.sessions, rowData.id)} },
              { title: 'Data', field: 'date'},
              { title: 'Estado', field: 'isDone', render: rowData =>{if(rowData.isDone !== null)return convertState(rowData.isDone)}},
              { title: 'Resultados', field: ''},
        ]}
        data={props.sessions}
          onRowClick={((evt, selectedRow) => props.goTo(selectedRow.id))}

        localization={{
          toolbar: {
            searchTooltip: 'Procurar',
            searchPlaceholder: 'Procurar'
          }, 
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          },
          header: {
            actions: 'Remover'
          },
        }}
        actions={[
          rowData => ({
            icon: 'delete',
            tooltip: 'Eliminar sessão',
            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
            //disabled: /rowData.birthYear < 2000
          })
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />

      
    //   <table className="table">
    //   <thead>
    //     <tr>
    //       {columns.map((element,index) => <th key={index} scope="col">{element}</th>)}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {props.data.length != 0?
    //     props.data.map((item,index) => 
          
    //       <tr key={index}> 
    //         <th scope="row">{item.id + 1}</th>
    //         <td>{convertDate(item.date)}</td>
    //         <td>{convertState(item.isDone)}</td>
    //         <td><DialogEditByStep session={item.id +1} data={item.activities}/></td>
    //         <td><button className="btn btn-outline-brant-color" onClick={e => props.onClickRemoveSession(e,item)}><DeleteIcon/></button></td>
    //         <td>ver</td>
            
    //       </tr>
    //      ):<tr><th scope="row">Sem items para mostrar</th></tr>
    //     }
    //   </tbody>
    // </table>
         
         
         
    );
  }

