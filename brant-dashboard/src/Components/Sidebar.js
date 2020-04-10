import React, {Component} from 'react'
import ItemSidebar from './ItemSidebar'
import {Link} from 'react-router-dom'


function Sidebar(props){
    
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading"><img src="../Images/BRaNT_LOGO.PNG" alt="" className="logo" className="navbar-brand"/></div>
                            <ul className="list-group list-group-flush">
                                <Link to='/'><li className="list-group-item list-group-item-action bg-light">Início</li></Link>
                                <Link to='/Content'><li className="list-group-item list-group-item-action bg-light">Utente</li></Link>
                                <Link to='/Avaliacao'><li className="list-group-item list-group-item-action bg-light">Avaliação</li></Link>
                                <Link to='/'><li className="list-group-item list-group-item-action bg-light">Treino</li></Link>
                                <Link to='/'><li className="list-group-item list-group-item-action bg-light">Resultados</li></Link>
                                <Link to='/Paciente'><li className="list-group-item list-group-item-action bg-light">Teste Perfil</li></Link>
                                
                            </ul>
                        </div>
        )
    
}
export default Sidebar