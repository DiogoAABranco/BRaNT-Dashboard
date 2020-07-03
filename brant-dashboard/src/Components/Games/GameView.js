import React, {useState,useEffect} from 'react'
import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import Chip from '@material-ui/core/Chip';

export default function GameView() {

    const [ games, setGames ] = useState(null);

    useEffect(() => {

        const abortController = new AbortController();

        const signal = abortController.signal;

        fetch( `${baseUrl}games`,{ signal: signal })

        .then(res => res.json())

        .then((data) => {
            
            setGames(data);

            console.log(data);
            

        })
        .catch(console.log);
  
        return () => abortController.abort(); 
    },[]);

    return (
        <div className="container-fluid">

            <div className="row p-0">

                <Title sectionTitle="Lista de atividades"/>

            </div>

            <div className="row p-0">
                
                { games != null ? games.map(game => 

                    <div key={game.id} className="col-md-4 py-4">

                        <div className="card">

                            <div className="card-body">

                                <h5 className="card-title text-brant-color">{ game.name }</h5>

                                <p className="card-text">{ game.description }</p>

                                { game.profileByDomain.map( domain =>

                                    <span key={ domain.id} className="mr-2">

                                        <Chip  size="small" color="primary" label={domain.name} />

                                    </span>
                                    

                                )}

                            </div>

                        </div>
                        
                    </div>

            ):null}

        </div>
            
    </div>
    )
}
