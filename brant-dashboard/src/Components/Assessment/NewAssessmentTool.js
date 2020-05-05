import React,{useState,useEffect} from 'react'
import Title from '../Others/Title'
import Subtitle from '../Others/Subtitle'


function NewAssessmentTool(props){

    const [domains,setDomains] = useState([]);

    //input left side
    const [newDomain,setNewDomain] = useState("");

    //input right side
    const [newSubDomain,setNewSubDomain] = useState("");

    let domain = {id:0, name:newDomain,val:0,subDomains:[]}
    
    if(domains !== undefined && domains.length > 0 )
        domain = {id:domains[domains.length - 1].id+1,name:newDomain,val:0,subDomains:[]}
  
    //id do dominio que será editado para criar os subdominios
    const [domainEditing,setdomainEditing] = useState("");

    const [subDomainEditing,setSubDomainEditing] = useState("");
    
   

    let subDomain = {id:0, name:newSubDomain,val:0}

    if(domainEditing.subDomains !== undefined && domainEditing.subDomains.length > 0)
        subDomain = {id:domainEditing.subDomains[domainEditing.subDomains.length - 1].id+1,name:newSubDomain,val:0}
    
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
        if(subDomain.name !== "" &&tempDomain.subDomains !== undefined)
            tempDomain.subDomains.push(subDomain);

        setdomainEditing(tempDomain);      
        setNewSubDomain("");

    }

    const onclickDeleteDomain=() => {
    
        setDomains(domains.filter(item => item.id != domainEditing.id));
        setdomainEditing("");    
    }
    const onclickDeleteSubDomain=() => {
        let tempDomain = domainEditing;
        tempDomain.subDomains = domainEditing.subDomains.filter(item => item.id != subDomainEditing.id);
        setdomainEditing(tempDomain);  
        
        setSubDomainEditing("");    
    }


    const onFormSubmit = (e) => {
        e.preventDefault(); 
        /******************************************** */
        //juntar a variavel do nome, decrição e domains
        //e submeter aqui
    };
    return <div className="container-fluid mt-2">
        <form onSubmit={onFormSubmit}>
            <Title sectionTitle="Criar novo teste de avaliação"/>
                <div className="row pb-4">
                    <div className="col-sm-6">
                        <div className="pl-4 pr-4 pt-2">
                            <label className="text-brant-color">Nome do teste</label>
                            <input type="name" className="form-control" id="inputName" placeholder="Inserir nome"/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="pl-4 pr-4 pt-2">
                            <label className="text-brant-color">Descrição</label>
                            <textarea type="name" className="form-control" id="inputDescription" placeholder="Inserir descrição"/>
                        </div>
                    </div>    
                </div>
                <div className="row">             
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <Subtitle sectionTitle="Domínios"/>
                                
                                <input type="name" className="form-control w-80" id="inputName" value={newDomain} onChange={onChangeNewDomain} placeholder="Inserir novo dominio"/>
                                <button onClick={onclickAddDomain} className="btn btn-brant-color mt-1">Adicionar</button>
                                <button className="btn btn-danger ml-4" onClick={onclickDeleteDomain}>Eliminar</button>
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
                                {domainEditing.name !== undefined && domainEditing.name !== "" ? <Subtitle sectionTitle={"Subdomínios: "+domainEditing.name}/> : <Subtitle sectionTitle="Subdomínios - escolher domínio a editar"/>}
                                <input type="name" className="form-control w-80" id="inputSubdomain" value={newSubDomain} onChange={onChangeNewSubDomain} placeholder="Inserir novo dominio"/>
                                <button onClick={onclickAddSubDomain} className="btn btn-brant-color mt-1">Adicionar</button>
                                <button className="btn btn-danger ml-4" onClick={onclickDeleteSubDomain}>Eliminar</button>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {domainEditing.subDomains !== undefined && domainEditing.subDomains.length > 0 ? domainEditing.subDomains.map(temp => <li key={temp.id} onClick={() => {setSubDomainEditing(temp)}} className={temp.id === subDomainEditing.id?"list-group-item list-group-item-brant-color list-group-item-action active":"list-group-item list-group-item-brant-color list-group-item-action"}>{temp.name}</li> ):null}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </form>
            </div>

}
export default NewAssessmentTool
