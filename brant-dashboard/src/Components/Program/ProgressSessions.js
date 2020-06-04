import React from 'react'

export default function ProgressSessions({value}) {
    return (
        <div className="card text-white bg-brant-color h-100 d-flex align-content-center p-2">
            <div className="row p-2 m-0 d-flex justify-content-center">
                <div className="">
                    <h6 className="card-title">{"Progresso: "+value+"%"} </h6>          
                </div>
            </div>
            <div className="progress"> 
                <div className="progress-bar" role="progressbar" style={{width: value+"%",background:"#907d83" }} aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    )
}
