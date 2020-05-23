import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import VerticalLinearStepper from './VerticalLinearStepper'
import Title from '../Others/Title'

//props contains list of activities
const DialogEditByStep =(props)=>{

    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () =>{

    }
    const handlePrev = () =>{

    }

    return  (<div>
    <button className="btn btn-outline-brant-color" onClick={handleClickOpen}>
      <EditIcon/> Editar Parâmetros
    </button>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth={true}
      onClose={handleClose}
      maxWidth="sm"
      aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title"><Title sectionTitle="Editar parâmetros das atividades"/></DialogTitle>
        <DialogContent>

            <VerticalLinearStepper activities={props.data}/>
           
        {/* {props.data.map(temp =><div key={temp.id} className="row"><li>{temp.activityName}</li></div>)} */}
           
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
export default DialogEditByStep
