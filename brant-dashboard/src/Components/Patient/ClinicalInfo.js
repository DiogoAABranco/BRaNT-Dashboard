import React, { useState } from 'react';
import Title from '../Others/Title'
import SubTitle from '../Others/Subtitle'
import SelectBox from '../Others/SelectBox'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import ptLocale from "date-fns/locale/pt";
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


function ClinicalInfo(props){

    const [selectedDate, handleDateChange] = useState(new Date());
    return <div>
        <Title sectionTitle="Informação Clínica"/>

        <div className="container-fluid">

            <div className="row">
            
                <div className="col-sm-6">
            
                    <SubTitle sectionTitle="Procedimento clínico / Patologia"/>
            
                    <SubTitle sectionTitle="Medicação"/>
            
                </div>
            
                <div className="col-sm-6">
            
                    <SubTitle sectionTitle="Adicionar informação clínica"/>
                
                    <textarea className="form-control form-control-sm border-brant-color mt-2" rows="2" placeholder="Inserir descrição"></textarea>
                
                        <div className="container-fluid mt-2">
                        <div className="row">
                    
                            <div className="col-sm-6">
                                
                                <SelectBox/>

                            </div>
                    
                            <div className="col-sm-6 pt-3">
                    
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                    
                                    <DatePicker value={selectedDate} onChange={handleDateChange} format="dd/MM/yyyy"/>
                    
                                </MuiPickersUtilsProvider></div>
                    
                            </div>      
                        </div>        
                
                    <button class="btn btn-brant-color mt-2">Adicionar</button>
            
                </div>
            
            </div>
        </div>
    </div>
}

export default ClinicalInfo