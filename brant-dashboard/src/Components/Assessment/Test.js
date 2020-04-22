import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField'
import FileUploader from './FileUploader'

function Test(props){

    const [value,setValue] = useState('');
    const onChangeVal = (e) =>{
  
    }
    return <div className="">

        <div className="row">
            <div className="col-sm-6">
                <div className="row">
                {props.data.map(temp =>(
                    <div key={temp.id} className="col-sm-6">
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
                
                    </div>))}
                    </div>
            </div>
            <div className="col-sm-6">
                    <FileUploader/>
                
                <div className="d-flex justify-content-center mt-1">
                        <button type="submite" onClick={props.newEntry} className="btn btn-brant-color m-2 w-50">Adicionar Teste</button>
                </div>
            </div>
        </div>
    </div>
}
export default Test