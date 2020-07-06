import React,{useState, useEffect} from 'react'
import baseUrl from '../../Config/config'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Title from '../Others/Title';
import Subtitle from '../Others/Subtitle';


export default function NewAssessmentSession(props) {

    const [patient, setPatient] = useState({id:props.match.params.id, name:props.match.params.name});

    const [tools, setTools] = useState(null);
    
    const [selectedTool, setSelectedTool] = useState("");
    

    useEffect(() => {

        const abortController = new AbortController();

        const signal = abortController.signal;

        fetch(`${baseUrl}assessment-tools`,{ signal: signal })

        .then(res => res.json())

        .then((data) => {
            
            setTools(data);
  
        })

        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);

    const handleChange = (event) => {

        let tool = event.target.value;

        tool.modules.forEach((mod,index) => {

            mod.submodules.forEach((submod, index) => {

                submod['value'] = 0;
           
            });
            
        });

        setSelectedTool(tool);
        
        


    };

    const handleChangeSubmodules = (e,id) =>{

        //setSelectedTool({...selectedTool, [selectedTool.modules[indexmod].submodules[indexsubmod]]: e.target.value } );
        

        let tool = selectedTool;

        tool.modules.forEach((mod,index) => {

            mod.submodules.forEach((submod,index2) => {

                if(submod.id == id){
                    submod.value = e.target.value;
                    console.log(submod.name,submod.value);
                    
                }
                    
            });
           
        });

        setSelectedTool(tool);

        console.log(tool);
    }

   

    if(tools != null){
        return (
            <div>
                <Title sectionTitle={"Nova avaliação: " + patient.name}/>

                    <div className="d-flex justify-content-center py-4">

                        <Subtitle sectionTitle="Selecionar a ferramenta de avaliação"/>
                        
                        <div className="col-md-3">

                            <FormControl className="w-100" >

                                <InputLabel id="demo-controlled-open-select-label">Ferramenta de avaliação</InputLabel>

                                <Select
                                
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedTool}
                                    onChange={handleChange}
                                    >
                                        {tools.map((tool,index) => <MenuItem key={tool.id} value={tool}>{tool.name}</MenuItem>)}

                                    </Select>

                            </FormControl>

                        </div>

                </div>
                
                {selectedTool != "" ?

                    <div className="d-flex justify-content-center py-4">

                        <div className="container-fluid">

                            <div className="row px-2">

                                {selectedTool.modules.map((mod,index) => 

                                    <div className="col-md-12" key={mod.id}>

                                        <Subtitle sectionTitle={index+1+" - "+mod.name}/>
 
                                        <div className="row">  

                                            {mod.submodules.map((submod,indexsub) => 

                                                <div key={submod.id} className="col-md-3 pb-2">
                                                    
                                                    <TextField className="w-100" id="outlined-basic" label={submod.name} value={submod.value} variant="outlined" type="number" onChange={e => handleChangeSubmodules(e,submod.id) } />

                                                </div>
                                            )}
                                            

                                        </div>

                                    </div>                             
                                )}
                            </div>

                        </div>

                    </div> 
                
                :null}

            </div>
        )     
    }
    else return <div></div>
    
}
