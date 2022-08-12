import { useEffect, useState } from "react"
import '../../styles/results.css';

export function Result( match, players ) {
    const [ matchData, setMatchData ] = useState( {} );
    const [ team1, setTeam1 ] = useState( {} );
    const [ team2, setTeam2 ] = useState( {} );

    function getName( team ) {
        return matchData.players.find( player => player.id === team.id ).name;
    }

    useEffect( () => {
        if ( !match?.match?.teams ) {
            return;
        }

        let data = {
            teams: []
        };

        match.match.teams.forEach( team => {
            if ( team ) {
                data.teams.push( team );
            }
        } );

        setMatchData( {
            teams: data,
            players: match.players
         } );
    }, [ match, players ] );

    useEffect( () => {
        if ( !matchData?.teams?.teams ) {
            return;
        }

        setTeam1( {
            ...matchData.teams.teams[ 0 ],
            name: getName( matchData.teams.teams[ 0 ] )
        } );

        setTeam2( {
            ...matchData.teams.teams[ 1 ],
            name: getName( matchData.teams.teams[ 1 ] )
         } );
    }, [ matchData ] );

    return (
        <li className='results__item'>
            <span className={ `results__player ${ team1?.score < team2?.score ? 'results__player--loser' : '' }` }>{ team1?.name }</span>
            <span className='results__scores'>
                <span className='results__score'>{ team1?.score }</span>
                <span className='results__separator'></span>
                <span className='results__score'>{ team2?.score }</span>
            </span>
            <span className={ `results__player ${ team2?.score < team1?.score ? 'results__player--loser' : '' }` }>{ team2?.name }</span>
        </li>
    )
}
