import React,{useState} from 'react';
import baseUrl from '../../Config/config'
import MaterialTable from 'material-table'
import DialogEditByStep from './DialogEditByStep'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom'


export default function ListSessions(props) {

  const [sessions,setSession] = useState(props.sessions);


  function convertState(inState){

    if (inState == true) return <div className="alert alert-success m-0"></div>;
    else return <div className="alert alert-danger m-0"></div>;

  }


  function handleDeleteSession(e){
    console.log(e);
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
          }).then(res => {
              return res;
          })
          .then(res => res.json())
          .then((data) => {
              console.log('API success: ',data);
              const newSessions = sessions.filter((item) => item.id !== rowData.id);
              setSession(newSessions);
              if(newSessions.length === 0){
                props.history.push('/programs');
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
              { title: 'Resultados', field: ''},
        ]}
        data={sessions}
        

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
          actionsColumnIndex: -1
        }}
      /> 
    );
  }

