import React, { useState } from "react";
import ItemSidebar from "./ItemSidebar";
import { Link, NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getUser} from '../Config/configToken'
import { useEffect } from "react";

const itemsSideBar = [
  {
    name: "Início",
    url: "/home",
  },
  {
    name: "Utentes",
    children: [
      {
        name: "Novo Utente",
        url: "/create-patient",
      },
      {
        name: "Lista de Utentes",
        url: "/patients",
      },
    ],
  },
  {
    name: "Programas de treino",
    children: [
      {
        name: "Programas ativos",
        url: "/programs",
      },
      {
        name: "Programas finalizados",
        url: "/programs-complete",
      },
    ],
  },
  {
    name: "Atividades",
    children: [
      {
        name: "Lista de atividades",
        url: "/games",
      },
    ],
  },
  {
    name: "Ferramentas de avaliação",
    children: [
      {
        name: "Lista das Ferramentas",
        url: "/assessment-tools",
      },
    ],
  },
];

const itemsSideBarAdmin = [
  {
    name: "Início",
    url: "/home",
  },
  {
    name: "Utentes",
    children: [
      {
        name: "Novo Utente",
        url: "/create-patient",
      },
      {
        name: "Lista de Utentes",
        url: "/patients",
      },
    ],
  },
  {
    name: "Programas de treino",
    children: [
      {
        name: "Programas ativos",
        url: "/programs",
      },
      {
        name: "Programas finalizados",
        url: "/programs-complete",
      },
    ],
  },
  {
    name: "Atividades",
    children: [
      {
        name: "Lista de atividades",
        url: "/games",
      },
    ],
  },
  {
    name: "Ferramentas de avaliação",
    children: [
      {
        name: "Nova Ferramenta",
        url: "/new-assessment",
      },
      {
        name: "Lista das Ferramentas",
        url: "/assessment-tools",
      },
    ],
  },
];

function Sidebar(props) {


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

          {props.user.role.name === 'admin' ? itemsSideBarAdmin.map(item => 
            
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
  );}
export default Sidebar;
