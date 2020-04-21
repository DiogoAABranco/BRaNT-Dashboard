import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField'

function Test(props){

    const [value,setValue] = useState('');
    const onChangeVal = (e) =>{
  
    }
    return <div className="container container-fluid">
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
}
export default Test