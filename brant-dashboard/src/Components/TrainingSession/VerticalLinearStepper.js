import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));



export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [gameVariables, setGameVariables] = React.useState(props.gameVariables);
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const updateField = (index2) => e => {
    console.log(index2);
    let tempData = [...gameVariables];
        tempData[index2].value = e.target.value;
        setGameVariables(tempData);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {gameVariables.map((temp,index) =>
          {if(index === 0 || temp.game_id !== gameVariables[index - 1].game_id){
            return (<Step key={temp.id}>
                <StepLabel>{temp.game.name}</StepLabel>
                <StepContent>
                        {gameVariables.map((element,index2) => <div key={element.id} className="row">
                          {element.game_id === temp.game_id ?
                            (<TextField required id="standard-basic" label={element.name} value={element.value} onChange={updateField(index2)}/>)
                            :null 
                          }
                          </div>
                          )}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Voltar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button} 
                      >
                        {activeStep === props.gameVariables.length - 1 ? 'Terminar' : 'Próximo'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>)}
            }
          
        )}
      </Stepper>
      
    </div>
  );
}