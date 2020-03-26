import React, {Component} from 'react'
import ItemSidebar from './ItemSidebar'


class Sidebar extends Component {
    render(){
        return (
            <div class="sidenav">
               
                <div class="list-items">
                    <div class="logo-sidebar">
                            <a class="nav-link" href="#"><img src="/Images/BRaNT_LOGO.PNG" alt="" className="user-icon" class="navbar-icon" /></a>
                    </div>
                    <ul className="ul-column">

                        <ItemSidebar state = "active" href = "#inicio" item ="Início"/>
                        <ItemSidebar state = "inactive" href = "#utentes" item ="Utentes"/>
                        <ItemSidebar state = "inactive" href = "#avaliacao" item ="Avaliação"/>
                        <ItemSidebar state = "inactive" href = "#treino" item ="Treino"/>
                        <ItemSidebar state = "inactive" href = "#resultados" item ="Resultados"/>

                    </ul>                
                </div>              
            </div>
        )
    }
}
export default Sidebar