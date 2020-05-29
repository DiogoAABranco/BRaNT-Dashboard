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
                    {id:"0", description:"Nova descrição de procedimento1", date:"05/04/2020", type:"clinicalProcedure", patology:"Patologia 1"},
                    {id:"1", description:"Nova descrição de procedimento2", date:"09/11/2019", type:"clinicalProcedure",patology:"Patologia 2"},
                    {id:"2", description:"Nova descrição de medicação", date:"09/11/2019", type:"medication",patology:"Patologia 4"},
                    {id:"3", description:"Nova descrição de medicaçã2", date:"12/11/2019", type:"medication",patology:"Patologia 5"}]         
            },
            description:"",
            selectedValue: "",
            dateInfo:"",
            patologyList:[
                {id:"0",patology:"Patologia 1"},
                {id:"1",patology:"Patologia 2"},
                {id:"2",patology:"Patologia 3"},
                {id:"3",patology:"Patologia 4"},
                {id:"4",patology:"Patologia 5"},
                {id:"5",patology:"Patologia 6"},
                {id:"6",patology:"Patologia 7"}
            ],
            getPatology(id){
                //console.log(this.patologyList[id].patology);
                return this.patologyList[id].patology;
                
            }
        };
        
      }

    handleNewClinicalInfo = (description,selectedValue,dateInfo,patology) =>{
        
        const tempData = this.state.data;
    
        const lastId = tempData.clinicalInfo.length; 
        const newEntry = {id:lastId,description:description,type:selectedValue,dateInfo:dateInfo,patology:patology}
        tempData.clinicalInfo.push(newEntry);
        
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