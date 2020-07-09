import React,{useEffect} from 'react'
import baseUrl from '../../Config/config'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AssessmentImages(props) {

    const [open, setOpen] = React.useState(false);
    const [images,setImages] = React.useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} scroll='paper' fullWidth={true}
        maxWidth="xl" aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Anexos</DialogTitle>
          <DialogContent>
     
    <div className="container">
        <div className="row p-4">
        {props.images.length != 0 ?<img src={`${baseUrl}images/${props.images[0].id}`}></img>:null}
        </div>
<div className="row p-4">
{props.images.length > 0 ?<img src={`${baseUrl}images/${props.images[1].id}`}></img>:null}

</div>

    </div>
          
            


       
      




           
        


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
