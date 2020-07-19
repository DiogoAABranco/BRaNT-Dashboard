import React, {useContext} from 'react'
import {logout, getUser} from '../Config/configToken'
import { withRouter } from 'react-router-dom';
import { UserContext } from './UserContext'



function Navbar (props) {
  
    const { userContext, setUserContext } = useContext(UserContext);


    const handleLogout = () => {

        if(logout()){
            console.log("logout");
            props.history.push('/auth/login');
        }
        else
            console.log("erro logout");
        
    }
     
        return (
         
            <nav className="navbar navbar-expand-lg navbar-light bottom-shadow">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-2">
                        {userContext != null ? <li className="nav-item nav-link">{"Seja bem-vindo, "+ userContext.name}</li>:null}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Definições</a>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item hoverable" onClick={handleLogout}>Logout</span>
                        </div>
                        </li>
                    </ul>
                </div>
            </nav>
            
    
        )}
    

export default withRouter(Navbar);