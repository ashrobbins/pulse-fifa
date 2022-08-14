import '../../styles/league-table.css';

export function LeagueTableRow( player ) {

    return (
        <tr className='league-table__row'>
            <td className='league-table__player'>
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
    )
}
