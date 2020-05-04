import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField'
import FileUploader from './FileUploader'

function Test(props){

    const [value,setValue] = useState('');
    const onChangeVal = (e) =>{
  
    }
    
    return <div className="">

        <div className="row">
            <div className="col-sm-9">
                <div className="row">
                {props.data.map(temp =>(
                    <div key={temp.id} className="col-sm-3">
                        <div id={"accordion"+temp.id} className="mb-2">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">         
                                        <div className="row p-0 m-0 w-100">
                                            <div className="col-sm-8">
                                                <TextField
                                                label={temp.domain}
                                                className={temp.domain}
                                                margin="dense"
                                                type="number"
                                                onChange={(e)=> {
                                                    temp.value = e.target.value;
                                                    setValue(e.target.value);
                                                }}
                                                value={temp.value}
                                                />
                                            </div>
                                            {temp.subdomains !== undefined ? <div className="col-sm-4">
                                                <button className="btn btn-brant-color collapsed" data-toggle="collapse" data-target={"#colapse"+temp.id} aria-expanded="false" aria-controls={temp.id}>
                                                    +
                                                </button>
                                            </div> :null}    
                                        </div>                                       
                                    </h5>
                                </div>
                                <div id={"colapse"+temp.id} className="collapse" aria-labelledby="headingOne" data-parent={"#accordion"+temp.id}>
                                    <div className="card-body">
                                    {temp.subdomains !== undefined ? temp.subdomains.map(temp => (
                                        
                                        <TextField
                                            key={temp.id}
                                            label={temp.subdomain}
                                            className={temp.subdomain}
                                            margin="dense"
                                            type="number"
                                            onChange={(e)=> {
                                                temp.value = e.target.value;
                                                setValue(e.target.value);
                                            }}
                                            value={temp.value}
                                        />)):null}
                                    </div>
                                </div>
                            </div>
                        </div>            
                    </div>))}
                </div>
            </div>
            <div className="col-sm-3">
                <FileUploader/>
                <div className="d-flex justify-content-center mt-1">
                    <button type="submite" onClick={props.newEntry} className="btn btn-brant-color m-2 w-50">Adicionar Teste</button>
                </div>
            </div>
        </div>
    </div>
}
export default Test