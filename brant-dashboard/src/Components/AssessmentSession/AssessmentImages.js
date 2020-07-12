import React, { useEffect } from "react";
import baseUrl from "../../Config/config";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AssessmentImages(props) {
  const [images, setImages] = React.useState([]);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll="paper"
        fullWidth={true}
        maxWidth="xl"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Anexos</DialogTitle>
        <DialogContent>
          <div className="container">
            {props.images.length > 0 ?
            
                  props.images.map((image,index) => 
                    <div key={index} className="row p-4">

                      <img className="w-100" src={`http://localhost:8000/storage/${image.path}`}></img>

                    </div>)

            :<div>Sem anexos para mostrar</div>} 

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
