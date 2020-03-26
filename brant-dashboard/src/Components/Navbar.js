import React, {Component} from 'react'


class Navbar extends Component {
    render(){
        return (
         
            <nav class="navbar-top">   
               
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-icon" href="#"><img src="/Images/user.png" alt="" className="user-icon" class="navbar-icon" /></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-icon" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-icon" href="#">Disabled</a>
                        </li>
                    </ul>        
          
            </nav>
    
        )
    }
}

export default Navbar