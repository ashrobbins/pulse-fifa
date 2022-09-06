import './styles/App.css';

import { db } from './js/common/firebase';
import { onValue, ref } from 'firebase/database';

import { Fragment, useEffect, useState, useMemo } from 'react';
import { LeagueTable } from './js/components/league-table';
import { AddResult } from './js/components/add-result';
import { Result } from './js/components/result';
import { SeasonSelector } from './js/components/season-selector';

function App() {

    const [ seasons, setSeasons ] = useState( [] );
    const [ selectedSeason, setSelectedSeason ] = useState( null );
    const [ players, setPlayers ] = useState( [] );
    const [ results, setResults ] = useState( [] );
    const [ resultsUpdated, setResultsUpdated ] = useState( false );

    useEffect( () => {
        let seasonsData = [];

        const seasonsQuery = ref( db, '/seasons' );
        return onValue( seasonsQuery, ( snapshot ) => {
            snapshot.forEach( season => {
                const seasonData = {
                    key: season.key,
                    ...season.val()
                };

                if ( seasonData ) {
                    seasonsData.push( seasonData );
                }
            });

            setSeasons( seasonsData );
        });
    } );

    useEffect( () => {
        if ( seasons && !selectedSeason ) {
            setSelectedSeason( seasons[ seasons.length - 1 ] );
        }
    }, [ seasons ] );

    useEffect( () => {
        if ( !selectedSeason?.key ) {
            return;
        }

        let playersData = [];

        const playersQuery = ref( db, `/seasons/${ selectedSeason.key }/players` );
        return onValue( playersQuery, ( snapshot ) => {
            snapshot.forEach( player => {
                const playerData = player.val();

                if ( playerData ) {
                    playersData.push( playerData );
                }
            });

            setPlayers( playersData );
        });
    }, [ selectedSeason ] );

    useEffect( () => {
        if ( !selectedSeason?.key ) {
            setResultsUpdated( false );
            return;
        }

        const resultsQuery = ref( db, `/seasons/${ selectedSeason.key }/results` );
        return onValue( resultsQuery, ( snapshot ) => {
            let results = [];

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
            setResultsUpdated( false );
        } );
    }, [ selectedSeason, resultsUpdated ] );

    function checkResultExists( newResult ) {
        let exists = false;
        results.forEach( result => {
            if ( result.teams[ 0 ].id === newResult.teams[ 0 ].id && result.teams[ 1 ].id === newResult.teams[ 1 ].id ) {
                exists = true;
            }
        } );

        return exists;
    }

    const isSeasonComplete = useMemo( () => {
        if ( !players ||!results ) {
            return false;
        }

        const totalFixturesInSeason = ( ( players.length - 1 ) * 2 ) * ( players.length / 2);

        if ( results.length < totalFixturesInSeason ) {
            return false;
        }

        return true;
    }, [ players, results ] );

    return (
        <Fragment>
            <header className='site-header'>
                <h1>FIFA League</h1>
            </header>
            { seasons.length ? (
                <SeasonSelector seasons={ seasons } selectedSeason={ selectedSeason } setSelectedSeason={ setSelectedSeason } />
            ) : null }
            <div className='App'>
                { isSeasonComplete ?
                    <h3 className='season-complete'>Season complete</h3>
                : null }

                <LeagueTable players={ players } results={ results } isSeasonComplete={ isSeasonComplete } />

                <div className='results'>
                    { !isSeasonComplete ?
                        <AddResult
                            players={ players }
                            checkResultExists={ checkResultExists }
                            selectedSeason={ selectedSeason }
                        />
                    : null }

                    <ul className='results__list'>
                        { results.length > 0 && players.length > 0 ? (
                            results.map( ( result, index ) => {
                                return <Result
                                    key={ `result_${ index }` }
                                    match={ result }
                                    players={ players }
                                    selectedSeason={ selectedSeason }
                                    setResults={ setResults }
                                    setResultsUpdated={ setResultsUpdated }
                                />
                            } )
                        ) : null }
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
