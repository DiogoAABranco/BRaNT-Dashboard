import React from "react";
import SubTitle from "../Others/Subtitle";

export default function ActivitiesNextSession({ session }) {

  console.log(session);

  return (
<div className="mt-4">
    <SubTitle sectionTitle="Actividades"/>

    <div className="row p-2 mt-2">

      {session.games.map((game, index) => 

        <div key={game.id} className="col-md-3">

            <div className="card mt-2">

                <div className="card-header text-brant-color">
                    <b>{game.name}</b>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Descrição</h5>
                    <p className="card-text">{game.description}</p>
                </div>

            </div>

        </div>

      )}
    </div>

</div>
  );


}
