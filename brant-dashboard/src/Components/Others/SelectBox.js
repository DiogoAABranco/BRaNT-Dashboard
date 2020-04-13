
import React,{ useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function SelectBox (props){



    const [selected_val, setSelected_val] = useState('');
  
    const handleChange = event => {
        setSelected_val(event.target.value);
        //this.setState({selectedValue:selected_val});
        console.log(selected_val);
       
    };

    


    return <div className="">
        
        <FormControl className="w-100">
            <InputLabel id="demo-controlled-open-select-label">Selecionar Tipo</InputLabel>
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selected_val}
            onChange={props.handlerSelect}
            >
                <MenuItem value={0}>Procedimento clínico / Patologia</MenuItem>
                <MenuItem value={1}>Medicação</MenuItem>
            </Select>
        </FormControl>
    </div>
}

export default SelectBox
