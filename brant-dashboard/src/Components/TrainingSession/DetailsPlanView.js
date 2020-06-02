import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Subtitle from '../Others/Subtitle';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

export default function DetailsPlanView(props) {
    return (
        <div className="container-fluid card mb-2 mt-4 mr-0 p-0">
            <div className="row m-0 align-items-center">   
                <div className="col-sm-4 text-center">
                    <Subtitle sectionTitle="Introduzir data de início do plano"/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Data de início"
                        value={props.startDate}
                        onChange={props.handleChangeStartDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        </MuiPickersUtilsProvider>                             
                </div>
                <div className="col-sm-4 text-center">
                    <Subtitle sectionTitle="Número de sessões"/>
                    <TextField id="standard-basic" label="" type="number" onChange={props.handleChangenSessions}/>    
                </div>
                <div className="col-sm-4">
                    <div className="row justify-content-md-center"><Subtitle sectionTitle="Dias das sessões"/></div>
                    <div className="row justify-content-md-center">
                    {props.daysSelectBox.map((temp) =>
                        <div className="col-sm-6" key={temp.id}>
                            <FormControlLabel
                            value={temp.id}
                            control={<Checkbox color="primary" />}
                            label={temp.value}
                            labelPlacement="end"
                            onChange={props.handleChangeCheckBox}
                        />
                        </div>)} 
                    </div>
                </div>
            </div>
        </div>
    )
}
