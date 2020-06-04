import React from 'react'

export default function CardProgram({title,value}) {
    return (
        <div className="card text-white bg-brant-color h-100">
            <div className="card-body  d-flex align-content-center">
                <div className="row p-0 m-0 w-100">
                    <div className="col-sm-6 d-flex align-items-center">
                        <h6 className="card-title">{title}</h6>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center justify-content-center">
                        <h3>{value}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
