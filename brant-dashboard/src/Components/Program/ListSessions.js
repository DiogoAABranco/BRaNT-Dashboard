import React from 'react';
import DialogEditByStep from './DialogEditByStep'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom'

function convertDate(inDate){
  let date =  new Date(inDate);

  return date.getDate() + '/' +date.getMonth() + '/' +date.getFullYear();
}

function convertState(inState){
  if (inState == true) return "Feito";
  else return "Por fazer";
}
function handleDeleteSession(e){
  console.log(e);
}

export default function ListSessions(props) {
 
    let columns=["Sessão","Data","Estado","Editar","Eliminar", "Resultados"];
    console.log("data:",props);
    return (
      <table className="table">
      <thead>
        <tr>
          {columns.map((element,index) => <th key={index} scope="col">{element}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.data.length != 0?
        props.data.map((item,index) => 
          
          <tr key={index}> 
            <th scope="row">{item.id + 1}</th>
            <td>{convertDate(item.date)}</td>
            <td>{convertState(item.isDone)}</td>
            <td><DialogEditByStep session={item.id +1} data={item.activities}/></td>
            <td><button className="btn btn-outline-brant-color" onClick={e => props.onClickRemoveSession(e,item)}><DeleteIcon/></button></td>
            <td>ver</td>
            
          </tr>
         ):<tr><th scope="row">Sem items para mostrar</th></tr>
        }
      </tbody>
    </table>
         
         
         
    );
  }

