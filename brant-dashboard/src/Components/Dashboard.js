import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Content from './Content'
import Assessment from './Assessment'
import Patient from './Patient/Patient'

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Dashboard(props){
    console.log(props.state);
    return <div>
    
        <Router>
            <div className="sidenav">

                <div className="d-flex" id="wrapper">

                    <Sidebar/>

                    <div id="page-content-wrapper">
                        <Navbar/>
                        <Route exact path="/" />
                        <Route path="/Content" component={ Content } />
                        <Route path="/Avaliacao" component={Assessment }/>  
                        <Route path="/Paciente" component={ Patient }/>  

        

                    </div>

                </div>    

            </div>

        </Router>

    </div>
}
export default Dashboard


