import React, { useState, useEffect } from "react";
import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import ptLocale from "date-fns/locale/pt";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Chip from '@material-ui/core/Chip';
import { tokenHeader } from '../../Config/configToken'



export default function NewPatientForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [job, setJob] = useState("");
    const [gender, setGender] = useState([]);
    const [date_of_birth, setDate_of_birth] = useState(new Date());
    
    const [education_level_id, setEducation_level_id] = useState([]);
    const [family_members, setFamilyMembersId] = useState([]);


    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [tempDate, setTempDate] = useState();

    const [fieldFamilyMember, setFieldFamilyMember] = useState([]);
    const [fieldsEducationLevel, setFieldsEducationLevel] = useState([]);


    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}form/patient-fields`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setFieldFamilyMember(data.familyMembers);
            setFieldsEducationLevel(data.educationLevels);

            
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);

    const handleSubmit = (event) => {
        setSuccess(false);
        setWarning(false);
        event.preventDefault();
        console.log(name, email, address, date_of_birth, job, gender, education_level_id, family_members);

        const data = {name, email, address, date_of_birth, job, gender, education_level_id, family_members};
        console.log(JSON.stringify(data));
        
        fetch(`${baseUrl}patients`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:tokenHeader(),
        }).then(res => {
            
            if(res.status==201){
                setSuccess(true);
                setWarning(false);
                
            }else{
                setSuccess(false);
                setWarning(true);
             
            }
            return res;
        })
        .then(res => res.json())
        .then((data) => {
            if(data.message === 'patient record created'){
                props.history.push('/patients'); 
            }
            console.log('API success: ',data);
        })
        .catch(err => {
            setSuccess(false);
            setWarning(true);
            return err;
        });


        setName("");
        setEmail("");
        setAddress("");
        setJob("");
        setGender([]);
        setEducation_level_id([]);
        setFamilyMembersId([]);
    }
    const handleDate = (date) =>{
        
        let t = date.toISOString().toString().split("T")[0];
     

        setDate_of_birth(t);
        setTempDate(date);
      
    }
    return (
        <div>
            {success?<div className="alert alert-success" role="alert">Utente adicionado!</div>:null }
            {warning?<div className="alert alert-danger" role="alert">Não foi possível adicionar utente</div>:null }
            
            <div className="container w-50">
                
                <div className="d-flex  m-0 p-4">
                    <form className="row w-100" onSubmit={handleSubmit} >
                        <div className="p-5 d-flex justify-content-center w-100">
                            <Title sectionTitle="Novo Utente"/>

                        </div>
                        <div className="col-md-12 form-group ">
                            <label className="control-label text-brant-color" >Nome</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="name" placeholder="Nome" className="form-control" value={name} onChange={e => setName(e.target.value)}  type="text" required/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Email</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}  type="text" required/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Morada</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="address" placeholder="Morada" className="form-control" value={address} onChange={e => setAddress(e.target.value)} type="text" required/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Profissão</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="job" placeholder="Profissão" className="form-control" value={job} onChange={e => setJob(e.target.value)} type="text" required/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Data de Nascimento</label> 
                            <MuiPickersUtilsProvider className="w-50"  utils={DateFnsUtils} utils={DateFnsUtils} locale={ptLocale}>
                                <DatePicker className="w-100" value={tempDate} maxDate={new Date()} onChange={handleDate} format="yyyy-MM-dd"/>
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="col-md-12">
                            <FormControl className="w-100">
                                <InputLabel id="in_education_level">Sexo</InputLabel>
                                <Select
                                    labelId="gender_label"
                                    id="select_gender"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                >
                                <MenuItem value="1">Feminino</MenuItem>
                                <MenuItem value="2">Masculino</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-12 mt-2">
                            <FormControl className="w-100">
                                <InputLabel id="in_education_level">Escolaridade</InputLabel>
                                <Select
                                    labelId="education_label"
                                    id="select_education"
                                    value={education_level_id}
                                    onChange={e => setEducation_level_id(e.target.value)}
                                >
                                {fieldsEducationLevel.map( temp =>(<MenuItem  key={temp.id} value={temp.id}>{temp.type}</MenuItem>))} 
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-sm-12 mt-2">
                        <FormControl className="w-100">
                            <InputLabel id="family_members_label">Agregado Familiar</InputLabel>
                            <Select
                            labelId="family_members_label"
                            id="demo-mutiple-chip"
                            multiple
                            value={family_members}
                            onChange={e => setFamilyMembersId(e.target.value)}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div>
                                {selected.map((value) => (
                                
                                    <Chip key={value} label={fieldFamilyMember.find(temp => temp.id === value).type} />
                                ))}
                                </div>
                            )}
                            >
                            {fieldFamilyMember.map((name) => (
                                <MenuItem key={name.id} value={name.id}>
                                {name.type}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </div>
                        
                        <div className="p-5 d-flex justify-content-center w-100">
                            <input type="submit" value="Submeter" className="btn btn-brant-color"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        
      </div>)
}
