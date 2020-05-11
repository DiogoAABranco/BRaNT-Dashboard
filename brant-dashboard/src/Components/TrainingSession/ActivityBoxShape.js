import React from 'react'
import Subtitle from '../Others/Subtitle'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';


//representation of an activity on training sessions
const ActivityBoxShape =(props)=>{

    return <div className="mt-4">
        <span className="" data-toggle="tooltip" data-placement="bottom" title={props.data.description} >
            <div className="row justify-content-md-center">
                <SportsEsportsIcon/>
            </div>
            <div className="row justify-content-md-center">
                <Subtitle sectionTitle={props.data.activityName}/>
            </div>
           
            
        </span>
    </div>
}
export default ActivityBoxShape