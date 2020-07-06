import React,{useState, useEffect} from 'react'
import Title from '../Others/Title'
import MaterialTable from 'material-table'
import baseUrl from '../../Config/config'
import DialogBrant from '../Others/DialogBrant'



export default function PatientAssessments(props) {

    const [patient, setPatient] = useState({id:props.match.params.id, name:props.match.params.name});
    const [assessments,setAssessments] = useState(null);
    const [open, setOpen] = useState(false);
    const [assessmentSelected, setAssessmentSelected] = useState(null);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}patients/${patient.id}/assessments`,{ signal: signal })
        .then(res => res.json())
        .then((data) => {
            
            setAssessments(data);
            setAssessmentSelected(data[0])
  
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

    if(assessments != null && assessmentSelected !=null){

        return (
            <div className="p-2">
                <Title sectionTitle={"Avaliações: " + patient.name}/>

                <div>
                <MaterialTable
            columns={[
                { title: 'ID', field: 'id'},
                { title: 'Data', field: 'date'},
                { title: 'Profisional de saúde', field: 'user.name'},
                { title: 'Ferramenta de avaliação', field: 'assessment_tool.name'}
        ]}
        data={assessments}
            onRowClick={((evt, selectedRow) => {setOpen(true);console.log(selectedRow)})}
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
                <DialogBrant open={open} handleClose={handleClose} date={assessmentSelected.date} assessment={assessmentSelected} />
            </div>

            
        )
    }
    else
        return <div>Loading..</div>
    

}
