import React from 'react'
import SocioDemoInfo from './SocioDemoInfo'
import CognitiveProfile from './CognitiveProfile'
import ClinicalInfo from './ClinicalInfo'


function Patient(props) {
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
                    <ClinicalInfo/>
                </div>
            </div>

        </div>
        }
export default Patient