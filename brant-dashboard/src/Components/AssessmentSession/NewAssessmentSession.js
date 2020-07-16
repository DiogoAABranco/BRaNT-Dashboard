import React,{useState, useEffect} from 'react'
import baseUrl from '../../Config/config'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Title from '../Others/Title';
import Subtitle from '../Others/Subtitle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { tokenHeader,getToken,getUser } from '../../Config/configToken'
import SimpleSnackBar from '../Others/SimpleSnackBar'






export default function NewAssessmentSession(props) {

    const [patient, setPatient] = useState({id:props.match.params.id, name:props.match.params.name});

    const [user, setUser] = useState({id:null, name:null});

    const [tools, setTools] = useState(null);
    
    const [selectedTool, setSelectedTool] = useState("");

    const [teste,setTeste] = useState(true);

    const [files,setFiles] = useState("");

    const [filesSend,setFilesSend] = useState([]);

    const [errors, setErrors] = useState("");

    const [open, setOpen] = useState(false);
    

    useEffect(() => {

        const abortController = new AbortController();

        const signal = abortController.signal;

        setUser({id:getUser().id, name: getUser().name});

        fetch(`${baseUrl}assessment-tools`,{headers:tokenHeader()},{ signal: signal })

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
        
        setTeste(!teste);

        setSelectedTool(tool);

        console.log(tool);
    }

    

    const onChange = e => {

        let temp = [];

        for(let i = 0; i< e.target.files.length; i++){
            temp.push(e.target.files[i]);
        }
        setFiles(temp);

        const filesTemp = [...files];
        filesTemp.push(...e.target.files);

        setFilesSend(filesTemp);

        console.log(e.target.files);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let assessment_tool_id = selectedTool.id;
        let patient_id = patient.id;
        let user_id = user.id;
        let results = selectedTool.modules;
        let invalid = false;

        selectedTool.modules.forEach(mod => {
            console.log(mod);
            
            mod.submodules.forEach(submod => {
                console.log(submod);
                console.log(submod.min_value,submod.max_value, !invalid);

                if(submod.min_value !== null && submod.max_value !== null && !invalid){
                    console.log("if min max");

                    if(parseInt(submod.value) < submod.min_value ||  parseInt(submod.value) > submod.max_value  ){
                        setErrors(submod.name + ": valor inválido!");
                        setOpen(true);
                        invalid = true;
                        console.log(submod.name,submod.value,submod.min_value,submod.max_value);
                    }
                    
                }
                
                
           });
       });

        if(!invalid){

            const fileData = new FormData();
            filesSend.forEach((file) => fileData.append('files[]', file));
            
            
            let data = {assessment_tool_id, patient_id, user_id, results,fileData }
            
            fileData.append('data', JSON.stringify(data));
            
            fetch(`${baseUrl}assessments`, {
                method: 'POST',
                headers:new Headers({
                    'Authorization': 'Bearer ' + getToken(),
                }),
                body: fileData,
                
        
            }).then(res => {
                
                if(res.status==201){
                    console.log("ok");
                    
                }else{
                
                    console.log("error");
                }
                return res;
            })
            .then(res => res.json())
            .then((data) => {
                console.log('API success: ',data);
                if(data.msg === 'success'){
                    props.history.push(`/patients/patient-information/${patient.id}/3`);
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            });

            console.log("data_sent",fileData);

       }
        
    }

   

    if(tools != null){
        return (
           
            <div> <SimpleSnackBar open={open} setOpen={setOpen} data={errors}/>
                <div className="pb-2">
                    <Breadcrumbs aria-label="breadcrumb">
                        <NavLink className="text-brant-color" to="/patients">
                            Utentes
                        </NavLink>
                        <Typography color="textPrimary">Nova avaliação</Typography>
                    </Breadcrumbs>
                </div>

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
<form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row d-flex justify-content-center py-4 p-0">
                    
                        <div className="container-fluid p-0 m-0">

                            <div className="row d-flex justify-content-center">

                                {selectedTool.modules.map((mod,index) => 

                                    <div className="col-md-12 px-4 mx-auto" key={mod.id}>
                                    
                                        <div className="row d-flex justify-content-center">  
                                        
                                            <Subtitle sectionTitle={index+1+" - "+mod.name}/>
                                        
                                        </div>
 
                                        <div className="row d-flex justify-content-center">  

                                            {mod.submodules.map((submod,indexsub) => 

                                                <div key={submod.id} className="col-md-3 pb-2">
                                                    
                                                    <TextField className="w-100" id="outlined-basic" name={submod.id+""} label={submod.min_value !== null && submod.max_value !== null ? submod.name + " Min:" + submod.min_value + " Max:" + submod.max_value : submod.name } value={submod.value} variant="outlined" type="number" onChange={e => handleChangeSubmodules(e,submod.id) } />

                                                </div>
                                            )}
                                            

                                        </div>

                                    </div>                             
                                )}
                            </div>

                            <div className="row d-flex justify-content-center pt-2">  

                                <div className="col-md-3 py-2">
                                    
                                    <input type="file" name="files[]" className="custom-file-input" id="customFile" lang="pt-pt" multiple onChange={onChange}/>
                                    
                                    <label className="custom-file-label" htmlFor="customFile">Selecionar anexos</label>

                                    <div className="container">
                                        <ul>
                                            {files != "" ? files.map((file,index) => <li key={index} >{file.name}</li> ):null}
                                        </ul> 
                                    </div>
                                </div>

                            </div>

                            <div className="row p-2 m-0 d-flex justify-content-center ">

                                <button className="btn btn-brant-color" type="submit">Submeter</button>

                            </div>

                        </div>
                       


                    </div> 
                    </div>
                    </form>
                
                :null}

            </div>
        )     
    }
    else return <div></div>
    
}
