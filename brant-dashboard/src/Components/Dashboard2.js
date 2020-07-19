import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import PatientsList from './PatientsList'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route,Switch, Redirect, BrowserRouter } from 'react-router-dom'
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
import { checkAuth, getUser } from '../Config/configToken'
import HomePage from './HomePage'
import NoMatchPage from './NoMatchPage'
import { FinishedPrograms } from './Program/FinishedPrograms'
import { UserContext } from './UserContext'
import { useContext } from 'react'


const PrivateRoute = ({component: Component, ...rest}) =>{
    const isAuthenticated = checkAuth();
    return <Route
        {...rest}
        render={(props) => isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={'/auth/login'} />}
    />

}

export default function Dashboard2() {
    
    return (
       
                        <Switch>
                            <PrivateRoute exact path="/dashboard/home" component={HomePage} />
                            <PrivateRoute exact path="/dashboard/create-patient" component={ NewPatientForm }/>  
                            <PrivateRoute exact path="/dashboard/patients" component={ PatientsList } />      
                            <PrivateRoute exact path="/dashboard/patients/patient-information/:id/:idTab" component={ PatientInformation }/>                 
                            <PrivateRoute exact path="/dashboard/patients/new-program/:id/:name" component={ TrainingSession }/>  
                            <PrivateRoute exact path="/dashboard/programs" component={ Programs }/>  
                            <PrivateRoute exact path="/dashboard/programs-complete" component={ FinishedPrograms }/> 
                            <PrivateRoute exact path="/dashboard/programs/view-detailed-program/:id" component={ ViewDetailedProgram }/>     
                            <PrivateRoute exact path="/dashboard/programs-complete/view-detailed-program/:id" component={ ViewDetailedProgram }/>          
                            <PrivateRoute exact path="/dashboard/programs/results/training-program/:id" component={ Results }/> 
                            <PrivateRoute exact path="/dashboard/games" component={ GameView }/> 
                            <PrivateRoute exact path="/dashboard/assessment-tools" component={ AssessmentToolList }/> 
                            <PrivateRoute exact path="/dashboard/patients/patient-assessments/:id/:name" component={ PatientAssessments }/>  
                            <PrivateRoute exact path="/dashboard/patients/patient-new-assessment/:id/:name" component={ NewAssessmentSession }/>

                            {/*routes only for admin*/}
                            {getUser() !== null && getUser().role.name === 'admin' ? 
                                <PrivateRoute exact path="/dashboard/new-assessment" component={ NewAssessmentTool }/>:null
                                //lista de users e criar novo user
                            } 
                            <Route component={ NoMatchPage }/>
                        </Switch>
          
    )
}
