import React from 'react'
import CardProgram from './CardProgram'
import ProgressSessions from './ProgressSessions';

export default function CardsRow(props) {
    
    const transformDate = (date) =>{
        
        let todayTime = new Date(props.data.startDate);
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        let year = todayTime.getFullYear();
        return day + "-" + month + " " + year;
     
    }
    const calculateProgress = () =>{
        let value = 0;
        let nSessions = props.data.nSessions;
        let sessions = props.data.plannedSessions;
        sessions.forEach(session => {
            if(session.isDone) 
                value++;
        });

        return value;
    }

    return (
        <div className="row m-o p-0">
            <div className="col-sm-4 p-4">
                <CardProgram title="Total de Sessões" value={props.data.nSessions}/>
            </div>
            <div className="col-sm-4 p-4">
                <CardProgram title="Data inicial" value={transformDate(props.data.startDate)}/>
            </div>
            <div className="col-sm-4 p-4">
                <ProgressSessions value={calculateProgress()}/>
            </div>
        </div>
    )
}
