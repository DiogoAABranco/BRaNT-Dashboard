
import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function SelectBox (props){
    let selected_val;

    //const [age, setAge] = React.useState('');
  
   // const handleChange = event => {
    //  setAge(event.target.value);
   // };



    return <div className="">
        
        <FormControl className="w-100">
            <InputLabel id="demo-controlled-open-select-label">Selecionar Tipo</InputLabel>
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selected_val}

       
            // onChange={handleChange}
            >
       
                <MenuItem value={0}>Medicação</MenuItem>
                <MenuItem value={1}>Procedimento clínico</MenuItem>
                <MenuItem value={2}>Patologia</MenuItem>
            </Select>
        </FormControl>
    </div>
}

export default SelectBox
