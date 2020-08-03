import React, { useState, useEffect } from "react";
import baseUrl from '../../Config/config'
import SocioDemoInfo from './SocioDemoInfo'
import ClinicalInfo from "./ClinicalInfo";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Subtitle from '../Others/Subtitle'
import {Link} from 'react-router-dom';
import BarChart from '../Others/BarChart';
import Title from '../Others/Title';
import { tokenHeader } from '../../Config/configToken'
import PatientAssessments from './PatientAssessments'
import Programs from "./Programs";






export default function PatientInformation(props) {

    const [patientID, setPatientID] = useState(props.match.params.id);

    const [fieldsEducationLevel, setFieldsEducationLevel] = useState([]);
    const [patient, setPatient] = useState(null);
    const [clinicalTypes, setClinicalTypes] = useState();

    const [description, setDescription] = useState("");
    const [clinical_info_type_id, setClinical_info_type_id] = useState(0);

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);

    const [goToNewProgram, setGoToNewProgram] = useState(false);
    const [goToAssessments, setGoToAssessments] = useState(false);
    const [goToNewAssessmentSession, setGoToNewAssessmentSession] = useState(false);

    const [active,setActive] = useState(parseInt(props.match.params.idTab));
   

    const apiCallFields = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}form/patient-fields`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            setFieldsEducationLevel(data.educationLevels);

        })
        .catch(err =>{console.log(err)});
        return () => abortController.abort(); 
    }
    const apiCallPatient = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        fetch(`${baseUrl}patients/${patientID}`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            setPatient(data);
            setGoToNewProgram({pathname: `/dashboard/patients/new-program/${patientID}/${data.name}`});
            setGoToAssessments({pathname: `/dashboard/patients/patient-assessments/${patientID}/${data.name}`});
            setGoToNewAssessmentSession({pathname: `/dashboard/patients/patient-new-assessment/${patientID}/${data.name}`});
            
        })
        .catch(err =>{console.log(err)});
        return () => abortController.abort(); 
    }

    const apiCallClinicalInfoTypes = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}form/clinical-info-types`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            setClinicalTypes(data.types);
            
        })
        .catch(err =>{console.log(err)});
        return () => abortController.abort(); 
    }
 
    useEffect(() => {
        
        apiCallClinicalInfoTypes();
        apiCallFields();
        apiCallPatient();
        
        
        

    },[]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        let data={description,clinical_info_type_id};
        console.log(JSON.stringify(data));

        fetch(`${baseUrl}clinical-info/${patientID}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:tokenHeader(),
        }).then(res => {
            
            if(res.status==201){
                setSuccess(true);
                setWarning(false);
                apiCallPatient();
                
            }else{
                setSuccess(false);
                setWarning(true);
             
            }
            return res;
        })
        .then(res => res.json())
        .then((data) => {
            console.log('API success: ',data);
        })
        .catch(err => {
            setSuccess(false);
            setWarning(true);
            return err;
        });
        setDescription("");
        setClinical_info_type_id(0);
     
    }
    
  
    return (
        <div className=" w-100">
            {success?<div className="alert alert-success" role="alert">Informação adicionada!</div>:null }
            {warning?<div className="alert alert-danger" role="alert">Não foi possível adicionar informação</div>:null }
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink className="text-brant-color" to="/dashboard/patients">
                    Utentes
                </NavLink>
                <Typography color="textPrimary">Informação do utente</Typography>
            </Breadcrumbs>
           
            <div className="row p-4 m-0">
                <div className="col-md-12">
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a className={active === 0 ? "nav-item nav-link text-brant-color active" :"nav-item nav-link text-brant-color"} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" ><Subtitle sectionTitle="Dados do utente"/></a>
                            <a className={active === 1 ? "nav-item nav-link text-brant-color active" :"nav-item nav-link text-brant-color"} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" ><Subtitle sectionTitle="Informação Clínica"/></a>
                            <a className={active === 2 ? "nav-item nav-link text-brant-color active" :"nav-item nav-link text-brant-color"} id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><Subtitle sectionTitle="Perfil"/></a>
                            <a className={active === 3 ? "nav-item nav-link text-brant-color active" :"nav-item nav-link text-brant-color"} id="nav-contact-tab" data-toggle="tab" href="#nav-assessments" role="tab" aria-controls="nav-assessments" aria-selected="false"><Subtitle sectionTitle="Avaliações Cognitivas"/></a>
                            <a className={active === 4 ? "nav-item nav-link text-brant-color active" :"nav-item nav-link text-brant-color"} id="nav-contact-tab" data-toggle="tab" href="#nav-programs" role="tab" aria-controls="nav-programs" aria-selected="false"><Subtitle sectionTitle="Programas de treino"/></a>

                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className={active === 0 ? "tab-pane fade show active" : "tab-pane fade show"} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            {patient !== null?
                            <SocioDemoInfo patient={patient} education_level={fieldsEducationLevel}/>:null}

                        </div>
                        <div className={active === 1 ? "tab-pane fade show active" : "tab-pane fade show"} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            
                            <h1>
                            {patient !== null && clinicalTypes !== null?
                            <ClinicalInfo clinicalTypes={clinicalTypes} clinicalInfo={patient.clinical_info} handleSubmit={handleSubmit} description={description} setDescription={setDescription} clinical_info_type_id={clinical_info_type_id} setClinical_info_type_id={setClinical_info_type_id}/>:null}
                            
                            </h1>
                        </div>
                        <div className={active === 2 ? "tab-pane fade show active" : "tab-pane fade show"} id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <h1>
                                
                                {patient !== null?
                                <div>
                                    <div className="col-md-8 d-flex justify-content-center">
                                        <Title sectionTitle="Perfil"/>
                                        <div className="container h-50">
                                            <BarChart data={patient.cognitiveProfile}/>
                                        </div>
                                        
                                    </div>
                                </div>

                                :null}
                                
                            </h1>
                        </div>
                        <div className={active === 3 ? "tab-pane fade show active" : "tab-pane fade show"} id="nav-assessments" role="tabpanel" aria-labelledby="nav-assessments-tab">
                            <h1>
                                {patient !== null?
                                <div>
                                    <div>
                                       
                                        <div className="">
                                            <PatientAssessments id={patientID} name={patient.name}/>
                                        </div>
                                        
                                    </div>
                                </div>

                                :null}
                                
                            </h1>
                        </div>
                        <div className={active === 4 ? "tab-pane fade show active" : "tab-pane fade show"} id="nav-programs" role="tabpanel" aria-labelledby="nav-programs-tab">
                            <h1>
                                
                                {patient !== null?
                                <div>
                                    <div className="d-flex justify-content-end pb-4">

                                        {goToNewProgram !== false?<Link to={goToNewProgram}><button className="btn btn-brant-color">Criar Novo Programa</button></Link>:null}

                                    </div>
                             
                                    <div className="">
                                        <Programs patient={patient} history={props.history}/>
                                    </div>
                                        
                                 
                                </div>

                                :null}
                                
                            </h1>
                        </div>
                    </div>
                </div>
                
                
                
                
            </div>
    </div>
    );
}