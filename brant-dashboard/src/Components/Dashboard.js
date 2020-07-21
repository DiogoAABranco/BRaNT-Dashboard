import React, { Fragment,useState, useEffect } from 'react'
import baseUrl from '../Config/config'
import { tokenHeader } from '../Config/configToken'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PatientsList from './PatientsList'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route,Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { checkAuth, getUser } from '../Config/configToken'
import HomePage from './HomePage'
import NoMatchPage from './NoMatchPage'
import { FinishedPrograms } from './Program/FinishedPrograms'
import { UserContext } from './UserContext'
import { useContext } from 'react'
import Dashboard2 from './Dashboard2'


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

    const { userContext, setUserContext } = useContext(UserContext);

    useEffect(() => {
    
        setUserContext(getUser());
        
    }, [] );

        return <BrowserRouter>
        
    
            <Route exact path="/" render={() => (<Redirect to="/auth/login" />)}/>
            <Route exact path="/auth/login" component={ Login }/>
            <div>
            <div className="sidenav">

            <div className="d-flex" id="wrapper">

                <Route path="/dashboard" component={ Sidebar }/>

                <div id="page-content-wrapper">
                <Route path="/dashboard" component={ Navbar }/>
                    <div className="pt-2">
                        <PrivateRoute path="/dashboard" component={ Dashboard2 }/>
            </div>

</div>

</div>    

</div>
</div>
  
        </BrowserRouter>
        
        
    
}
export default Dashboard


