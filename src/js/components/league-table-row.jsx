import '../../styles/league-table.css';
import { useMemo } from 'react';

export function LeagueTableRow( player, results ) {

    const playerResults = useMemo( () => {
        return player.results.filter( result => {
            if ( result.teams[ 0 ].id === player.player.id || result.teams[ 1 ].id === player.player.id ) {
                return result;
            }

            return null;
        } );
    }, [ player.results, player.player.id ] );

    const wins = useMemo( () => {
        if ( !playerResults ) {
            return;
        }

        let wins = 0;

        playerResults.forEach( result => {
            let winnerId;
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score ) {
                winnerId = result.teams[ 0 ].id;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score ) {
                winnerId = result.teams[ 1 ].id;
            }

            if ( winnerId === player.player.id ) {
                wins++;
            }
        } );

        return wins;
    }, [ playerResults, player.player.id ] );

    const defeats = useMemo( () => {
        if ( !playerResults ) {
            return;
        }

        let defeats = 0;

        playerResults.forEach( result => {
            let loserId;
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score ) {
                loserId = result.teams[ 1 ].id;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score ) {
                loserId = result.teams[ 0 ].id;
            }

            if ( loserId === player.player.id ) {
                defeats++;
            }
        } );

        return defeats;
    }, [ playerResults, player.player.id ] );

    const draws = useMemo( () => {
        if ( !playerResults ) {
            return;
        }

        let draws = 0;

        playerResults.forEach( result => {
            if ( result.teams[ 0 ].score === result.teams[ 1 ].score ) {
                draws++;
            }
        } );

        return draws;
    }, [ playerResults ]  );

    const goals = useMemo( () => {
        if ( !playerResults ) {
            return;
        }

        let goals = {
            for: 0,
            against: 0
        };

        playerResults.forEach( result => {
            if ( result.teams[ 0 ].id === player.player.id ) {
                goals.for = goals.for + result.teams[ 0 ].score;
                goals.against = goals.against + result.teams[ 1 ].score;
            } else {
                goals.for = goals.for + result.teams[ 1 ].score;
                goals.against = goals.against + result.teams[ 0 ].score;
            }
        } );

        return goals;
    }, [ playerResults, player.player.id ]  );

    const points = useMemo( () => {
        if ( !playerResults ) {
            return;
        }

        let points = 0;

        playerResults.forEach( result => {
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score && result.teams[ 0 ].id === player.player.id ) {
                points = points + 3;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score && result.teams[ 1 ].id === player.player.id ) {
                points = points + 3;
            } else if ( result.teams[ 0 ].score === result.teams[ 1 ].score ) {
                points = points + 1;
            }
        } );

        return points;
    }, [ playerResults, player.player.id ] );

    return (
        <tr className='league-table__row'>
            <td className='league-table__player'>
                { player.player.name }
                <span className='league-table__team'>{ player.player.team }</span>
            </td>
            <td>{ playerResults ? playerResults.length : '0' }</td>
            <td>{ wins }</td>
            <td>{ draws }</td>
            <td>{ defeats }</td>
            <td>{ goals.for }</td>
            <td>{ goals.against }</td>
            <td className='league-table__points'>{ points }</td>
        </tr>
    )
}
