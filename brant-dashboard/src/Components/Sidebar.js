import React, {Component} from 'react'
import ItemSidebar from './ItemSidebar'
import {Link} from 'react-router-dom'


class Sidebar extends Component {
    render(){
        return (
            <div class="bg-light border-right" id="sidebar-wrapper">
                            <div class="sidebar-heading"><img src="../Images/BRaNT_LOGO.PNG" alt="" className="logo" class="navbar-brand"/></div>
                            <ul class="list-group list-group-flush">
                                <Link to='/'><li class="list-group-item list-group-item-action bg-light">Início</li></Link>
                                <Link to='/Content'><li class="list-group-item list-group-item-action bg-light">Utente</li></Link>
                                <Link to='/Assessment'><li class="list-group-item list-group-item-action bg-light">Avaliação</li></Link>
                                <Link to='/'><li class="list-group-item list-group-item-action bg-light">Treino</li></Link>
                                <Link to='/'><li class="list-group-item list-group-item-action bg-light">Resultados</li></Link>
                                
                            </ul>
                        </div>
        )
    }
}
export default Sidebar