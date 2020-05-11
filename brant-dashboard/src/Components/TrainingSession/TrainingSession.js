import React, { Component } from 'react'
import ActivityBoxShape from './ActivityBoxShape'
import Title from '../Others/Title'
import ClearIcon from '@material-ui/icons/Clear';
import Subtitle from '../Others/Subtitle';
import Slider from '@material-ui/core/Slider';

class TrainingSession extends Component{
    constructor(props){
        super(props);
        this.state = {
            activities:[{id:0, activityName:"Atividade 1", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:1, activityName:"Atividade 2", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:2, activityName:"Atividade 3", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}],
            dificulty:0
        }
        
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
        return <div><Title sectionTitle="Plano de treino"/>
          
                    <div className="card m-4">
                        <div className="card-header">
                            <Subtitle sectionTitle="Atividades recomendadas"/>
                        </div>
                        <div className="card-body">
                            <div className="row">            
                                {this.state.activities.map(temp =>
                                    <div key={temp.id} className="col-sm-3"><ActivityBoxShape data={temp}/>
                                        <div className="row justify-content-md-center">
                                            <button onClick={e => this.onClickRemoveActivity(e,temp)} className="btn btn-brant-color"><ClearIcon/></button>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
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
                    
            </div>
    }
}
export default TrainingSession