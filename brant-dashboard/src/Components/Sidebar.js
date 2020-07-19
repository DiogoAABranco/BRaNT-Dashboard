import React, { useState, useContext } from "react";
import ItemSidebar from "./ItemSidebar";
import { Link, NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getUser, currentUser} from '../Config/configToken'
import { useEffect } from "react";
import { UserContext } from './UserContext'


const itemsSideBar = [
  {
    name: "Início",
    url: "/dashboard/home",
  },
  {
    name: "Utentes",
    children: [
      {
        name: "Novo Utente",
        url: "/dashboard/create-patient",
      },
      {
        name: "Lista de Utentes",
        url: "/dashboard/patients",
      },
    ],
  },
  {
    name: "Programas de treino",
    children: [
      {
        name: "Programas ativos",
        url: "/dashboard/programs",
      },
      {
        name: "Programas finalizados",
        url: "/dashboard/programs-complete",
      },
    ],
  },
  {
    name: "Atividades",
    children: [
      {
        name: "Lista de atividades",
        url: "/dashboard/games",
      },
    ],
  },
  {
    name: "Ferramentas de avaliação",
    children: [
      {
        name: "Lista das Ferramentas",
        url: "/dashboard/assessment-tools",
      },
    ],
  },
];

const itemsSideBarAdmin = [
  {
    name: "Início",
    url: "/dashboard/home",
  },
  {
    name: "Utentes",
    children: [
      {
        name: "Novo Utente",
        url: "/dashboard/create-patient",
      },
      {
        name: "Lista de Utentes",
        url: "/dashboard/patients",
      },
    ],
  },
  {
    name: "Programas de treino",
    children: [
      {
        name: "Programas ativos",
        url: "/dashboard/programs",
      },
      {
        name: "Programas finalizados",
        url: "/dashboard/programs-complete",
      },
    ],
  },
  {
    name: "Atividades",
    children: [
      {
        name: "Lista de atividades",
        url: "/dashboard/games",
      },
    ],
  },
  {
    name: "Ferramentas de avaliação",
    children: [
      {
        name: "Nova Ferramenta",
        url: "/dashboard/new-assessment",
      },
      {
        name: "Lista das Ferramentas",
        url: "/dashboard/assessment-tools",
      },
    ],
  },
];

function Sidebar(props) {
  const [user,setUser] = useState(currentUser.source.value);
  const [loading,setLoading] = useState(true);

  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {

    setUserContext(currentUser.source.value);
    
    return () => setUserContext(null); 
},[]);

     
  return (

    <div className="bg-light border-right" id="sidebar-wrapper">

      <div className="sidebar-heading">

        <img
          src="../Images/BRaNT_LOGO.PNG"
          alt=""
          className="logo"
          className="navbar-brand"
        />

      </div>

      <ul className="list-group list-group-flush">

          {user.role.name === 'admin' ? itemsSideBarAdmin.map(item => 
            
            <div key={item.name}>

                {item.children ? <div>

                    <li className="list-group-item list-group-item-actions sb-item-border bg-light pl-2 pt-3">
                        <b>{item.name}</b>
                    </li>
            
                
                    {item.children.map(subitem =>

                        <NavLink key={subitem.name} activeClassName="active" to={subitem.url}>

                            <li className="list-group-item list-group-item-action bg-light pl-5">
                                {subitem.name}
                            </li>
                
                        </NavLink>
                    )} </div>:
                

                    <NavLink activeClassName="active" to={item.url}>

                        <li className="list-group-item list-group-item-action bg-light">
                            {item.name}
                        </li>

                    </NavLink>
                
              }</div>
           
            ):itemsSideBar.map(item => 
            
              <div key={item.name}>
  
                  {item.children ? <div>
  
                      <li className="list-group-item list-group-item-actions sb-item-border bg-light pl-2 pt-3">
                          <b>{item.name}</b>
                      </li>
              
                  
                      {item.children.map(subitem =>
  
                          <NavLink key={subitem.name} activeClassName="active" to={subitem.url}>
  
                              <li className="list-group-item list-group-item-action bg-light pl-5">
                                  {subitem.name}
                              </li>
                  
                          </NavLink>
                      )} </div>:
                  
  
                      <NavLink activeClassName="active" to={item.url}>
  
                          <li className="list-group-item list-group-item-action bg-light">
                              {item.name}
                          </li>
  
                      </NavLink>
                  
                }</div>
             
              )
            }
        

        
      </ul>
    </div>
  );
         
}
export default Sidebar;
