import React from 'react'
import MaterialTable from 'material-table'


function SocioDemoInfo({patient, education_level}){

    const setGender = (data)=> {
        if(data == 1) return "Feminino";
        if(data == 2) return "Masculino";
    }
    const setEducationLevel = (id)=>{
        let type = "null";
        education_level.forEach(element => {
            if(element.id == id) type = element.type;
        });
        return type;
    }

    const setFamilyMembers = (val)=>{
        let type ="";
        val.forEach(element => {
            if(element == val[0]) type = element.type;
            else type = type +" | " +element.type;    
        });
        return type;
    }
    
    return <div>
            <MaterialTable
            options={{
                search: false,
                paging: false,
                showTitle:false,
                header:false
            }}
            columns={[
                { title: '', field: 'name',
                    cellStyle: {
                        "fontWeight": 600,
                        "fontSize": 14,
                        color:"rgb(78, 36, 50)"
                    },
                },
                { title: '', field: 'data'}
        ]}
        data={[
            { name: 'Nome', data: patient.name },
            { name: 'Email', data: patient.email },
            { name: 'Morada', data: patient.address },
            { name: 'Data Nascimento', data: patient.sociodemographic_data.date_of_birth },
            { name: 'Sexo', data: setGender(patient.sociodemographic_data.gender)},
            { name: 'Escolaridade', data: setEducationLevel (patient.sociodemographic_data.education_level_id) },
            { name: 'Agregado Familiar', data: setFamilyMembers (patient.sociodemographic_data.family_members) }
            
        ]}
        />
    </div>
}

export default SocioDemoInfo