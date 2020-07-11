import React, { Component } from "react";
import baseUrl from '../../Config/config'
import Title from "../Others/Title";
import ActivitiesView from "./ActivitiesView";
import DetailsPlanView from "./DetailsPlanView";
import SimpleDialog from "../Others/SimpleDialog";
import { withRouter } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { tokenHeader } from '../../Config/configToken'

class TrainingSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientID: this.props.match.params.id,
      patientName: this.props.match.params.name,
      activities: [],
      dificulty: 0,
      startDate: new Date(),
      nSessions: 0,
      daysOfTheWeek: [],
      daysSelectBox: [
        { id: 0, value: "Domingo", isChecked: false },
        { id: 1, value: "Segunda-feira", isChecked: false },
        { id: 2, value: "Terça-feira", isChecked: false },
        { id: 3, value: "Quarta-feira", isChecked: false },
        { id: 4, value: "Quinta-feira", isChecked: false },
        { id: 5, value: "Sexta-feira", isChecked: false },
        { id: 6, value: "Sábado", isChecked: false },
      ],
      programComplete: false,
      errorCreatingProgram: false,
    };
    //necessary bind to get context of "this.setState"
    this.onClickRemoveActivity = this.onClickRemoveActivity.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangenSessions = this.handleChangenSessions.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }

  abortController = new AbortController();

  handleApiCall() {
    //recommended activities for the user
    fetch(
      `${baseUrl}patients/${this.state.patientID}/recommended-games`,{headers:tokenHeader()},
      { signal: this.abortController.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ activities: data });
      });
    return () => this.abortController.abort();
  }

  componentDidMount() {
    this.handleApiCall();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleSubmit = () => {
    if (this.state.daysOfTheWeek.length == 0) return alert("Definir dia/s das sessões");

    if (this.state.nSessions == 0) return alert("Definir número de sessões");

    let data = {
      patient_id: this.state.patientID,
      user_id: 1,
      games: this.state.activities,
      start_date: this.state.startDate.toISOString().toString().split('T')[0],
      n_sessions: this.state.nSessions,
      days_of_the_week: this.state.daysOfTheWeek,
  
    };
    console.log(data);

    fetch(`${baseUrl}training-program`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:tokenHeader(),
        }).then(res => {
            return res;
        })
        .then(res => res.json())
        .then((data) => {
            console.log('API success: ',data);
            this.props.history.push('/programs');
        })
        .catch(err => {
          console.log(err);
            return err;
        });

    // //this.props.history.push('/programs');
    // // console.log(trainingPlan);
  };
  handleChangeStartDate = (date) => {
    this.setState({ startDate: date });
  };
  handleChangenSessions = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ nSessions: value });
  };

  //remove activity from the recommended list
  onClickRemoveActivity(e, activity) {
    let temp = this.state.activities.filter((item) => item !== activity);
    this.setState({ activities: temp });
  }
  handleSliderChange = (event, newValue) => {
    this.setState({ dificulty: newValue });
  };
  handleChangeCheckBox = (e) => {
    let days = this.state.daysSelectBox;
    let daysOfTheWeek = [];

    days.forEach((day) => {
      if (day.id == e.target.value) day.isChecked = e.target.checked;

      if (day.isChecked) daysOfTheWeek.push(day.id);
    });
    this.setState({ daysSelectBox: days });
    this.setState({ daysOfTheWeek: daysOfTheWeek });
  };

  render() {
    if (this.state.activities.length !== 0)
      return (
        <div>
          {this.state.programComplete ? (
            <SimpleDialog
              title="Informação"
              information={
                "Programa de treino criado para o paciente: " +
                this.state.patientName
              }
              link="/programs"
            />
          ) : (
            <div>
              <Breadcrumbs aria-label="breadcrumb">
                <NavLink className="text-brant-color" to="/patients">
                    Utentes
                </NavLink>
                <Typography color="textPrimary">Novo plano de treino</Typography>
            </Breadcrumbs>
            <div className="pt-2">
            <Title 
                sectionTitle={"Plano de treino - " + this.state.patientName}
              />
            </div>
              
              <ActivitiesView
                state={this.state}
                onClickRemoveActivity={this.onClickRemoveActivity}
              />

              <DetailsPlanView
                startDate={this.state.startDate}
                daysSelectBox={this.state.daysSelectBox}
                handleChangeStartDate={this.handleChangeStartDate}
                handleChangenSessions={this.handleChangenSessions}
                handleChangeCheckBox={this.handleChangeCheckBox}
              />

              <div className="row justify-content-md-center m-0">
                <button
                  className="btn btn-brant-color"
                  onClick={this.handleSubmit}
                >
                  Submeter treino
                </button>
              </div>
            </div>
          )}
          {this.state.errorCreatingProgram ? (
            <SimpleDialog
              title="Informação"
              information={
                "Não foi possível criar o programa de treino para: " +
                this.state.patientName
              }
            />
          ) : null}
        </div>
      );
    else return <div></div>;
  }
}
export default withRouter(TrainingSession);
