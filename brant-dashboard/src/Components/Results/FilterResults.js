import React,{useState, prevState} from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';

export default function FilterResults({check, handleChange, radioSelected, handleChangeCheck, scoreTypesSession, scoreTypesGames}) {


    const { sessions, activities } = check;

    
    

    return (

        <div className="pt-4">

            <FormControl component="fieldset">
                
                <FormGroup>

                   <div>

                        <FormControlLabel
                            control={<Checkbox color="primary" 
                            checked={sessions} 
                            onChange={handleChange} 
                            name="sessions" />}
                            label="Sessões"
                        />

                        {sessions ? <div className="pl-4">

                            <FormControl component="fieldset">

                                <RadioGroup 
                                    aria-label="variaveis" 
                                    name="session_results" 
                                    value={radioSelected} 
                                    onChange={handleChangeCheck}>

                                        {scoreTypesSession.map(element =>
                                            <FormControlLabel 
                                                key={element.id}
                                                value={element.id+""}
                                                control={<Radio color="primary"/>} 
                                                label={element.name} 
                                        />
                                            )}

                                </RadioGroup>

                            </FormControl>
                            

                        </div>:null}

                    </div>

    
                    <div className="pt-4">

                        <FormControlLabel
                            control={<Checkbox 
                            color="primary" 
                            checked={activities} 
                            onChange={handleChange} 
                            name="activities" />}
                            label="Actividades"
                        />

                        {activities ? 

                        <div className="pl-4">

                            <FormControl component="fieldset">

                                <RadioGroup 
                                    aria-label="variaveis" 
                                    name="session_results" 
                                    value={radioSelected} 
                                    onChange={handleChangeCheck}>

                                    {scoreTypesGames.map(element =>
                                        <FormControlLabel 
                                            key={element.id}
                                            value={element.id+""}
                                            control={<Radio color="primary"/>} 
                                            label={element.name} 
                                        />
                                    )}

                                </RadioGroup>

                            </FormControl>
                            
                        </div>:null}

                    </div>
                    

                </FormGroup>   

                
            </FormControl>

            
        </div>
    )
}
