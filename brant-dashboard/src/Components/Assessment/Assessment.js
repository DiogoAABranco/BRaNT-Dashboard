import React,{useState, Component} from 'react'
import MaterialTable from 'material-table'
import Title from '../Others/Title'
import SelectBox from '../Others/SelectBox'
import Test from './Test'
import DialogBrant from '../Others/DialogBrant'
  
        
class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assessments:[
                {id:0,name:"Moca",evaluation:"75",date:"21/04/2020",
                    cognitiveDomain:[
                        {domain: "Memória", value: 100},
                        {domain: "Atenção", value: 90},
                        {domain: "Linguagem", value: 32},
                        {domain: "Nomeação", value: 54},
                        {domain: "Visuo-espacial", value: 23},
                        {domain: "Orientação", value: 45},
                        {domain: "Evocação diferida", value: 90},
                        {domain: "Abstração", value: 93}]
                },
        
                {id:1,name:"Moca",evaluation:"63",date:"21/04/2020", 
                    cognitiveDomain:[
                    {domain: "Memória", value: 100},
                    {domain: "Atenção", value: 90},
                    {domain: "Linguagem", value: 32},
                    {domain: "Nomeação", value: 54},
                    {domain: "Visuo-espacial", value: 23},
                    {domain: "Orientação", value: 45},
                    {domain: "Evocação diferida", value: 90},
                    {domain: "Abstração", value: 2}]
                }
            ],
            novoTesteMoca:[
                {id:0, domain: "Memória", value: 0,subdomains:[{id:0,subdomain:"sub0", value:0},{id:1,subdomain:"sub1", value:0}]},
                {id:1, domain: "Atenção", value: 0},
                {id:2, domain: "Linguagem", value: 0},
                {id:3, domain: "Nomeação", value: 0},
                {id:4, domain: "Visuo-espacial", value: 0},
                {id:5, domain: "Orientação", value: 0},
                {id:6, domain: "Evocação diferida", value: 0},
                {id:7, domain: "Abstração", value: 0}],
            
            selectedTest_val:"",

            setSelectedTest_val(val){
                this.selectedTest_val = val;
            },

            elementSelectedTable:"",

            open:false,

            tests:[{id:0, data:this.novoTesteMoca, name:"MOCA"},
                {id:1, data:this.novoTesteMoca, name:"ACE-R"}]
        };
    }
    render(){ 

    /*Dialog handlers */
    const setOpen = (val)=>{
        this.setState({open:val});
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    
    };
    /*handler select test*/
    const handlerSelectTest = event => {

        this.setState({selectedTest_val:event.target.value});    
        this.state.novoTesteMoca.map(temp => temp.value = 0);
  
    };
    
    const newEntry = () =>{

        let tempDataTest = this.state.novoTesteMoca;

        let tempData = this.state.assessments;

        let newEntry = {id:this.state.assessments.length, name:"Moca", evaluation:"45", date:new Date(Date.now()).toLocaleString().split(',')[0], cognitiveDomain:tempDataTest};
        
        tempData.push(newEntry);

        this.setState({assessments:tempData});

        console.log(this.state.assessments);
        
        this.setState({selectedTest_val:""});  

        }

    const onClickTest = (id)=>{
        //open dialog and show test


    }

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
                        actionsColumnIndex:-1
                      }}
                    columns={[
                        { title: 'Ferramenta de avaliação', field: 'name' },
                        { title: 'Avaliação', field: 'evaluation'},
                        { title: 'Data', field: 'date'}
                    ]}
                    data={this.state.assessments}
                    title="Avaliações {props.nomeDoPaciente}"
                    actions={[
                        {
                          icon: 'post_add',
                          tooltip: 'Ver avaliação',
                          title:'Detalhes',
                          onClick: (event, rowData) => {
                            this.setState({elementSelectedTable:rowData});
                            handleClickOpen();
                                
                          }
                        }
                      ]}
                  
                      
                />
            </div>
        </div>
        <div className="newEntry p-4">
            <div className="row">
                <div className="col-sm-10">
                    <Title sectionTitle="Inserir nova avaliação"></Title>
                </div>
                <div className="col-sm-2 pb-6">
                    <SelectBox handlerSelect={handlerSelectTest} selected_val={this.state.selectedTest_val} values={this.state.tests} label="Selecionar Teste"></SelectBox>
                </div>
            </div>
            <div className="">
                
                {//rendering the selected test in the user interface
                (() => {
                    switch (this.state.selectedTest_val) {
                        case 0: return <Test data={this.state.novoTesteMoca} newEntry={newEntry} ></Test>
                        default: return;
                    }
                })()}
             </div>
        </div>
        
        <DialogBrant open={this.state.open} handleClose={handleClose} data={this.state.elementSelectedTable}/>
          
    </div>
    }
}
export default Assessment

