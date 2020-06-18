import React, { useState, useEffect } from "react";
import Title from '../Others/Title'

export default function NewPatientForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    

    const handleSubmit = (event) => {
        setSuccess(false);
        setWarning(false);
        event.preventDefault();
        console.log(name, email, address);

        const data = {name, email, address};
        
        fetch('http://localhost:8000/api/patients', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
    }).then(res => {
        
        if(res.status==201){
            setSuccess(true);
            setWarning(false);
        }else{
            setSuccess(false);
            setWarning(true);
        }
        return res;
    }).catch(err => {
        setSuccess(false);
        setWarning(true);
        return err;
    });
        setName("");
        setEmail("");
        setAddress("");
    }

    return (
        <div>
            {success?<div className="alert alert-success" role="alert">Paciente adicionado!</div>:null }
            {warning?<div className="alert alert-danger" role="alert">Não foi possível adicionar paciente</div>:null }
            
            <div className="container w-50">
                
                <div className="d-flex  m-0 p-4">
                    <form className="row w-100" onSubmit={handleSubmit} >
                        <div className="p-5 d-flex justify-content-center w-100">
                            <Title sectionTitle="Novo Paciente"/>

                        </div>
                        <div className="col-md-12 form-group ">
                            <label className="control-label text-brant-color" >Nome</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="name" placeholder="Nome" className="form-control" value={name} onChange={e => setName(e.target.value)}  type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Email</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}  type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="control-label text-brant-color" >Morada</label> 
                            <div className="inputGroupContainer">
                                    <div className="input-group">
                                        <input name="address" placeholder="Morada" className="form-control" value={address} onChange={e => setAddress(e.target.value)} type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 d-flex justify-content-center w-100">
                        <input type="submit" value="Submeter" className="btn btn-brant-color"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        
      </div>)
}
