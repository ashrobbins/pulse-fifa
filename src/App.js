import './styles/App.css';

import { db } from './js/common/firebase';
import { onValue, ref } from 'firebase/database';

import { Fragment, useEffect, useState } from 'react';
import { LeagueTable } from './js/components/league-table';
import { AddResult } from './js/components/add-result';
import { Result } from './js/components/result';

function App() {

    const [ players, setPlayers ] = useState( [] );
    const [ results, setResults ] = useState( [] );

    useEffect( () => {
        let playersData = [];

        const playersQuery = ref( db, '/players' );
        return onValue( playersQuery, ( snapshot ) => {
            snapshot.forEach( player => {
                const playerData = player.val();

                if ( playerData ) {
                    playersData.push( playerData );
                }
            });

            setPlayers( playersData );
        });
    } );

    useEffect( () => {
        let results = [];

        const resultsQuery = ref( db, '/results' );
        return onValue( resultsQuery, ( snapshot ) => {
            snapshot.forEach( result => {
                const resultData = {
                    key: result.key,
                    ...result.val()
                };

                if ( resultData ) {
                    results.push( resultData );
                }
            });

            setResults( results );
        } );
    } );

    return (
        <Fragment>
            <header className='site-header'>
                <h1>FIFA League</h1>
            </header>
            <div className='App'>
                <LeagueTable players={ players } results={ results } />

                <div className='results'>
                    <AddResult players={ players } />

                    <ul className='results__list'>
                        { results.length > 0 && players.length > 0 ? (
                            results.map( ( result, index ) => {
                                return <Result key={ `result_${ index }` } match={ result } players={ players } />
                            } )
                        ) : null }
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
