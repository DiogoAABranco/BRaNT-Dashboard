import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableBrant from './TableBrant'

function Content (props){
    return <div className="container mt-4">
    
        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h4>
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <p className="text-secondary">Pesquisa de pacientes</p>
                        </button>
                    </h4>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <form>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="pl-4 pr-4 pt-2">
                                    <label className="text-brant-color">Nome</label>
                                    <input type="email" class="form-control" id="inputName" placeholder="Enter name"/>
                                </div>
                                <div className="pl-4 pr-4 pt-4">
                                    <label className="text-brant-color">Idade</label>
                                    <RangeSlider/>                              
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="pl-4 pr-4 pt-2">
                                            <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Treinos em atraso" labelPlacement="end"/>
                                        </div>
                                        <div className="pl-4 pr-4 pt-2">
                                            <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Treinos em atraso" labelPlacement="end"/>
                                        </div>
                                        <div className="pl-4 pr-4 pt-2">
                                            <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Treinos em atraso" labelPlacement="end"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-4 d-flex align-items-center">
                                        <button type="button" class="btn btn-brant-color">Pesquisar</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div> 
        <div className="container mt-4">
            <TableBrant/>
        </div>
    </div>
}
export default Content


const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([20, 37]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    );
  }