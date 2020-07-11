import React, {useState, useEffect} from 'react'

import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import { set } from 'date-fns';
import {tokenHeader} from '../../Config/configToken'

export default function AssessmentToolList() {

    const [tools, setTools] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}assessment-tools`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setTools(data);

            if(data.length > 0)
                setSelected(data[data.length-1]);

            console.log(data);
            
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);

    function handleClickTool (tool){

        console.log(tool);
        setSelected(tool);
        
    }


    if(tools !== null && selected !== null){
        return (
            <div>

                <Title sectionTitle="Ferramentas de Avaliação"/>

                <div className="container-fluid">              

                    <div className="row">

                        <div className="col-md-6">

                            <ul className="list-group list-group-flush text-brant-color p-4">

                                {tools.map(tool => selected !== null && selected.id == tool.id ?<li key={tool.id} onClick={() => handleClickTool(tool)} className=" list-group-item list-group-item-brant-color list-group-item-action active">{tool.name}</li>:<li key={tool.id} onClick={() => handleClickTool(tool)} className=" list-group-item list-group-item-brant-color list-group-item-action">{tool.name}</li> )}
                            
                            </ul>

                        </div>

                        <div className="col-md-6">

                            <div className="card border-brant-color mb-3 m-4">

                                <div className="card-header text-brant-color"><h5>{selected.name}</h5></div>

                                <div className="card-body text-brant-color">

                                    <p>{selected.description}</p>
                                    
                                    {selected.modules.map(module =>(
                                    
                                        <div key={module.id} className="pb-2">
                                            
                                            <h6 className="card-title">{module.name}</h6>

                                            {module.submodules.map( submod => 

                                                <li key={submod.id} className="card-text pl-4">{submod.name}</li>)}
                                        </div>)
                                        
                                    )}
                                    
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                

            </div>
        )
    }
    else
        return <div></div>
    
}
