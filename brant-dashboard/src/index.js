import React,{Component}  from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Components/Dashboard'

/*BOOTSTRAP */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

/*CUSTOM STYLE */
import './Styles/sidebar.css';
import './Styles/style_global.css';
import './Styles/navbar.css';
import './Styles/custom.css';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import UserStore from './Stores/UserStore'



class Main extends Component {
  constructor(props){
    super(props);
    this.state ={
      users: UserStore.getAll()
    }
  }
    render(){
      console.log(this.state.users);
    
        return(
          <ThemeProvider theme={theme}>     
            <Dashboard state={this.state.users}/>
          </ThemeProvider> 
      
            )
    }
}
const theme = createMuiTheme({
  palette: {
    primary:{
        main:'#73374a',
    },
  },
});

ReactDOM.render(<Main/>,document.getElementById("root"));