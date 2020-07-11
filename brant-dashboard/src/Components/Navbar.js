import React, {Component} from 'react'
import {logout, getUser} from '../Config/configToken'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
    }
    


    handleLogout = () => {

        if(logout()){
            console.log("logout");
            this.props.history.push('/auth/login');
        }
        else
            console.log("erro logout");
        
    }
    render(){
        if( getUser()!==null){

        
        return (
         
            <nav className="navbar navbar-expand-lg navbar-light bottom-shadow">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-2">
                        <li className="nav-item nav-link">{"Seja bem-vindo, "+ getUser().name}</li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Definições</a>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item hoverable" onClick={this.handleLogout}>Logout</span>
                        </div>
                        </li>
                    </ul>
                </div>
            </nav>
            
    
        )}
        else return <div></div>
    }
}

export default Navbar