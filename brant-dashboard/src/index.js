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
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary:{
        main:'#73374a',
    },
  },
});

class Main extends Component {
    render(){
        return(<ThemeProvider theme={theme}>     
                <Dashboard/>
            </ThemeProvider>
            )
    }
}

ReactDOM.render(<Main/>,document.getElementById("root"));