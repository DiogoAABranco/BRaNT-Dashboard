import React, { useState, useEffect } from "react";
import SocioDemoInfo from './SocioDemoInfo'
import ClinicalInfo from "./ClinicalInfo";


export default function PatientInformation(props) {

    const [patientID, setPatientID] = useState(0);

    const [fieldsEducationLevel, setFieldsEducationLevel] = useState([]);
    const [patient, setPatient] = useState(null);
    const [clinicalTypes, setClinicalTypes] = useState();

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

    
  console.log(patient);
  console.log(clinicalTypes);
  
    return (
        <div className="container w-100">
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
                        (console.log(clinicalTypes),<ClinicalInfo clinicalTypes={clinicalTypes} clinicalInfo={patient.clinical_info}/>):null}
                           
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