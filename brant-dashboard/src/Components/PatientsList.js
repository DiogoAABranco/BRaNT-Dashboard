import React, { Component } from 'react'
import baseUrl from '../Config/config'
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Subtitle from './Others/Subtitle';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom';
import { tokenHeader } from '../Config/configToken'



class PatientsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchName:"",
            valueRangeSlider:[0, 100],
            usersTable:[],
  
        }
    }
    abortController = new AbortController();

    componentDidMount() {
        
        fetch(`${baseUrl}patients`,{headers:tokenHeader()},{signal: this.abortController.signal })
        .then(res => res.json())
        .then((data) => {
            
            this.setState({ users: data })
            console.log('patientsAPI',this.state.users);
            this.prepareTable();
        })
        .catch(console.log)
    }
    componentWillUnmount(){
        this.abortController.abort();
    }

    //event handler for search box
    searchSpace = (event)=>{
        let keyword = event.target.value;
        this.setState({searchName:keyword});
    }
    setValueRangeSlider=(event)=>{
        let range = event.target.value;
        this.setState({valueRangeSlider:range});
    }

    valuetext(value) {
        return `${value}`;
      }
    handleChangeSlider = (event, newValue) => {
        this.setState({valueRangeSlider:newValue});
        
      };
  
    getAge = (birthDate) =>{
        var birthdate = new Date(birthDate);
        var cur = new Date();
        var diff = cur-birthdate;
        var age = Math.floor(diff/31536000000);
        return age;
    }
    prepareTable = () =>{
        let temp=[];
        this.state.users.forEach(user =>{
            let id = user.id;
            let age = this.getAge(user.sociodemographic_data.date_of_birth);
            let name = user.name;
            let address = user.address;
            let data = {id, name, address, age}
            temp.push(data);
        });
        this.setState({usersTable:temp});
    }
    render(){
        //apply fliter to users array
        let usersFilterByName = this.state.usersTable.filter((temp) =>
            {
                if(this.state.searchName == null)
                    return temp;
                else if (temp.name.toLowerCase().includes(this.state.searchName.toLowerCase()))
                    return temp;    
            } );
        
        let users = usersFilterByName.filter(user => (user.age >=this.state.valueRangeSlider[0]) && (user.age <= this.state.valueRangeSlider[1]));
        
        return <div className="container-fluid mt-2">
        
            <div className="accordion ml-3 mr-3" id="accordionExample">
                <div className="card">
                    <div className="card-header d-flex justify-content-between" id="headingOne">
                        <Subtitle sectionTitle="Lista de utentes"/>
                        <Link to="/create-patient"><button className="btn btn-brant-color">Novo Utente</button></Link>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="pl-4 pr-4 pt-2">
                                        <label className="text-brant-color">Nome</label>
                                        <input type="name" onChange={(e)=>this.searchSpace(e)} className="form-control" id="inputName" placeholder="Enter name"/>
                                    </div>
                                    
                                </div>
                                <div className="col-sm-6">
                                   
                                    <div className="pl-4 pr-4 pt-4">
                                        <label className="text-brant-color">Idade</label>
                                        <div className="w-50 mt-4">
                                        <Slider
                                            value={this.state.valueRangeSlider}
                                            onChange={this.handleChangeSlider}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={this.valuetext}
                                            valueLabelDisplay="on"
                                            
                                            /> 
                                        </div>
                                                                 
                                    </div>

                                </div>
                            </div>
                            
                        <div>
                        <MaterialTable
                            options={{
                                search: false,
                                paging: true,
                                showTitle:false,
                                header:true,
                                headerStyle:{
                                    "fontWeight": 900,
                                        "fontSize": 16,
                                    color:"rgb(78, 36, 50)"
                                }
                            }}
                            columns={[
                                { title: 'ID', field: 'id'},
                                { title: 'Nome', field: 'name'},
                                { title: 'Morada', field: 'address'},
                                { title: 'Idade', field: 'age'}
                        ]}
                        data={users}
                            onRowClick={((evt, selectedRow) => this.props.history.push(`patients/patient-information/${selectedRow.id}/0`))}
                        localization={{
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
                    </div>
                </div>
            </div> 
        </div>
    }
}
export default PatientsList