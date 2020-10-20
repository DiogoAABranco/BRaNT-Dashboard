import React,{useState} from 'react';
import baseUrl from '../../Config/config'
import MaterialTable from 'material-table'
import DialogEditByStep from './DialogEditByStep'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom'
import { tokenHeader } from '../../Config/configToken'
import DialogSessionInfo from './DialogSessionInfo'


export default function ListSessions(props) {

  const [sessions,setSession] = useState(props.sessions);
  const [selectedRow,setSelectedRow] = useState(null);
  


  function convertState(inState){

    if (inState == true) return <p className="text-success">Feito</p>;
    else return <p className="text-danger">Pendente</p>;

  }

  function idSession(sessions,id){

    let first = sessions[0].id;
    let finalId = id - first + 1
    return "Sessão " + finalId;

  }
  
  function deleteSession(rowData){

    let answer = window.confirm("Deseja eliminar a sessão de: "+rowData.date+"?")
      if (answer) {
        //true
          fetch(`${baseUrl}session/${rowData.id}`, {
              method: 'DELETE',
              headers:tokenHeader(),
          })
          .then(res => res.json())
          .then((data) => {
              console.log('API success: ',data);
              const newSessions = sessions.filter((item) => item.id !== rowData.id);
              setSession(newSessions);
              props.updateSessions(newSessions);
              if(newSessions.length === 0){
                props.history.push('/dashboard/programs');
              }
          })
          .catch(err => {
            console.log(err);
              return err;
          });
      }
      else {
          //some code
      }
  }
    return (
      <MaterialTable
        title="Sessões"
          options={{
              search: false,
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
              { title: 'Notas', field: 'id', render: rowData =>{if(rowData.id != null)return <DialogSessionInfo session={rowData}/> }},
        ]}
        data={sessions}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
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
            onClick: (event, rowData) => {deleteSession(rowData)},
              //disabled: /rowData.birthYear < 2000
          })
        ]}
        options={{
          actionsColumnIndex: -1,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
      /> 
    );
  }

