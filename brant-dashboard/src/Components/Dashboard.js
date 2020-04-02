import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Content from './Content'
import Assessment from './Assessment'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Dashboard(){
    return <div>
            <Router>
        <div class="sidenav">
            
            <div class="d-flex" id="wrapper">
                <Sidebar/>

                <div id="page-content-wrapper">

                    <Navbar/>
                    <Route exact path="/" />
                    <Route path="/Content" component={Content}/>
                    <Route path="/Assessment" component={Assessment}/>
                   
                </div>
                
            </div>        
        </div>
        </Router>

    </div>
}
export default Dashboard


