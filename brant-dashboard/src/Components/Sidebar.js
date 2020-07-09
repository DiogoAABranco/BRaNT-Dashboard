import React, {useState} from 'react'
import ItemSidebar from './ItemSidebar'
import {Link,NavLink} from 'react-router-dom'


function Sidebar(props){
    
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">

                <div className="sidebar-heading"><img src="../Images/BRaNT_LOGO.PNG" alt="" className="logo" className="navbar-brand"/></div>

                <ul className="list-group list-group-flush">

                    <NavLink activeClassName="active" to='/home'><li className="list-group-item list-group-item-action bg-light">Início</li></NavLink>

                    <NavLink activeClassName="active"  to='/create-patient'><li className="list-group-item list-group-item-action bg-light">Novo Paciente</li></NavLink>

                    <NavLink activeClassName="active" to='/patients'><li className="list-group-item list-group-item-action bg-light">Utentes</li></NavLink>   

                    <NavLink activeClassName="active" to='/programs'><li className="list-group-item list-group-item-action bg-light">Programas de Treino</li></NavLink>

                    <NavLink activeClassName="active" to='/games'><li className="list-group-item list-group-item-action bg-light">Atividades</li></NavLink>

                    <NavLink activeClassName="active" to='/new-assessment'><li className="list-group-item list-group-item-action bg-light">NovaFerramenta</li></NavLink>

                    <NavLink activeClassName="active" to='/assessment-tools'><li className="list-group-item list-group-item-action bg-light">Ferramentas de avaliação</li></NavLink>
                  
                </ul>

            </div>
        )
    
}
export default Sidebar