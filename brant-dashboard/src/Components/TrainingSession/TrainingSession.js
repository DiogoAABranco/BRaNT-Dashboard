import React, { Component } from 'react'
import ActivityBoxShape from './ActivityBoxShape'
import Title from '../Others/Title'
import ClearIcon from '@material-ui/icons/Clear';
import Subtitle from '../Others/Subtitle';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogEditParameters from "./DialogEditParameters"
import AddIcon from '@material-ui/icons/Add';
import DialogEditByStep from './DialogEditByStep'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

class TrainingSession extends Component{
    constructor(props){
        super(props);
        this.state = {
            patientName:"Paciente X",
            activities:[{id:0, activityName:"Atividade 1", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:1, activityName:"Atividade 2", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:2, activityName:"Atividade 3", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]},
            {id:4, activityName:"Atividade 5", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]},
            {id:5, activityName:"Atividade 6", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]}],
            dificulty:0,
            startDate:null,
            endDate:null,
            daysOfTheWeek:[]
        }

    }
    handleSubmit = () => {
        let trainingPlan = {
            activities:this.state.activities,
            dificulty:this.state.dificulty,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            daysOfTheWeek:this.state.daysOfTheWeek
        };
        console.log(trainingPlan);

    }
    handleChangeStartDate = (date) => {
        this.setState({startDate:date});
    }
    handleChangeEndDate = (date) => {
        this.setState({endDate:date});
    }

    //remove activity from the recommended list
    onClickRemoveActivity (e,activity){
        let temp = this.state.activities.filter(item => item !== activity);
        this.setState({activities:temp});
    }
    handleSliderChange = (event, newValue) => {
        this.setState({dificulty:newValue});
    }

    render(){

        let daysOfTheWeek = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];

        return <div><Title sectionTitle={"Plano de treino - " + this.state.patientName }/>
          
                    <div className="card ">
                        <div className="card-header d-flex justify-content-between p-1">
                            <Subtitle sectionTitle="Atividades recomendadas"/>
                            <div className="row p-0 m-0">
                                <button className="btn btn-brant-color mr-2"><AddIcon/></button>
                                <DialogEditByStep data={this.state.activities}/>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">            
                                {this.state.activities.map(temp =>
                                    <div key={temp.id} className="col-sm-2"><ActivityBoxShape data={temp}/>
                                        <div className="row justify-content-md-center">
                                            {temp.parameters !== undefined || temp.parameters.length > 0 ? <div className="mr-2"><DialogEditParameters activityName={temp.activityName} data={temp.parameters} /></div>:null }
                                            <button onClick={e => this.onClickRemoveActivity(e,temp)} className="btn btn-brant-color ml-2"><ClearIcon/></button>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center m-2">
                            <Subtitle sectionTitle="Dificuldade"/>
                            <div className="ml-4" style={{width:"300px"}}>
                                <Slider
                                    defaultValue={1}
                                    value={this.state.dificulty}
                                    onChange={this.handleSliderChange}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={10}
                                />
                            </div>
                        </div>
                    </div>  
                    <div className="container-fluid card mb-2">
                        <div className="row ">   
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div className="col-sm-4 m-auto text-center">
                                <Subtitle sectionTitle="Introduzir data de início do plano"/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Data de início"
                                    value={this.state.startDate}
                                    onChange={this.handleChangeStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />                             
                            </div>
                            <div className="col-sm-4 m-auto text-center">
                                <Subtitle sectionTitle="Introduzir data de conclusão do plano"/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Data de conclusão"
                                    value={this.state.endDate}
                                    onChange={this.handleChangeEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </div>
                            <div className="col-sm-4">
                                <div className="row justify-content-md-center"><Subtitle sectionTitle="Dias das sessões"/></div>
                                <div className="row justify-content-md-center pl-4">
                                {daysOfTheWeek.map(temp =>
                                    <div className="col-sm-6" key={temp}>
                                        <FormControlLabel
                                        value={temp}
                                        control={<Checkbox color="primary" />}
                                        label={temp}
                                        labelPlacement="end"
                                    />
                                    </div>)} 
                                </div>
                            </div>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="row justify-content-md-center mt-4">
                            <button className="btn btn-brant-color" onClick={this.handleSubmit}>Submeter treino</button>
                        </div>

                        
                    </div>


                    
            </div>
    }
}
export default TrainingSession