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
import VerticalLinearStepper from '../TrainingSession/VerticalLinearStepper'
import Title from '../Others/Title'

const DialogEditByStep =(props)=>{

    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [gameVariables, setGameVariables] = React.useState(props.gameVariables);
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    
    const handleSave = () => {
        setOpen(false);

        let data = {gameVariables};

        fetch('http://localhost:8000/api/game-variables', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log('API success: ',data);
        })
        .catch(err => {
            //erro msg
            return err;
        });
    };

    const handleClose= () => {
        setOpen(false);
    };

    const handleNext = () =>{

    }
    const handlePrev = () =>{

    }

    return  (<div>

    <button className="btn btn-brant-color mt-2" onClick={handleClickOpen}><EditIcon/>Parâmetros das atividades</button>
 
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

            <VerticalLinearStepper gameVariables={gameVariables}/>
           
        {/* {props.data.map(temp =><div key={temp.id} className="row"><li>{temp.activityName}</li></div>)} */}
           
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleSave} color="primary" autoFocus>
                Guardar
            </Button>
        </DialogActions>
    </Dialog>
  </div>);
}
export default DialogEditByStep