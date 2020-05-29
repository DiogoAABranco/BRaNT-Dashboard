import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BarChart from './BarChart';

function DialogBrant(props){
   

return <div>
    
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Avaliação do paciente XXXXXXXX</DialogTitle>

            <DialogContent>

                <BarChart data={props.data.cognitiveDomain}/>

            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default DialogBrant