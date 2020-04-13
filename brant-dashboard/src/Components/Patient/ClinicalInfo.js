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


function ClinicalInfo(props){

    const [selectedDate, handleDateChange] = useState(new Date());
    const selected_val = useState('');
   // let description;
    //const data = props.clinicalInfo;
    const data =props.data;
    const [description,setDescription] = useState('');



    function handleAddClinicalInfo(){
        console.log(description);
        console.log(selected_val);
    }

    const handlerSelect = event => {
        //setSelected_val(event.target.value);
        //this.setState({selectedValue:selected_val});
        console.log(this.value);
       
    };

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
            
                    <SubTitle sectionTitle="Adicionar informação clínica"/>
                
                    <textarea className="form-control form-control-sm border-brant-color mt-2" rows="2" placeholder="Inserir descrição"  onChange={event => setDescription(event.target.value)} ></textarea>
                
                    <div className="container-fluid mt-2">
                    <div className="row">
                
                        <div className="col-sm-6">
                            
                            <SelectBox handler = {handlerSelect.bind(this)} />

                        </div>
                
                        <div className="col-sm-6 pt-3 d-flex justify-content-center">
                
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                
                                <DatePicker value={selectedDate} onChange={handleDateChange} format="dd/MM/yyyy"/>
                
                            </MuiPickersUtilsProvider></div>
                
                        </div>      
                    </div>        
                
                    <button className="btn btn-brant-color mt-2" onClick={handleAddClinicalInfo}>Adicionar</button>
            
                </div>
            
            </div>
        </div>
    </div>
}

export default ClinicalInfo