import React from 'react'
import DialogEditParameters from "./DialogEditParameters"
import AddIcon from '@material-ui/icons/Add';
import DialogEditByStep from './DialogEditByStep'
import ActivityBoxShape from './ActivityBoxShape'
import ClearIcon from '@material-ui/icons/Clear';
import Subtitle from '../Others/Subtitle';



const ActivitiesView =(props)=>{

    return (
        <div className="card ">

        <div className="card-header d-flex justify-content-between p-1">
          <Subtitle sectionTitle="Atividades recomendadas" />

          <div className="row p-0 m-0">

            <button className="btn btn-brant-color mr-2">
              <AddIcon />
            </button>

            {/* <DialogEditByStep data={props.state.activities}/> */}
          </div>

        </div>


        <div className="card-body">

          <div className="row">

            {props.state.activities.map((temp) => (
              <div key={temp.id} className="col-sm-2">

                <ActivityBoxShape data={temp} />

                <div className="row justify-content-md-center">

                  {temp.game_variable_type !== undefined ? (
                    <div className="mr-2">

                      <DialogEditParameters
                        activityName={temp.name}
                        game_variable_type={temp.game_variable_type}
                      />

                    </div>
                  ) : null}

                  <button
                    onClick={(e) => props.onClickRemoveActivity(e, temp)}
                    className="btn btn-brant-color ml-2"
                  >
                    <ClearIcon />
                  </button>

                </div>

              </div>

            ))}
          </div>

        </div>
        
      </div>
    );
}
export default ActivitiesView;