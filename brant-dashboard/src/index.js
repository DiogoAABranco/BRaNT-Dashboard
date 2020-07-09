import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Components/Dashboard";
//development server for teste - miragejs

/*BOOTSTRAP */
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

/*CUSTOM STYLE */
import "./Styles/sidebar.css";
import "./Styles/style_global.css";
import "./Styles/navbar.css";
import "./Styles/custom.css";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {BrowserRouter as Router, Route } from 'react-router-dom'

import { ptPT } from "@material-ui/core/locale";


class Main extends Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (

        <ThemeProvider theme={ theme }>
          <Router>
             <Dashboard/>
          </Router>
           
      
        </ThemeProvider>    

    

    );

  }

}



const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: "#73374a",
      },
    },
  },
  ptPT
);

ReactDOM.render(<Main />, document.getElementById("root"));
