import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import PhoneIcon from '@material-ui/icons/Phone';

function FieldProfile(props){
    console.log(props.fieldName);
    return <div className="row hoverable">
                <div className="col-sm-6 pt-2 pb-2">
                    <div className="row">
                    {
                        
                        props.fieldName === 'Nome' && <PersonIcon style={{ color: "#752938" }}/> ||
                        props.fieldName === 'Telefone' && <PhoneIcon style={{ color: "#752938" }}/>||
                        props.fieldName === 'Idade' && <CakeIcon style={{ color: "#752938" }}/> ||
                        props.fieldName === 'Género' && <WcIcon style={{ color: "#752938" }}/>
                    }
                    
                        <label className="pl-2">{props.fieldName}</label>
                    </div>
                </div>
                <div className="col-sm-6 pt-2 pb-2">{props.name}</div> 
</div>
}
export default FieldProfile