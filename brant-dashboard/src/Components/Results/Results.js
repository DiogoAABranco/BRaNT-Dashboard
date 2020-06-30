import React, { useState,useEffect } from 'react'
import { useParams} from "react-router";
import Title from '../Others/Title';
import {  VictoryChart,
    VictoryLine,
    VictoryLabel,
    VictoryVoronoiContainer } from 'victory';

export default function Results(props) {

    const [trainingProgram,setTrainingProgram] = useState(null);
    const [trainingProgramID,setTrainingProgramID] = useState(useParams().id);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`http://localhost:8000/api/training-program/${trainingProgramID}`,{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setTrainingProgram(data);
            console.log(data);
         
        })
        .catch(console.log);
        console.log("id: " +trainingProgramID );
        
        return () => abortController.abort(); 
    },[]);

    /*
    params
        type: tipo de dados(sessão(0) ou jogo(1))
     */
    function setupChart(){

        if(trainingProgram == null)return;
        let dataSession = [];
        //ver por sessão
   
        trainingProgram.sessions.forEach((element,index) => {
            element.scores.forEach(score => {
                if(score.game_id == null && score.score_type_id == 3){
                    let temp = {x:index, y:parseInt(score.value), z:element.date }
                    dataSession.push(temp);
                }
            });
        });
        console.log(dataSession);
        return dataSession;

    }


    if(trainingProgram != null){
        
        return (
            <div>
                <div className="row p-2">
                    <Title sectionTitle={"Resultados: " + trainingProgram.patient.name }/>
                </div>
                <div className="d-flex align-items-center">
                    
                        <VictoryChart 
                            minDomain={{ y: 20 }}
                            containerComponent={
                                <VictoryVoronoiContainer
                                    labels={({ datum }) => "Sessão "+datum.x+": " + datum.y+" minutos \n Data: " + datum.z}
                                />
                            }
                            >
                            <VictoryLine
                            scale={{x: "linear"}}
                        
                
                                data={setupChart()} />
                        </VictoryChart>
                 
                    

                                
                </div>
                
            </div>
        )
    }
    else{
        return (
            <div>
                ...
            </div>
        )
    }
    
}
