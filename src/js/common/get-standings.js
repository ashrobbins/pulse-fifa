export const getStandings = ( players, results ) => {
    let standings = [];

    const playerResults = playerId => {
        return results.filter( result => {
            if ( result.teams[ 0 ].id === playerId || result.teams[ 1 ].id === playerId ) {
                return result;
            }

            return null;
        } );
    };

    const wins = ( results, playerId ) => {
        let wins = 0;

        results.forEach( result => {
            let winnerId;
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score ) {
                winnerId = result.teams[ 0 ].id;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score ) {
                winnerId = result.teams[ 1 ].id;
            }

            if ( winnerId === playerId ) {
                wins++;
            }
        } );

        return wins;
    };

    const defeats = ( results, playerId ) => {
        let defeats = 0;

        results.forEach( result => {
            let loserId;
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score ) {
                loserId = result.teams[ 1 ].id;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score ) {
                loserId = result.teams[ 0 ].id;
            }

            if ( loserId === playerId ) {
                defeats++;
            }
        } );

        return defeats;
    };

    const draws = ( results ) => {
        let draws = 0;

        results.forEach( result => {
            if ( result.teams[ 0 ].score === result.teams[ 1 ].score ) {
                draws++;
            }
        } );

        return draws;
    };

    const goals = ( results, playerId ) => {
        let goals = {
            for: 0,
            against: 0
        };

        results.forEach( result => {
            if ( result.teams[ 0 ].id === playerId ) {
                goals.for = goals.for + result.teams[ 0 ].score;
                goals.against = goals.against + result.teams[ 1 ].score;
            } else {
                goals.for = goals.for + result.teams[ 1 ].score;
                goals.against = goals.against + result.teams[ 0 ].score;
            }
        } );

        return goals;
    };

    const points = ( results, playerId ) => {
        let points = 0;

        results.forEach( result => {
            if ( result.teams[ 0 ].score > result.teams[ 1 ].score && result.teams[ 0 ].id === playerId ) {
                points = points + 3;
            } else if ( result.teams[ 1 ].score > result.teams[ 0 ].score && result.teams[ 1 ].id === playerId ) {
                points = points + 3;
            } else if ( result.teams[ 0 ].score === result.teams[ 1 ].score ) {
                points = points + 1;
            }
        } );

        return points;
    };

    players.forEach( player => {
        const results = playerResults( player.id );

        let playerObj = {
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDiff: 0,
            points: 0
        };

        if ( results ) {
            playerObj = {
                name: player.name,
                team: player.team,
                played: results.length,
                wins: wins( results, player.id ),
                draws: draws( results ),
                defeats: defeats( results, player.id ),
                goalsFor: goals( results, player.id ).for,
                goalsAgainst: goals( results, player.id ).against,
                goalDiff: goals( results, player.id ).for - goals( results, player.id ).against,
                points: points( results, player.id )
            };
        }

        return standings.push( playerObj );
    } );

    return standings.sort( function ( a, b ) {
        if ( a.points === b.points ){
          return +( a.goalDiff < b.goalDiff ) || +( a.goalDiff === b.goalDiff ) - 1;
        }

        return +( a.points < b.points ) || - 1;
    } );
}
