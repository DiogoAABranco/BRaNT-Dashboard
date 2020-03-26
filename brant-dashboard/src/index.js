import React,{Component}  from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/sidebar.css';
import './Styles/style_global.css';
import './Styles/navbar.css';


class Main extends Component {
    render(){
        return(
            <div class="main-content container">
            
                <div class="sidenav">
                    <Sidebar/>  
                </div>
                
                <div class="content">
                    <Navbar/>
                </div>
          
                
                
                     
            </div>
            )
    }
}

ReactDOM.render(<Main/>,document.getElementById("root"));