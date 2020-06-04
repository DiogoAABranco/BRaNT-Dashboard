import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableBrant from './TableBrant'
import userStore from '../Stores/UserStore'



class Content extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: userStore.getAll(),
            searchName:"",
            valueRangeSlider:[0, 100]
            
        }
    }
    //event handler for search box
    searchSpace = (event)=>{
        let keyword = event.target.value;
        this.setState({searchName:keyword});
    }
    setValueRangeSlider=(event)=>{
        let range = event.target.value;
        this.setState({valueRangeSlider:range});
    }

    valuetext(value) {
        return `${value}`;
      }
    handleChangeSlider = (event, newValue) => {
        this.setState({valueRangeSlider:newValue});
        console.log(newValue);
      };
  
    render(){
        //apply fliter to users array
        let usersFilterByName = this.state.users.filter((temp) =>
            {
                if(this.state.searchName == null)
                    return temp;
                else if (temp.name.toLowerCase().includes(this.state.searchName.toLowerCase()))
                    return temp;    
            } );
        
        let users = usersFilterByName.filter(user => (user.age >=this.state.valueRangeSlider[0]) && (user.age <= this.state.valueRangeSlider[1]));


        const column1={id:"name",label:"Nome"};
        const column2={id:"age",label:"Idade"};
        
        return <div className="container-fluid mt-2">
        
            <div className="accordion ml-3 mr-3" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h4>
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <p className="text-secondary">Pesquisa de pacientes</p>
                            </button>
                        </h4>
                    </div>
    
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <form>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="pl-4 pr-4 pt-2">
                                        <label className="text-brant-color">Nome</label>
                                        <input type="name" onChange={(e)=>this.searchSpace(e)} className="form-control" id="inputName" placeholder="Enter name"/>
                                    </div>
                                    <div className="pl-4 pr-4 pt-4">
                                        <label className="text-brant-color">Idade</label>
                                        <div className="w-50">
                                        <Slider
                                            value={this.state.valueRangeSlider}
                                            onChange={this.handleChangeSlider}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={this.valuetext}
                                            
                                            /> 
                                        </div>
                                                                 
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="pl-4 pr-4 pt-2">
                                                <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Sessões em atraso" labelPlacement="end"/>
                                            </div>
                                            <div className="pl-4 pr-4 pt-2">
                                                <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Sessões concluídas" labelPlacement="end"/>
                                            </div>
                                            <div className="pl-4 pr-4 pt-2">
                                                <FormControlLabel value="1" control={<Checkbox color="primary" />} label="Avaliação pendente" labelPlacement="end"/>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div> 
            <div className="container mw-100 mt-2">
                <TableBrant data={users} column1={column1} column2={column2}/>     
            </div>
        </div>
    }
}
export default Content