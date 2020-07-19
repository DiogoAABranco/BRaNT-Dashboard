import React, { Component, useState } from "react";
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
import { UserContext } from "./Components/UserContext";
import { useMemo } from "react";


function Main(props) {

  const [userContext, setUserContext] =useState(null);

  const providerUser = useMemo(() => ({ userContext,setUserContext }), [ userContext,setUserContext ]);

    return (

        <ThemeProvider theme={ theme }>
          <UserContext.Provider value={providerUser}>

          
          <Router>
            
             <Dashboard/>
          </Router>
           
          </UserContext.Provider>
        </ThemeProvider>    

    

    );

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
