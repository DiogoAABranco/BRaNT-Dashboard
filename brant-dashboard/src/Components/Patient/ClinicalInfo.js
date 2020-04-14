import React, { useState } from 'react';
import Title from '../Others/Title'
import SubTitle from '../Others/Subtitle'
import SelectBox from '../Others/SelectBox'
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


function ClinicalInfo(props){

    const [selectedDate, handleDateChange] = useState(new Date());
   // let description;
    //const data = props.clinicalInfo;
    const data =props.data;
    const [description,setDescription] = useState('');

    const [selected_val, setSelected_val] = useState('');
  
    //handle select input
    const handlerSelect = event => {
        setSelected_val(event.target.value);
        //this.setState({selectedValue:selected_val});
        //console.log(selected_val);
      
    };

    function handleAddClinicalInfo(e){
        e.preventDefault();
        
        props.handleNewClinicalInfo(description,selected_val,selectedDate);
        setDescription("");
        handleDateChange(new Date());
    }


    return <div>
        <Title sectionTitle="Informação Clínica"/>

        <div className="container-fluid">

            <div className="row">
            
                <div className="col-sm-6">

                    <SubTitle sectionTitle="Procedimento clínico / Patologia"/>
                    <div className="row">
                        
                        <ul className="list-group list-group-flush w-100 pl-5 pr-5">
                            {data.clinicalInfo.map(temp => (<li className="list-group-item bottom-border-brant" key={temp.id}>{temp.description}</li>))}
                        </ul>
                                    
                    </div>
                    <SubTitle sectionTitle="Medicação"/>
                    <div className="row">
                        
                        <ul className="list-group list-group-flush w-100 pl-5 pr-5">
                            {data.medication.map(temp => (<li className="list-group-item bottom-border-brant" key={temp.id}>{temp.description}</li>))}
                        </ul>
                    </div>
                </div>
            
                <div className="col-sm-6">
                    <form onSubmit={handleAddClinicalInfo}>
            
                    <SubTitle sectionTitle="Adicionar informação clínica"/>
                
                    <textarea className="form-control form-control-sm border-brant-color mt-2" rows="2" placeholder="Inserir descrição" value={description}  onChange={event => setDescription(event.target.value)} required></textarea>
                
                    <div className="container-fluid mt-2">
                    <div className="row">
                
                        <div className="col-sm-6">

                            <FormControl className="w-100">
                                <InputLabel id="demo-controlled-open-select-label">Selecionar Tipo</InputLabel>
                                <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={selected_val}
                                onChange={handlerSelect}
                                >
                                    <MenuItem value={0}>Procedimento clínico / Patologia</MenuItem>

                                    <MenuItem value={1}>Medicação</MenuItem>

                                </Select>

                            </FormControl>

                        </div>
                
                        <div className="col-sm-6 pt-3 d-flex justify-content-center">
                
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                
                                <DatePicker value={selectedDate} onChange={handleDateChange} format="dd/MM/yyyy"/>
                
                            </MuiPickersUtilsProvider></div>
                
                        </div>      
                    </div>        
                
                    <button type="submite" className="btn btn-brant-color mt-2">Adicionar</button>
                    </form>
                </div>
            
            </div>
        </div>
    </div>
}

export default ClinicalInfo