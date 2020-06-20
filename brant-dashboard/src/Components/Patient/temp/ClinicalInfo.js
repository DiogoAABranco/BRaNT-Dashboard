import React, { useState } from 'react';
import Title from '../../Others/Title'
import SubTitle from '../../Others/Subtitle'

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import ptLocale from "date-fns/locale/pt";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaterialTable from 'material-table'




function ClinicalInfo(props){

    const [selectedDate, handleDateChange] = useState(new Date());
  
    const data =props.state.data;

    const [description,setDescription] = useState('');

    const [selected_val, setSelected_val] = useState('');

    const [selectedPatology_val, setSelectedPatology_val] = useState('');

    const patologyList = props.state.patologyList;
    
      
    //handle select input
    const handlerSelect = event => {
        setSelected_val(event.target.value);    
    };


    //handle select input
    const handlerSelectPatology = event => {
        
        setSelectedPatology_val(event.target.value);    
    };

    function handleAddClinicalInfo(e){
        e.preventDefault();

        let patology = props.state.getPatology(selectedPatology_val);
        let type = "";

        if(selected_val == 0)
            type = "clinicalProcedure";
        if(selected_val == 1)
            type = "medication";

        props.handleNewClinicalInfo(description,type,selectedDate,patology);

        setDescription("");

        handleDateChange(new Date());
    }


    return <div>
        <Title sectionTitle="Informação Clínica"/>

        <div className="container-fluid pt-2">

            <div className="row">
            
                <div className="col-sm-6">
                        <MaterialTable
                        options={{
                            search: true,
                            draggable: false,
                            headerStyle: {
                                backgroundColor: '#73374a',
                                color:"white"
                        },
                        actionsColumnIndex:-1
                        }}
                        columns={[
                                { title: 'Patologia', field: 'patology' },
                                { title: 'Tipo', field: 'type' },
                                { title: 'Descrição', field: 'description'}
                        ]}
                        data={data.clinicalInfo}
                        title="Informação"
                          
                        />
                </div>
            
                <div className="col-sm-6">

                    <form onSubmit={handleAddClinicalInfo}>

                        <div className="row d-flex justify-content-center pt-1">

                            <SubTitle sectionTitle="Adicionar informação clínica"/>

                        </div>
                        

                        <div className="row d-flex justify-content-center pt-1">

                            <FormControl className="w-50">
                                <InputLabel id="label-select-patology">Selecionar patologia</InputLabel>
                                <Select
                                labelId="select-patology"
                                id="custom-select"
                                value={selectedPatology_val}
                                onChange={handlerSelectPatology}
                                >
                                    {patologyList.map(temp =>(<MenuItem key={temp.id} value={temp.id}>{temp.patology}</MenuItem>))}

                                </Select>

                            </FormControl>
                        </div>

                        <div className="row d-flex justify-content-center pt-1">

                            <textarea className="form-control form-control-sm border-brant-color m-4 w-50 " rows="4" placeholder="Inserir descrição" value={description}  onChange={event => setDescription(event.target.value)} required></textarea>
                        
                        </div>
                        
                        <div className="container-fluid mt-1">

                            <div className="row">
                        
                                <div className="col d-flex justify-content-center">

                                    <FormControl className="w-50">
                                        <InputLabel id="demo-controlled-open-select-label">Selecionar Tipo</InputLabel>
                                        <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={selected_val}
                                        onChange={handlerSelect}
                                        >
                                            <MenuItem value={0}>Procedimento clínico / Patologia</MenuItem>

                                            <MenuItem value={1}>Medicação / Terapia</MenuItem>

                                        </Select>

                                    </FormControl>

                                </div>  
                    
                            </div>      

                        </div>        
                    
                        <div className="col pt-3 d-flex justify-content-center">
                        
                            <MuiPickersUtilsProvider utils={DateFnsUtils} utils={DateFnsUtils} locale={ptLocale}>
                                
                                <DatePicker value={selectedDate} onChange={handleDateChange} format="dd/MM/yyyy"/>
            
                            </MuiPickersUtilsProvider>
                         </div>

                        <div className="d-flex justify-content-center mt-1">
                            <button type="submite" className="btn btn-brant-color mt-2 w-40">Adicionar</button>
                        </div>
                    
                    </form>
                </div>
            
            </div>
        </div>
    </div>
}

export default ClinicalInfo