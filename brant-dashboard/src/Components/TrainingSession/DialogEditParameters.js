import React from 'react';
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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
           
            {props.data.map(temp =><div key={temp.id} className="row"><TextField required id="standard-basic" label={temp.name} defaultValue={5} /></div>)}
           
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Guardar
            </Button>
        </DialogActions>
    </Dialog>
  </div>);
}
export default DialogEditParameters
