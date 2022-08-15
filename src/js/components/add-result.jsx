import { useMemo, useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { SCORES } from "../common/constants";

export function AddResult( players ) {
    const [ player1, setPlayer1 ] = useState( 0 );
    const [ player1Score, setPlayer1Score ] = useState( 0 );
    const [ player2, setPlayer2 ] = useState( 0 );
    const [ player2Score, setPlayer2Score ] = useState( 0 );

    function handlePlayer1Change( event ) {
        setPlayer1( event.target.value );
    }

    function handlePlayer1ScoreChange( event ) {
        setPlayer1Score( event.target.value );
    }

    function handlePlayer2Change( event ) {
        setPlayer2( event.target.value );
    }

    function handlePlayer2ScoreChange( event ) {
        setPlayer2Score( event.target.value );
    }

    const canSubmit = useMemo( () => {
        if ( player1 === 0
        || player2 === 0 ) {
            return false;
        }

        return true;
    }, [ player1, player2 ] );

    function submitScore() {
        const result = {
            teams: {
                0: {
                    id: parseInt( player1 ),
                    score: parseInt( player1Score )
                },
                1: {
                    id: parseInt( player2 ),
                    score: parseInt( player2Score )
                }
            }
        };

        const db = getDatabase();
        const testRef = ref( db, 'results' );
        const newTestRef = push( testRef );
        set( newTestRef, result );

        setPlayer1( 0 );
        setPlayer1Score( 0 );
        setPlayer2( 0 );
        setPlayer2Score( 0 );
    }

    return (
        <div className="add-result">
            <select value={ player1 } onChange={ handlePlayer1Change } className="add-result__player">
                <option value='0'>-- Select --</option>
                { players.players.map( player => {
                    return <option value={ player.id } key={ `player1_${ player.id }` }>{ player.name }</option>;
                } ) }
            </select>

            <div className='add-result__scores'>
                <select
                    className="add-result__score"
                    value={ player1Score }
                    onChange={ handlePlayer1ScoreChange }
                >
                    { SCORES.map( score => {
                            return <option key={ `home-score_${ score }`} value={ score }>{ score }</option>
                        } ) }
                </select>
                -
                <select
                    className="add-result__score"
                    value={ player2Score }
                    onChange={ handlePlayer2ScoreChange }
                >
                    { SCORES.map( score => {
                            return <option key={ `home-score_${ score }`} value={ score }>{ score }</option>
                        } ) }
                </select>
            </div>

            <select value={ player2 } onChange={ handlePlayer2Change } className="add-result__player">
                <option value='0'>-- Select --</option>
                { players.players.map( player => {
                    return <option value={ player.id } key={ `player1_${ player.id }` }>{ player.name }</option>;
                } ) }
            </select>

            <button onClick={ submitScore } disabled={ !canSubmit } className='add-result__submit'>Add</button>
        </div>
    )
}
