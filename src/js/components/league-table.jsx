import '../../styles/league-table.css';
import { LeagueTableRow } from './league-table-row';
import { getStandings } from '../common/get-standings';
import { useMemo } from 'react';

export function LeagueTable( players, results, isSeasonComplete ) {

    const standings = useMemo( () => {
        if ( players.players && players.results ) {
            return getStandings( players.players, players.results );
        }
        return [];
    }, [ players ] );

    return (
        <div className='league-table'>
            <table className='league-table__table'>
                <thead className='league-table__header'>
                    <tr>
                        <th className='league-table__player'>Player</th>
                        <th>Played</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    { standings.map( ( player, index ) => {
                        return <LeagueTableRow
                            key={ `table-row_${ index }` }
                            player={ player }
                            results={ players.results }
                            players={ players.players }
                            champion={ players.isSeasonComplete && index === 0 }
                            />
                    } ) }
                </tbody>
            </table>
        </div>
    )
}
