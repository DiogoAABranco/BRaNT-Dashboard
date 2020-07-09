import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PatientsList from './PatientsList'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import TrainingSession from './TrainingSession/TrainingSession'
import Programs from './Program/Programs'
import ViewDetailedProgram from './Program/ViewDetailedProgram'
import NewPatientForm from './Patient/NewPatientForm'
import PatientInformation from './Patient/PatientInformation'
import Results from './Results/Results'
import GameView from './Games/GameView'
import AssessmentToolList from './Assessment/AssessmentToolList'
import PatientAssessments from './AssessmentSession/PatientAssessments'
import NewAssessmentSession from './AssessmentSession/NewAssessmentSession'
import Login from './Auth/Login'
import Register from './Auth/Register'




function Dashboard(props){
   
        return <Switch>
    

            
            <Route exact path="/auth/login" component={ Login }/>
            <Route exact path="/auth/register" component={ Register }/>
<Fragment>
            <div className="sidenav">

                <div className="d-flex" id="wrapper">

                    <Sidebar/>

                    <div id="page-content-wrapper">
                        <Navbar/>
                        <div className="pt-2">
                            <Route exact path="/home" />
                            <Route exact path="/create-patient" component={ NewPatientForm }/>  
                            <Route exact path="/patients" component={ PatientsList } />      
                            <Route exact path="/patients/patient-information/:id" component={ PatientInformation }/>                 
                            <Route exact path="/patients/new-program/:id/:name" component={ TrainingSession }/>  
                            <Route exact path="/programs" component={ Programs }/>  
                            <Route exact path="/programs/view-detailed-program/:id" component={ ViewDetailedProgram }/>              
                            <Route exact path="/programs/results/training-program/:id" component={ Results }/> 
                            <Route exact path="/games" component={ GameView }/> 
                            <Route exact path="/new-assessment" component={ NewAssessmentTool }/> 
                            <Route exact path="/assessment-tools" component={ AssessmentToolList }/> 
                            <Route exact path="/patients/patient-assessments/:id/:name" component={ PatientAssessments }/>  
                            <Route exact path="/patients/patient-new-assessment/:id/:name" component={ NewAssessmentSession }/>
                        </div>
                        

        

                    </div>

                </div>    

            </div>
            </Fragment>
            </Switch>
    
}
export default Dashboard


