import React,{useState, useEffect} from 'react'
import Subtitle from '../Others/Subtitle'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

//representation of an activity on training sessions
const ActivityBoxShape =(props)=>{
const [games,setGames] =  useState(props.games);


if(games.lentgh != 0 ){
    console.log(props);
 
    return <div className="mt-4">

        <HtmlTooltip interactive arrow placement="top"
        title={

        <div>

            
            <p>{props.data.description}</p>
            <Subtitle sectionTitle="Domínios/Subdomínios alvo"/>

            <ul className="list-group px-4">
                {props.data.profileByDomain.map(domain =>
                    <li className="text-secondary" key={domain.id}>{domain.name}</li>                
                )}
            </ul>
        </div>
        }
      >
      
        <div>
            <div className="row justify-content-md-center">
                <SportsEsportsIcon/>
            </div>
            <div className="row justify-content-md-center">
                <Subtitle sectionTitle={props.data.name}/>
            </div> 

        </div>
        </HtmlTooltip>
    </div>}
    else{
        return <div></div>
    }
}
export default ActivityBoxShape