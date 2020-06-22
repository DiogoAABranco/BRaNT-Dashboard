import React, { useState, useEffect } from "react";
import SocioDemoInfo from './SocioDemoInfo'
import ClinicalInfo from "./ClinicalInfo";


export default function PatientInformation(props) {

    const [patientID, setPatientID] = useState(0);

    const [fieldsEducationLevel, setFieldsEducationLevel] = useState([]);
    const [patient, setPatient] = useState(null);
    const [clinicalTypes, setClinicalTypes] = useState();

    const [description, setDescription] = useState("");
    const [clinical_info_type_id, setClinical_info_type_id] = useState(0);

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);

    const apiCallFields = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch('http://localhost:8000/api/form/patient-fields',{ signal: signal })
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

        fetch('http://localhost:8000/api/patients/1',{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            setPatient(data);
            
        })
        .catch(err =>{console.log(err)});
        return () => abortController.abort(); 
    }

    const apiCallClinicalInfoTypes = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch('http://localhost:8000/api/form/clinical-info-types',{ signal: signal })
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

        fetch('http://localhost:8000/api/clinical-info/1', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
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
        <div className="container w-100">
            {success?<div className="alert alert-success" role="alert">Informação adicionada!</div>:null }
            {warning?<div className="alert alert-danger" role="alert">Não foi possível adicionar informação</div>:null }
        <div className="row">
            <div className="col-md-12">
                <nav>
                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Dados do Paciente</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Informação Clínica</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Perfil Cognitivo</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {patient !== null?
                        <SocioDemoInfo patient={patient} education_level={fieldsEducationLevel}/>:null}

                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        
                        <h1>
                        {patient !== null && clinicalTypes !== null?
                        <ClinicalInfo clinicalTypes={clinicalTypes} clinicalInfo={patient.clinical_info} handleSubmit={handleSubmit} description={description} setDescription={setDescription} clinical_info_type_id={clinical_info_type_id} setClinical_info_type_id={setClinical_info_type_id}/>:null}
                           
                        </h1>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <h1>
                            perfil cognitivo
                        </h1>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    );
}