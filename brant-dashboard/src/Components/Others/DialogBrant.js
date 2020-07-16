import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BarChart from './BarChart';

function DialogBrant(props){
   
    const dataConvertToChart = () => {

        let data = [];

        props.assessment.results.forEach(( element,index ) => {

            let domainName = "";
            let maxValue = "";

            props.assessment.assessment_tool.modules.forEach(module => {

                module.submodules.forEach(submodule =>{
                    
                    if(submodule.id === element.submodule_id){
                        domainName = submodule.name;
                        maxValue = submodule.max_value; 
                    }
                })
            });

            let temp = { domain:domainName,value: parseInt(element.value),maxValue:maxValue}
            data.push(temp);
        });

        console.log(data);

        return data;
    }

return <div>
    
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Data: " +props.date}</DialogTitle>

            <DialogContent>

                <BarChart data={dataConvertToChart()}/>

            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default DialogBrant