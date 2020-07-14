import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Title from '../Others/Title'


function ClinicalInfo({clinicalTypes,clinicalInfo,handleSubmit, description, setDescription, clinical_info_type_id, setClinical_info_type_id}){
  
    function setClinicalType (id){
       let typeC = "";
        clinicalTypes.forEach(element => {
            if(element.id == id){

                typeC = element.type;
            } 
        });
        return typeC;
    }

    return <div>
        <div className="col-md-12 d-flex justify-content-center">
            <Title sectionTitle="Criar nova informação"/>
        </div>
        <form action="" onSubmit={handleSubmit}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <textarea className="form-control form-control-sm border-brant-color m-4 w-100" rows="4" value={description} onChange={event => setDescription(event.target.value)} placeholder="Inserir descrição" required></textarea>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-self-center">
                    <FormControl className="w-50">
                        <InputLabel id="demo-controlled-open-select-label">Selecionar Tipo</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={clinical_info_type_id}
                            onChange={event => setClinical_info_type_id(event.target.value)}>

                            {clinicalTypes.map(temp =>
                                <MenuItem key={temp.id} value={temp.id}>{temp.type}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center mb-2">
                        <button type="submit" className="btn btn-brant-color mt-2 w-40">Adicionar</button>
                    </div>
                </div>
            </div>
            
        </form>
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
                { title: 'Tipo', field: 'clinical_info_type_id', render: rowData => {if(rowData.clinical_info_type_id != null)return setClinicalType(rowData.clinical_info_type_id)},},
                { title: 'Descrição', field: 'description'},
                // { title: 'Data', field: 'date'}
        ]}
        data={clinicalInfo}
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
    </div>
}

export default ClinicalInfo