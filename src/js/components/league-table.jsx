import '../../styles/league-table.css';
import { LeagueTableRow } from './league-table-row';

export function LeagueTable( players, results ) {

    return (
        <table className='league-table'>
            <thead className='league-table__header'>
                <tr>
                    <th className='league-table__player'>Player</th>
                    <th>Played</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                { players.players.map( ( player, index ) => {
                    return <LeagueTableRow
                        key={ `table-row_${ index }` }
                        player={ player }
                        results={ players.results }
                        />
                } ) }
            </tbody>
        </table>
    )
}
