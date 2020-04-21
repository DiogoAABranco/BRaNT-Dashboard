
import React,{ useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function SelectBox (props){
/*see example of select on the asessment.js */
/*properies
handlerSelect
selected_val
values(id,name)
label*/
    const [selected_val, setSelected_val] = useState('');
  
    const handleChange = event => {
        setSelected_val(event.target.value);
        
    };

    return <div className="">
        
        <FormControl className="w-100">
            <InputLabel id="demo-controlled-open-select-label">{props.label}</InputLabel>
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={props.selected_val}
            onChange={props.handlerSelect}
            >
                {props.values.map(temp =>(<MenuItem key={temp.id} value={temp.id}>{temp.name}</MenuItem>))}
                
            </Select>
        </FormControl>
    </div>
}

export default SelectBox
