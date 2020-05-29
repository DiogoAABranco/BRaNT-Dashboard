import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Content from './Content'
import Assessment from './Assessment/Assessment'
import Patient from './Patient/Patient'
import NewAssessmentTool from "./Assessment/NewAssessmentTool"

import {BrowserRouter as Router, Route } from 'react-router-dom'
import TrainingSession from './TrainingSession/TrainingSession'
import Program from './Program/Program'

function Dashboard(props){
    console.log(props.state);
    return <div>
    
        <Router>
            <div className="sidenav">

                <div className="d-flex" id="wrapper">

                    <Sidebar/>

                    <div id="page-content-wrapper" className="">
                        <Navbar/>
                        <div className="pt-2">
                            <Route exact path="/" />
                            <Route path="/Content" component={ Content } />
                            <Route path="/Avaliacao" component={Assessment }/>  
                            <Route path="/Paciente" component={ Patient }/>  
                            <Route path="/CriarNovoTeste" component={ NewAssessmentTool }/>  
                            <Route path="/SessaoTreino" component={ TrainingSession }/>  
                            <Route path="/TestProgram" component={ Program }/>  
                        </div>
                        

        

                    </div>

                </div>    

            </div>

        </Router>

    </div>
}
export default Dashboard


