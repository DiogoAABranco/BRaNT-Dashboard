import React,{useState,useEffect} from 'react'
import Title from '../Others/Title'
import Subtitle from '../Others/Subtitle'


function NewAssessmentTool(props){

    const [domains,setDomains] = useState([]);

    const [newDomain,setNewDomain] = useState("");

    //id do dominio que será editado para criar os subdominios
    const [domainEditing,setdomainEditing] = useState(0);
    
    const onFormSubmit = (e) => {
        e.preventDefault();
           
    };

    let domain = {id:domains.length,name:newDomain,val:0}
 
    const onChangeNewDomain = (e)=>{
        setNewDomain(e.target.value);
        
    }

    

    const onclickAddDomain=() => {
        // Should not ever set state during rendering, so do this in useEffect instead.  
        if(domain.name !== "")
            setDomains([...domains, domain]);
        setNewDomain("");

    }

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
                            <textarea type="name" className="form-control" id="inputDescription" placeholder="Inserir nove"/>
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
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    {domains !== undefined ? domains.map(temp => <li key={temp.id} onClick={() => {setdomainEditing(temp)}} className="list-group-item list-group-item-action">{temp.name}<input type="checkbox"/></li> ):null}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                {domainEditing.name !== undefined ?<Subtitle sectionTitle={"Subdomínios: "+domainEditing.name}/> : <Subtitle sectionTitle="Subdomínios - escolher domínio a editar"/>}
                                <button className="btn btn-brant-color">Adicionar subdomínio</button>
                            </div>
                            <div className="card-body">
                                sdsdsds
                            </div>
                        </div>
                        
                    </div>
                </div>
                </form>
            </div>

}
export default NewAssessmentTool
