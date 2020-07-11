import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function DialogAddActivity({games}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelected({ ...selected, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <button className="btn btn-brant-color" onClick={handleClickOpen}>
        <AddIcon />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          
          <div className="container">
                {games.map(game => 
                    <div key={game.id} className="row">
                        <FormControlLabel
                            control={<Checkbox color="primary" name={game.id+""} onChange={handleChange} />}
                            label={game.name}
                        />
                    </div>
                )}
          </div>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Adicionar Actividades
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}