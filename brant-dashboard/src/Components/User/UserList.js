import React, {useEffect} from 'react'
import { useState } from 'react';
import baseUrl from '../../Config/config'
import {tokenHeader} from '../../Config/configToken'
import Subtitle from '../Others/Subtitle';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom';


export default function UserList(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}users`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setUsers(data);
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);



    return (
        <div className="container-fluid mt-2">
        
            <div className="accordion ml-3 mr-3" id="accordionExample">
                <div className="card">
                    <div className="card-header d-flex justify-content-between" id="headingOne">
                        <Subtitle sectionTitle="Lista de utilizadores"/>
                        <Link to="/dashboard/register"><button className="btn btn-brant-color">Novo utilizador</button></Link>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                     
                        <div>
                        <MaterialTable
                            options={{
                                search: false,
                                paging: true,
                                showTitle:false,
                                header:true,
                                headerStyle:{
                                    "fontWeight": 900,
                                        "fontSize": 16,
                                    color:"rgb(78, 36, 50)"
                                }
                            }}
                            columns={[
                                { title: 'Nome', field: 'name'},
                                { title: 'Função', field: 'role.name'},
                                { title: 'Email', field: 'email'},
                        ]}
                        data={users}
                        localization={{
                            pagination: {
                                labelRowsSelect: 'linhas',
                                labelDisplayedRows: '{count} de {from}-{to}',
                                firstTooltip: 'Primeira página',
                                previousTooltip: 'Página anterior',
                                nextTooltip: 'Próxima página',
                                lastTooltip: 'Última página'
                                }
                        }}
                        />
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
