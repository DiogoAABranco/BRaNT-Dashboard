import React from 'react'
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'


export default function TablePrograms(props) {
    
    return (<MaterialTable 
                   options={{
                       search: true,
                       draggable: false,
                       headerStyle: {
                           backgroundColor: '#752938',
                           color:"white"
                       },
                       actionsColumnIndex: -1
                     }}
                   columns={[
                       { title: 'Paciente', field: 'patientName' },
                   { title: 'Data de início', field: 'startDate' },
                       { title: 'Número de sessões', field: 'nSessions'}
                   ]}
                  actions={[
                    {
                      tooltip: 'Editar',
                      icon: 'edit',
                      //event on click row-> edit program -> passar o id especifico do treino
                      onClick: (evt, data) => {}
                    }
                  ]}
                   data={props.data}
                   
                   title="Programas de treino ativos" 
               />
     
    )
}
