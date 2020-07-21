import React,{ useState, useEffect }  from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import baseUrl from '../../Config/config'
import {tokenHeader} from '../../Config/configToken'
import SimpleSnackbar from '../Others/SimpleSnackBar'



export default function Register(props) {

    const [ roles, setRoles ] = useState([]);
    const [selectedRole, setSelectedRole ] = useState("");
    const [user,setUser] = useState({ name:"", email:"", password:"", c_password:"", role_id:0 });
    const [ error, setError ] = useState({ state:false, content:"" });

    const setErrorState = (val) =>{
        setError({...error, state:val});
    }

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}roles`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setRoles(data);
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);


    const handleChangeRole = (e) => {
        setSelectedRole(e.target.value);
        setUser({...user, role_id:e.target.value.id});
    }


    const handleChangeInputs = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }
    
    const validatePassword = () => {
        if( user.password !== user.c_password ){
            setError({state:true, content:"Palavras-passe não coincidem" });
            return false;
        }
        else return true;
    }

    const validateRole = () => {
        if( user.role_id === 0 ){
            setError({state:true, content:"Selecionar o tipo de utilizador" });
            return false;
        }
        else return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( validatePassword() && validateRole() ){
            console.log(user);
            let data = {name:user.name,email:user.email, password:user.password, c_password:user.c_password, role_id:user.role_id };
            fetch(`${baseUrl}register`,{
                headers:tokenHeader(),
                body: JSON.stringify(data),
                method: "post",
                 })
                 .then(res => res.json())
                 .then(res =>{
                     console.log(res);
                     if(res.success !== undefined ){
                        if( res.success.msg === "success" ){                  
                            props.history.push("/dashboard/users");}
                     }
                     else{
                        if( res.error !== undefined){

                            if(res.error.email !== null ){
                                setError({state:true, content:"Email inserido já é utilizado" });
                                //console.log("impossible to register: email");
                             }else{
                                setError({state:true, content:"Não foi possível registar o utilizador. Tentar novamente" });
                                //console.log("impossible to register");
                             }
                         }
                         
                        
                         return false;
                     }
                                
                 })

        }

    } 

    return (
  
            <div className="container vh-100 ">
                <SimpleSnackbar open={error.state} setOpen={ setErrorState } data={ error.content }/>
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    
                    <div className="card mt-5">

                        <h5 className="card-title text-brant-color mx-auto my-4">
                            Registar utilizador
                        </h5>

                        <div className="card-body">

                            <form action="" onSubmit={handleSubmit} className="">
                               
                                <div className="form-group pb-2">
                                    <label className="text-brant-color">Nome</label>
                                    <input type="text" name="name" className="form-control" id="formGroupName" placeholder="Nome" onChange={handleChangeInputs} required/>
                                </div>

                                <div className="form-group pb-2">
                                    <label className="text-brant-color">Email</label>
                                    <input type="email" className="form-control" name="email" id="formGroupEmail" placeholder="Email" onChange={handleChangeInputs} required/>
                                </div>

                                <div className="form-group pb-2">
                                    <label className="text-brant-color">Palavra-passe</label>
                                    <input type="password" className="form-control" name="password" id="formGroupPassword" placeholder="Palavra-passe" onChange={handleChangeInputs} required/>
                                    <input type="password" className="form-control mt-3" name="c_password" id="formGroupPasswordValidate" placeholder="Confirmar palavra-passe" onChange={handleChangeInputs} required/>
                                </div>

                                <FormControl className="w-100" >

                                    <InputLabel id="demo-controlled-open-select-label">Função</InputLabel>

                                    <Select
                                    
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedRole}
                                        onChange={handleChangeRole}
                                        >
                                            {roles.map((role,index) => <MenuItem key={role.id} value={role}>{role.name}</MenuItem>)}

                                        </Select>

                                </FormControl>
                         
                                <div className="container mx-auto py-4 text-center">
                                    <button type="submit" className="btn btn-brant-color w-50 p-2">Registar</button>

                                </div>

                            </form>

                        </div>

                    </div>
                    
                </div>
                
            </div>
        </div>

    )
}
