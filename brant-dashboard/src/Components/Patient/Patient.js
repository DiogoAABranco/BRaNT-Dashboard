import React,{Component, useState} from 'react'
import SocioDemoInfo from './SocioDemoInfo'
import CognitiveProfile from './CognitiveProfile'
import ClinicalInfo from './ClinicalInfo'


class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {  
                clinicalInfo:[
                    {id:"0", description:"Nova descrição de procedimento1", date:"05/04/2020", type:"clinicalProcedure", patology:"1"},
                    {id:"1", description:"Nova descrição de procedimento2", date:"09/11/2019", type:"clinicalProcedure",patology:"2"}],
                medication:[
                    {id:"0", description:"Nova descrição de medicação", date:"09/11/2019", type:"medication",patology:"4"},
                    {id:"1", description:"Nova descrição de medicaçã2", date:"12/11/2019", type:"medication",patology:"5"}]
            },
            description:"",
            selectedValue: "",
            dateInfo:"",
            patologyList:[
                {id:"0",patology:"Hipertensão"},
                {id:"1",patology:"Diabetes"},
                {id:"2",patology:"AVC"},
                {id:"3",patology:"Demência"},
                {id:"4",patology:"Parkinson"},
                {id:"5",patology:"Alzheimer"},
                {id:"6",patology:"Outros"}
            ],
            getPatology(id){
                //console.log(this.patologyList[id].patology);
                return <b>{this.patologyList[id].patology}</b>
                
            }
        };
        
      }

      handleNewClinicalInfo = (description,selectedValue,dateInfo,patology) =>{
         
          const tempData = this.state.data;
          if(selectedValue === 0){
            const lastId = tempData.clinicalInfo.length; 
            const newEntry = {id:lastId,description:description,selectedValue:selectedValue,dateInfo:dateInfo,patology:patology}
            tempData.clinicalInfo.push(newEntry);
          }else {
            const lastId = tempData.medication.length; 
            const newEntry = {id:lastId,description:description,selectedValue:selectedValue,dateInfo:dateInfo,patology:patology}
            tempData.medication.push(newEntry);
          }
          this.setState({data:tempData });
          console.log(this.state.data);
      }
     
   render(){
    return <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-sm-6">
                    <SocioDemoInfo/>
                </div>
                <div className="col-sm-6">
                    <CognitiveProfile/>
                </div>    
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <ClinicalInfo handleNewClinicalInfo={this.handleNewClinicalInfo} state={this.state} />
                </div>
            </div>

        </div>
   }
            
       
       
}      
export default Patient