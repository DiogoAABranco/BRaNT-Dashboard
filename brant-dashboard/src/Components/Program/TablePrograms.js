import React from 'react'
import MaterialTable from 'material-table'



export default function TablePrograms(props) {
    
    const programs = props.data;
    
    return (
      <MaterialTable
        options={{
            search: true,
            paging: true,
            showTitle:false,
            header:true,
            headerStyle:{
                "fontWeight": 900,
                    "fontSize": 16,
                color:"rgb(78, 36, 50)"
            }
        }}
        columns={[
            { title: 'ID', field: 'id'},
            { title: 'Nome', field: 'patient.name'},
            { title: 'Data de início', field: 'start_date'},
            { title: 'Número de sessões', field: 'n_sessions'}
      ]}
      data={programs}
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
        }
        
      }}
      />
     
    )
}
