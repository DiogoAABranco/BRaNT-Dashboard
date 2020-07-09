import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from './auth'


export default function Login(props) {

    const [user,setUser] = useState({emai:undefined,password:undefined});

    const onChange = (e) => {
        
        setUser({[e.target.name]:e.target.value});
    }

    onsubmit = (e) =>{
        e.preventDefault();

        const user1 = {
            email:user.email,
            password:user.password
        }

        login(user1).then(res=>{
            if(res){
                this.props.history.push('/');
            }
        })
    }

    return (
        <div className="container vh-100 ">
            <div className="row pt-4 mt-2s">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    
                    <div className="card mt-5">
                        <div className="container mx-auto my-4 text-center">
                            <img src="../../Images/BRaNT_LOGO.PNG" alt="" className="img-thumbnail rounded mx-auto"/>
                        </div>
                        <h5 className="card-title text-brant-color mx-auto my-4">
                            Iniciar Sessão
                        </h5>
                        <div className="card-body">
                            <form action="" onSubmit={onsubmit} className="text-center">
                                <div className="input-group pb-4">
                                    <TextField name="email" style={{ width: "100%" }} onChange={onChange} value={user.email} id="outlined-basic" label="Email" variant="outlined"  
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <AccountCircle color="primary"/>
                                            </InputAdornment>
                                        ),
                                        }} />
                                </div>
                                <div className="input-group pb-1">
                                    
                                    <TextField name="password" style={{ width: "100%" }} onChange={onChange} value={user.password} type="password" id="outlined-basic" label="Palavra-passe" variant="outlined"  
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <VpnKeyIcon color="primary"/>
                                                </InputAdornment>
                                            ),
                                            }} />

                                </div>
                                <div className="d-flex justify-content-end pb-4">
                                    <Link to="register"><span className="text-brant-color">Registar-se</span></Link>
                                </div>
                                <div className="container mx-auto">
                                    <button type="submit" className="btn btn-brant-color w-50 p-2">Login</button>

                                </div>

                        
                        </form>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
