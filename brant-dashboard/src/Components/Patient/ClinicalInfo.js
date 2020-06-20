import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table'


function ClinicalInfo({clinicalTypes,clinicalInfo}){
  
    function setClinicalType (id){
       let typeC = "";
        clinicalTypes.forEach(element => {
            if(element.id == id){

                typeC = element.type;
            } 
        });
        return typeC;
    }

    console.log();
    return <div>
            <MaterialTable
            options={{
                search: true,
                paging: false,
                showTitle:false,
                header:true,
                headerStyle:{
                    "fontWeight": 900,
                        "fontSize": 16,
                    color:"rgb(78, 36, 50)"
                }
            }}
            columns={[
                { title: 'Tipo', field: 'clinical_info_type_id', render: rowData => {if(rowData.clinical_info_type_id != null)return setClinicalType(rowData.clinical_info_type_id)},
        
                },
                { title: 'Descrição', field: 'description'},
                { title: 'Data', field: 'date'}
        ]}
        data={clinicalInfo}
        />
    </div>
}

export default ClinicalInfo