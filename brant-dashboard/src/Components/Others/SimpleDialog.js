import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom'
/*props of this component:
    title
    information 
*/

export default function SimpleDialog({title,information,link}) {
    
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{information}</DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button color="primary">
                <Link to={link}>OK</Link>
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
