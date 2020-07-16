import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { tokenHeader } from '../../Config/configToken'
import baseUrl from '../../Config/config'



export default function DialogSessionInfo({session}) {
    const [open, setOpen] = React.useState(false);
    const [sessionData, setSessionData] = React.useState(session);
    const [edited, setEdited] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleNotes = (e) =>{
        setSessionData({...sessionData, notes:e.target.value});
        
    }

     const handleSubmit = (e) =>{

        e.preventDefault();
    

        fetch(`${baseUrl}session`, {
            method: 'PUT',
            body: JSON.stringify(sessionData),
            headers:tokenHeader(),
        })
        .then(res => res.json())
        .then((data) => {
            console.log('API success: ',data);
            handleClose();
        })
        .catch(err => {
          console.log(err);
            return err;
        });



    }

 

  if(sessionData){


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <form onSubmit={handleSubmit}>
        <DialogTitle id="alert-dialog-title" className="text-brant-color">{"Detalhes da sessão: " + sessionData.date}</DialogTitle>
        <DialogContent>
            <div className="container">
                <div className="row pb-4">
                    <div className="col-md-12">
                        <b>{sessionData.isDone == 1 ? "Estado: Feito" : "Estado: Pendente"}</b>

                    </div>
              </div>
              <div className="row">
                    <div className="col-md-12">
                        <h6>Notas</h6>
                        
                            <textarea className="form-control form-control-sm border-brant-color w-100" rows="8" value={sessionData.notes} onChange={handleNotes}  placeholder={"Inserir notas"}></textarea>

                        

                    </div>
              </div>

          </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
else return <div></div>
}