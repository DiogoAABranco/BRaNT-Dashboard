import React,{useState} from 'react'
import MaterialTable from 'material-table'
import Title from '../Others/Title'
import SelectBox from '../Others/SelectBox'
import Test from './Test'
import FileUploader from './FileUploader'

const assessments = [{id:0,name:"moca",evaluation:"75",date:"21/04/2020",
cognitiveDomain:[{domain: "Memória", value: 100},
        {domain: "Atenção", value: 90},
        {domain: "Linguagem", value: 32},
        {domain: "Nomeação", value: 54},
        {domain: "Visuo-espacial", value: 23},
        {domain: "Orientação", value: 45},
        {domain: "Evocação diferida", value: 90},
        {domain: "Abstração", value: 93}]},

        {id:2,name:"moca",evaluation:"63",date:"21/04/2020",
cognitiveDomain:[{domain: "Memória", value: 100},
        {domain: "Atenção", value: 90},
        {domain: "Linguagem", value: 32},
        {domain: "Nomeação", value: 54},
        {domain: "Visuo-espacial", value: 23},
        {domain: "Orientação", value: 45},
        {domain: "Evocação diferida", value: 90},
        {domain: "Abstração", value: 93}]}
    ];
    let novoTesteMoca = [
        {id:0, domain: "Memória", value: 0},
        {id:1, domain: "Atenção", value: 0},
        {id:2, domain: "Linguagem", value: 0},
        {id:3, domain: "Nomeação", value: 0},
        {id:4, domain: "Visuo-espacial", value: 0},
        {id:5, domain: "Orientação", value: 0},
        {id:6, domain: "Evocação diferida", value: 0},
        {id:7, domain: "Abstração", value: 0}]

    
function Assessment(props){

    novoTesteMoca.map(temp =>(temp.value=0));
    /*select evaluation test*/ 
    const [selectedTest_val, setSelectedTest_val] = useState('');
        
    const newEntry = () =>{
       let newEntry = {id:assessments.length,name:"moca",evaluation:"45",date:"21/04/2020", cognitiveDomain:novoTesteMoca};
       assessments.push(newEntry);
       console.log(assessments);
      
    }

    let tests = [{id:0, data:novoTesteMoca, name:"MOCA"}]
       
    /*handler select test*/
    const handlerSelectTest = event => {
        setSelectedTest_val(event.target.value);    
        //displayTest(event.target.value);
    };
    
    
    return <div>     
        <div className="p-4">
            <div className="w-100">
                <MaterialTable
                   
                    options={{
                        search: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: '#752938',
                            color:"white"
                      },
                      }}
                    columns={[
                        { title: 'Nome', field: 'name' },
                        { title: 'Avaliação', field: 'evaluation'},
                        { title: 'Data', field: 'date'}
                    ]}
                    data={assessments}
                    title="Avaliações {props.nomeDoPaciente}"
                />
            </div>
        </div>
        <div className="newEntry p-4">
            <div className="">
                <div className="row">
                    <div className="col-sm-10">
                        <Title sectionTitle="Inserir nova avaliação"></Title>
                    </div>
                    <div className="col-sm-2 pb-6">
                        <SelectBox handlerSelect={handlerSelectTest} selected_val={selectedTest_val} values={tests} label="Selecionar Teste"></SelectBox>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        <div className="col-sm-6">
                            <Test data={novoTesteMoca}></Test>
                        </div>
                        <div className="col-sm-6">
                            <FileUploader/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-1">
                    <button type="submite" onClick={newEntry} className="btn btn-brant-color m-2 w-50">Adicionar Teste</button>
                </div>
            </div>
        </div>
    </div>
}
export default Assessment

