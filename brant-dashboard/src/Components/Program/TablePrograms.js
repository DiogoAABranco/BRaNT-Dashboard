import React from 'react'
import MaterialTable from 'material-table'



export default function TablePrograms(props) {
    
    const programs = props.data;

    const manageState = (type) =>{
      if(type === 0 ){
        return 'Inativo';
      }
      else
        return 'Ativo';
    }
    
    return (
      <MaterialTable
        columns={[
            { title: 'Data de início', field: 'start_date', defaultSort: 'desc'},
            { title: 'Nome', field: 'patient.name'},
            { title: 'Número de sessões', field: 'n_sessions'},
            { title: 'Estado', field: 'isActive', render: rowData=>manageState(rowData.isActive)}
      ]}
      data={programs}
        onRowClick={((evt, selectedRow) => props.goTo(selectedRow.id))}
      options={{
          search: true,
          sorting:true,
          paging: true,
          showTitle:false,
          header:true,
          headerStyle:{
              "fontWeight": 900,
              "fontSize": 16,
              color:"rgb(78, 36, 50)"
          }
      }}
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
