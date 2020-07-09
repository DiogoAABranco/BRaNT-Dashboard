import React,{useState, useEffect} from 'react'
import Title from '../Others/Title'
import MaterialTable from 'material-table'
import baseUrl from '../../Config/config'
import DialogBrant from '../Others/DialogBrant'
import {Link} from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AssessmentImages from './AssessmentImages';



export default function PatientAssessments(props) {

    const [patient, setPatient] = useState({id:props.match.params.id, name:props.match.params.name});
    const [assessments,setAssessments] = useState(null);
    const [open, setOpen] = useState(false);
    const [assessmentSelected, setAssessmentSelected] = useState(null);

    const [goToNewAssessmentSession, setGoToNewAssessmentSession] = useState(false);


    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}patients/${patient.id}/assessments`,{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setAssessments(data);
           // setAssessmentSelected(data[0]);
            setGoToNewAssessmentSession({pathname: `/patients/patient-new-assessment/${patient.id}/${patient.name}`});
  console.log(data);
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
    },[]);

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if(assessments != null ){

        return (
            <div className="p-2">
                <div className="pb-2">
                    <Breadcrumbs aria-label="breadcrumb">
                        <NavLink className="text-brant-color" to="/patients">
                            Utentes
                        </NavLink>
                        <Typography color="textPrimary">Lista de avaliações</Typography>
                    </Breadcrumbs>
                </div>
                

                <div className="d-flex justify-content-between pb-4">
                    
                    <Title sectionTitle={"Avaliações: " + patient.name}/>
                    {goToNewAssessmentSession !== false?<Link to={goToNewAssessmentSession}><button className="btn btn-brant-color">Nova avaliação</button></Link>:null}

                </div>
                
                <div>
                <MaterialTable
            columns={[
                { title: 'ID', field: 'id'},
                { title: 'Data', field: 'date'},
                { title: 'Profisional de saúde', field: 'user.name'},
                { title: 'Ferramenta de avaliação', field: 'assessment_tool.name'},
                { title: 'Anexos', field: 'files', render: rowData => <AssessmentImages images={rowData.images}/>},
                //{ title: 'Resultados', field: 'files', render: rowData =>  {setOpen(true); setAssessmentSelected(rowData);}}
        ]}
        data={assessments}
            //onRowClick={((evt, selectedRow) => {setOpen(true); setAssessmentSelected(selectedRow);})}
        options={{
            search: false,
            sorting:true,
            paging: true,
            showTitle:false,
            header:true,
            headerStyle:{
                "fontWeight": 900,
                "fontSize": 16,
                color:"rgb(78, 36, 50)"
            }
        }}
        localization={{
            toolbar: {
            searchTooltip: 'Procurar',
            searchPlaceholder: 'Procurar'
            },
            pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
            }
            
        }}
        
        />
       
                </div>
                 {assessmentSelected != null ? <DialogBrant open={open} handleClose={handleClose} date={assessmentSelected.date} assessment={assessmentSelected} />:null}
            </div>

            
        )
    }
    else
        return <div>Loading..</div>
    

}
