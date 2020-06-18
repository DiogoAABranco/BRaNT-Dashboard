import React from 'react'


function convertDate(inDate){
  let date =  new Date(inDate);

  return date.getDate() + '/' +date.getMonth() + '/' +date.getFullYear();
}

export default function TablePrograms(props) {
    
    let columns=["#","Paciente","Data de início","Número de sessões","Ver"];
    const programs = props.data;
    
    return (
      
      <table className="table">
      <thead>
        <tr>
          {columns.map((element,index) => <th key={index} scope="col">{element}</th>)}
        </tr>
      </thead>
      <tbody>
        {programs.length != 0?
        programs.map((item,index) => 
          
          <tr key={index}> 
            <th scope="row">{index+1}</th>
            <td>{item.patientName}</td>
            <td>{convertDate(item.startDate)}</td>
            <td>{item.nSessions}</td>
            <td><button className="btn btn-outline-brant-color">ver</button></td>
            
          </tr>
         ):<tr><th scope="row">Sem items para mostrar</th></tr>
        }
      </tbody>
    </table>
     
    )
}
