import React from 'react'
//received the parameters of an activity
function EditParameters(props) {
    return (
        <div>
            {props.data.map(temp =><div key={temp.key} className="row"><TextField required id="standard-basic" label={temp.key} defaultValue={temp.value} /></div>)}
        </div>
    )
}

export default EditParameters
