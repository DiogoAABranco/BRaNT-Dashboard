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
import Chip from '@material-ui/core/Chip';




export default function DialogAddActivity({ games, addNewActivities }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [activitiesID, setActivitiesID] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAgree = () => {

    setOpen(false);

    let activities = [];

    Object.keys(selected).forEach(function(key,index) {
        console.log(key);
        if(selected[key] === true){
            activities.push(key);
        }
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
    });
    addNewActivities(activities);
    
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
        <DialogTitle id="alert-dialog-title" className="text-brant-color">Actividades</DialogTitle>
        <DialogContent>
          
          <div className="container">
                {games.map(game => 
                    <div key={game.id} className="row bg-light-games mb-4">
                      <div className="col-md-12">
                        <FormControlLabel
                            control={<Checkbox color="primary" name={game.id+""} onChange={handleChange} />}
                            label={game.name + " - " + game.description}
                        />
                      </div>
                        
                        <div className="row pb-4 pl-5">
                          { game.profileByDomain.map( domain =>

                          <span key={ domain.id} className="mr-2">

                              <Chip  size="small" color="primary" label={domain.name} />

                          </span>


                          )}
                        </div>
                        
                    </div>
                )}
          </div>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseAgree} color="primary" autoFocus>
            Adicionar Actividades
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}