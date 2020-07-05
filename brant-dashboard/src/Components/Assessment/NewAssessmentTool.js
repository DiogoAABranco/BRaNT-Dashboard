import React,{useState,useEffect} from 'react'
import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import Subtitle from '../Others/Subtitle'


function NewAssessmentTool(props){

    const [toolName, setToolName] = useState("");

    const [toolDescription, setToolDescription] = useState("");

    const [errors, setErrors] = useState({name:'',description:'',domains:''});

    const [domains,setDomains] = useState([]);

    //input left side
    const [newDomain,setNewDomain] = useState("");

    //input right side
    const [newSubDomain,setNewSubDomain] = useState("");

    let domain = {id:0, name:newDomain,val:0,submodules:[]}
    
    if(domains !== undefined && domains.length > 0 )
        domain = {id:domains[domains.length - 1].id+1,name:newDomain,val:0,submodules:[]}
  
    //id do dominio que será editado para criar os subdominios
    const [domainEditing,setdomainEditing] = useState("");

    const [subDomainEditing,setSubDomainEditing] = useState("");
    
    let subDomain = {id:0, name:newSubDomain,val:0}

    if(domainEditing.submodules !== undefined && domainEditing.submodules.length > 0)
        subDomain = {id:domainEditing.submodules[domainEditing.submodules.length - 1].id+1,name:newSubDomain,val:0}
    
    const onChangeNewDomain = (e)=>{

        setNewDomain(e.target.value);
    }
    const onChangeNewSubDomain = (e)=>{

        setNewSubDomain(e.target.value);
    }

    const onclickAddDomain=() => {
        
        if(domain.name !== "")
            setDomains([...domains, domain]);

        setNewDomain("");

    }
    const onclickAddSubDomain=() => {

        let tempDomain = domainEditing;

        if(subDomain.name !== "" &&tempDomain.submodules !== undefined)
            tempDomain.submodules.push(subDomain);

        setdomainEditing(tempDomain);      

        setNewSubDomain("");

    }

    const onclickDeleteDomain=() => {
    
        setDomains(domains.filter(item => item.id != domainEditing.id));

        setdomainEditing("");    
    }

    const onclickDeleteSubDomain=() => {

        let tempDomain = domainEditing;

        tempDomain.submodules = domainEditing.submodules.filter(item => item.id != subDomainEditing.id);

        setdomainEditing(tempDomain);  
        
        setSubDomainEditing("");    
    }




    function onClickSubmit (e) {
        e.preventDefault();

        toolName.length < 2 ? errors.name = 'Preencher nome da ferramenta de avaliação': errors.name='';

        toolDescription.length < 2 ? errors.description = 'Preencher descrição da ferramenta de avaliação': errors.description='';

        domains.length < 1 ? errors.domains = 'Adicionar módulos à ferramenta de avaliação': errors.domains='';

        setErrors({...errors, name:errors.name, description:errors.description, domains:errors.domains });

        if(errors.name === '' && errors.description === '' && errors.domains === ''){

            let name = toolName;
            let description = toolDescription;
            let modules = domains;

            let data = {name, description, modules};
            console.log(JSON.stringify(data));
        
        fetch(`${baseUrl}assessment-tools`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            
            if(res.status==201){
                console.log("teste adicionado");
                
            }else{
                console.log("teste invalido");
                setToolName('');
                setToolDescription('');
                setDomains([]);
                setdomainEditing([]);
                setSubDomainEditing([]);
             
            }
            return res;
        })
        .then(res => res.json())
        .then((data) => {

            console.log('API success: ',data);
            props.history.push('/assessment-tools');

        })
        .catch(err => {
            console.log('API err: ',err);
            setToolName('');
            setToolDescription('');
            setDomains([]);
            setdomainEditing([]);
            setSubDomainEditing([]);
            return err;
        });
            console.log("teste: " + data);
        }
        
        
    };

    return <div className="container-fluid mt-2">
        

            <Title sectionTitle="Criar novo teste de avaliação"/>

                <div className="row pb-4">

                    <div className="col-sm-6">

                        <div className="pt-2">

                            <label className="text-brant-color">Nome do teste</label>
                            <input type="name" className={errors.name !=='' ? "form-control is-invalid":'form-control'} id="inputName" value={toolName} onChange={e => setToolName(e.target.value)} placeholder="Inserir nome" />
                           
                            {errors.name !== '' ?<div className="invalid-tooltip">
                                {errors.name}
                            </div>:null}
                            

                        </div>
                    </div>

                    <div className="col-sm-6">

                        <div className="pt-2">

                            <label className="text-brant-color">Descrição</label>
                            <textarea type="name" className={errors.description !=='' ? "form-control is-invalid":'form-control'} id="inputDescription" value={toolDescription} onChange={e2 => setToolDescription(e2.target.value)} placeholder="Inserir descrição" />
                            {errors.description !== '' ?<div className="invalid-tooltip">
                                {errors.description}
                            </div>:null}

                        </div>

                    </div>    

                </div>

                <div className="row"> 

                    <div className="col-sm-6">

                        <div className="card">

                            <div className="card-header">

                                <Subtitle sectionTitle="Módulos"/>
                                
                                <input type="name" className={errors.domains !=='' ? "form-control w-80 is-invalid":'form-control w-80'} id="inputName" value={newDomain} onChange={onChangeNewDomain} placeholder="Inserir novo módulo"/>
                                {errors.domains !== '' ?<div className="invalid-tooltip">
                                    {errors.domains}
                                </div>:null}
                                
                                <button onClick={onclickAddDomain} className="btn btn-brant-color mt-2">Adicionar</button>
                                <button className="btn btn-outline-danger ml-4 mt-2" onClick={onclickDeleteDomain}>Eliminar</button>

                            </div>
                            <div className="card-body p-0">

                                <ul className="list-group list-group-flush">
                                    {domains !== undefined && domainEditing.name !== "" ? domains.map(temp => <li key={temp.id} onClick={() => {setdomainEditing(temp)}} className={temp.id === domainEditing.id?"list-group-item list-group-item-brant-color list-group-item-action active":"list-group-item list-group-item-brant-color list-group-item-action"}>{temp.name}</li> ):null}
                                </ul>

                            </div>

                        </div>
                        
                    </div>

                    <div className="col-sm-6">

                        <div className="card">

                            <div className="card-header">

                                {domainEditing.name !== undefined && domainEditing.name !== "" ? <Subtitle sectionTitle={"Submódulos: "+domainEditing.name}/> : <Subtitle sectionTitle="Submódulos - escolher módulo a editar"/>}
                                <input type="name" className="form-control w-80" id="inputSubdomain" value={newSubDomain} onChange={onChangeNewSubDomain} placeholder="Inserir novo sub módulo"/>
                                <button onClick={onclickAddSubDomain} className="btn btn-brant-color mt-2">Adicionar</button>
                                <button className="btn btn-outline-danger ml-4 mt-2" onClick={onclickDeleteSubDomain}>Eliminar</button>
                            
                            </div>

                            <div className="card-body p-0">

                                <ul className="list-group list-group-flush">
                                    {domainEditing.submodules !== undefined && domainEditing.submodules.length > 0 ? domainEditing.submodules.map(temp => <li key={temp.id} onClick={() => {setSubDomainEditing(temp)}} className={temp.id === subDomainEditing.id?"list-group-item list-group-item-brant-color list-group-item-action active":"list-group-item list-group-item-brant-color list-group-item-action"}>{temp.name}</li> ):null}
                                
                                </ul>

                            </div>

                        </div>
                        
                    </div>

                </div>
                <div className="container d-flex justify-content-center mt-4">

                    <button onClick={onClickSubmit} className="btn btn-brant-color">Submeter</button>

                </div>
            
       
            </div>
}
export default NewAssessmentTool