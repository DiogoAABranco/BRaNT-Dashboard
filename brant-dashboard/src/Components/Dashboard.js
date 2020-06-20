import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PatientsList from './PatientsList'
import Assessment from './Assessment/Assessment'
import Patient from './Patient/temp/Patient'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route } from 'react-router-dom'
import TrainingSession from './TrainingSession/TrainingSession'
import Programs from './Program/Programs'
import ViewDetailedProgram from './Program/ViewDetailedProgram'
import ViewDetailedSession from './Program/ViewDetailedSession'
import NewPatientForm from './Patient/NewPatientForm'
import PatientInformation from './Patient/PatientInformation'




function Dashboard(props){
 
    return <div>
    
        <Router>
            <div className="sidenav">

                <div className="d-flex" id="wrapper">

                    <Sidebar/>

                    <div id="page-content-wrapper" className="">
                        <Navbar/>
                        <div className="pt-2">
                            <Route exact path="/" />
                            <Route path="/Content" component={ PatientsList } />
                            <Route path="/Avaliacao" component={Assessment }/>  
                            <Route path="/Paciente" component={ Patient }/>  
                            <Route path="/CriarNovoTeste" component={ NewAssessmentTool }/>  
                            <Route path="/SessaoTreino" component={ TrainingSession }/>  
                            <Route path="/programs" component={ Programs }/>  
                            <Route path="/view-detailed-program" component={ ViewDetailedProgram }/> 
                            <Route path="/view-detailed-session" component={ ViewDetailedSession }/>
                            <Route path="/create-patient" component={ NewPatientForm }/> 
                            <Route path="/patient-information" component={ PatientInformation }/> 
                           
                        </div>
                        

        

                    </div>

                </div>    

            </div>

        </Router>

    </div>
}
export default Dashboard


