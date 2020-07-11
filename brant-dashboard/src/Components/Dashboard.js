import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PatientsList from './PatientsList'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'
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
import { checkAuth } from '../Config/configToken'


const PrivateRoute = ({component: Component, ...rest}) =>{
    const isAuthenticated = checkAuth();
    return <Route
        {...rest}
        render={(props) => isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={'/auth/login'} />}
    />

}
    


function Dashboard(props){
   
        return <Switch>
    

            
            <Route exact path="/auth/login" component={ Login }/>
            <Route exact path="/auth/register" component={ Register }/>
            <Fragment>
                <div className="sidenav">

                    <div className="d-flex" id="wrapper">

                        <Sidebar/>

                        <div id="page-content-wrapper">
                            <PrivateRoute path="/" component={ Navbar }/> 
                            <div className="pt-2">
                                <PrivateRoute exact path="/home" />
                                <PrivateRoute exact path="/create-patient" component={ NewPatientForm }/>  
                                <PrivateRoute exact path="/patients" component={ PatientsList } />      
                                <PrivateRoute exact path="/patients/patient-information/:id" component={ PatientInformation }/>                 
                                <PrivateRoute exact path="/patients/new-program/:id/:name" component={ TrainingSession }/>  
                                <PrivateRoute exact path="/programs" component={ Programs }/>  
                                <PrivateRoute exact path="/programs/view-detailed-program/:id" component={ ViewDetailedProgram }/>              
                                <PrivateRoute exact path="/programs/results/training-program/:id" component={ Results }/> 
                                <PrivateRoute exact path="/games" component={ GameView }/> 
                                <PrivateRoute exact path="/new-assessment" component={ NewAssessmentTool }/> 
                                <PrivateRoute exact path="/assessment-tools" component={ AssessmentToolList }/> 
                                <PrivateRoute exact path="/patients/patient-assessments/:id/:name" component={ PatientAssessments }/>  
                                <PrivateRoute exact path="/patients/patient-new-assessment/:id/:name" component={ NewAssessmentSession }/>
                            </div>

                        </div>

                    </div>    

                </div>
            </Fragment>
        </Switch>
    
}
export default Dashboard


