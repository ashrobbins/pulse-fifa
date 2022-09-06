import { Fragment } from 'react';
import '../../styles/league-table.css';
import { useMemo, useState } from 'react';
import { Result } from '../../js/components/result';

export function LeagueTableRow( player, results, players, champion ) {

    const [ resultsOpen, setResultsOpen ] = useState( false );

    const resultsOpenClass = resultsOpen ? '' : 'league-table__row--closed';

    const championClass = player.champion ? 'league-table__row--champion' : '';

    const playerResults = useMemo( () => {
        return player.results.filter( result => {
            if ( result.teams[ 0 ].id === player.player.id || result.teams[ 1 ].id === player.player.id ) {
                return result;
            }
        } );
    }, [ player.results, player.player.id ] );

    const clickHandler = function() {
        if ( resultsOpen ) {
            setResultsOpen( false )
        } else {
            setResultsOpen( true )
        }
    }

    return (
        <Fragment>
            <tr className={ `league-table__row ${ championClass }` } onClick={ clickHandler }>
                <td className='league-table__player'>
                    <span className='league-table__arrow'>&#9660;</span>
                    { player.player.name }
                    <span className='league-table__team'>{ player.player.team }</span>
                </td>
                <td>{ player.player.played }</td>
                <td>{ player.player.wins }</td>
                <td>{ player.player.draws }</td>
                <td>{ player.player.defeats }</td>
                <td>{ player.player.goalsFor }</td>
                <td>{ player.player.goalsAgainst }</td>
                <td>{ player.player.goalDiff }</td>
                <td className='league-table__points'>{ player.player.points }</td>
            </tr>
            { playerResults ? (
                <tr className={ `league-table__row league-table__row--results ${ resultsOpenClass }` }>
                    <td colSpan='9'>
                        <div className='player-results'>
                            { playerResults.map( ( result, index ) => {
                                return <Result key={ `result_${ index }` } match={ result } players={ player.players } />
                            } ) }
                        </div>
                    </td>
                </tr>
            ) : null }
        </Fragment>
    )
}
