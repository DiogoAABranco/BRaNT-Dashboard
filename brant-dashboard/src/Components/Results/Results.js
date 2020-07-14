import React, { useState,useEffect,useContext } from 'react'
import { useParams} from "react-router";
import baseUrl from '../../Config/config'

import Title from '../Others/Title';
import FilterResults from './FilterResults'
import SessionsChart from './SessionsChart';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { tokenHeader } from '../../Config/configToken'

export default function Results(props) {

    const [trainingProgramID,setTrainingProgramID] = useState(useParams().id);

    const [patient, setPatient] = useState(null);

    const [scoreTypesSession, setScoreTypesSession] = useState([]);

    const [scoreTypesGames, setScoreTypesGames] = useState([]);

    const [games, setGames] = useState([]);

    const [check, setCheck] = useState({sessions: true,activities: false});

    const {sessions,activities} = check;

    const [radioSelected, setRadioSelected] = useState(100);

    const [sessionScoreType, setSessionScoreType] = useState([]);

    const [radioSelectedGames, setRadioSelectedGames] = useState('1');

    const [dataCharts, setDataCharts] = useState([]);

    const [scores, setScores] = useState([]);

    const [labelScoreSelected, setLabelScoreSelected] = useState("dados");
    

    useEffect(() => {

        const abortController = new AbortController();

        const signal = abortController.signal;

        fetch( `${baseUrl}scores/training-program/${trainingProgramID}`,{headers:tokenHeader()},{ signal: signal })

        .then(res => res.json())

        .then((data) => {
            
            setScoreTypesSession(data.scoreTypeSession);

            setScoreTypesGames(data.scoreTypeGames);

            setGames(data.games);

            

            setScores(data.scores);

            setPatient(data.patient);

            console.log(data);
            

        })
        .catch(console.log);
  
        return () => abortController.abort(); 
    },[]);


   
    const handleChangeCheckGames = (event) => {
    
        setRadioSelectedGames(event.target.value);
      
    };

    const handleChange = (event) => {

        setCheck({sessions:!sessions, activities:!activities });
      
    };

    const handleChangeCheck = (event) => {
        
        setRadioSelected(event.target.value);
        
    };

    useEffect(() => {
       
        scoreTypesSession.forEach(element => {

            if( element.id == radioSelected ) setLabelScoreSelected( element.name );
             
        });
        scoreTypesGames.forEach(element => {

            if( element.id == radioSelected ) setLabelScoreSelected( element.name );
             
        });

        setupChart();
   
      },[radioSelected,radioSelectedGames,check]);

    /*
    params
        type: tipo de dados(sessão(0) ou jogo(1))
     */
    function setupChart(){

        let data = [];

        if(scores.length == 0){
            setDataCharts(data);
            return;
        }

        if(sessions){
            //tipo de variavel das sessões

            scores.sessionsScore.forEach((element,index) => {

                if(element.score_type_id == radioSelected){

                    let temp = {x:index+1, y:parseInt(element.value), z:element.session.date };

                    data.push(temp);
                }
                      
            });

            setDataCharts(data);

        }
        else if( activities){
            //tipo das variaveis das atividades
            console.log(radioSelected);

            console.log(radioSelectedGames);

            scores.gameScore.forEach((element,index) => {

                element.forEach((element2,index2) => {

                    if(element2 != undefined ){

                        if(element2.score_type_id == radioSelected && element2.game_id == radioSelectedGames ){

                            let temp = {x:(element2.session_id - element[0].session_id+1), y:parseInt(element2.value), z:element2.session.date };
        
                            data.push(temp);
                        }
                    }
                    
                });
                      
            });
            
            setDataCharts(data);
        }

    return data;
     
    }
    
    if(patient != null){

        return (
            <div className="container-fluid m-0 w-100">

                <div className="row p-2">

                    <div className="col-md-12">

                        <Title 
                            sectionTitle={"Utente: " + patient.name }
                        />

                    </div>

                </div>


                <div className="row p-0 m-0 vh-100">

                    <div className="col-md-3 shadow-sm p-3 bg-white rounded">

                        <FilterResults 
                            check={check} 
                            handleChange={handleChange}
                            radioSelected={radioSelected} 
                            handleChangeCheck={handleChangeCheck}
                            scoreTypesSession={scoreTypesSession}
                            scoreTypesGames={scoreTypesGames}
                            
                        />

                    </div>

                    <div className="col-md-9">

                        <div className="row text-brant-color font-weight-bold text-uppercase d-flex justify-content-center align-items-center shadow-sm p-3 bg-white rounded mx-2">

                        <FormControl component="fieldset">

                                <RadioGroup 
                                    aria-label="variaveis" 
                                    name="session_results" 
                                    row 
                                    value={radioSelectedGames} 
                                    onChange={handleChangeCheckGames}>

                                        {games.map(element =>
                                            <FormControlLabel 
                                                key={element.id}
                                                disabled={sessions} 
                                                value={element.id+""}
                                                control={<Radio color="primary"/>} 
                                                label={element.name} 
                                                labelPlacement="top"
                                        />
                                    )}

                                </RadioGroup>

                            </FormControl>
                        
                        </div>

                        {sessions && dataCharts.length || activities  && dataCharts.length > 0 > 0 ?<SessionsChart dataCharts={dataCharts} labelScoreSelected={labelScoreSelected} />:null}

                    </div>

                </div>
            
            </div>
        )
    }
    else{
        return (
            <div>
            </div>
        )
    }
    
}
