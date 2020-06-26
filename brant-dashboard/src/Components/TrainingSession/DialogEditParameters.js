import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';


const DialogEditParameters =(props)=>{

    const [open, setOpen] = React.useState(false);
    const[gameVariablesType, setGameVariablesType]  =  useState(props.game_variable_type);
    const[copyGameVariablesType, setCopyGameVariablesType]  = useState(props.game_variable_type);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateField = index => e => {
        let tempData = [...gameVariablesType];
        tempData[index].value = e.target.value;
        setGameVariablesType(tempData);
      };

    return  (<div>
    <button className="btn btn-outline-brant-color" onClick={handleClickOpen}>
      <EditIcon/>
    </button>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">{props.activityName+" - "+"Parâmetros"}</DialogTitle>
        <DialogContent>
           
            {gameVariablesType.map((temp,index) =><div key={temp.id} className="row"><TextField required id="standard-basic" label={temp.name} name={temp.name} value={temp.value} onChange={updateField(index)} /></div>)}
           
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Fechar
            </Button>
        </DialogActions>
    </Dialog>
  </div>);
}
export default DialogEditParameters
