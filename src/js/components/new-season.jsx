import { Fragment, useState } from 'react';
import { getDatabase, ref, push, set } from "firebase/database";
import '../../styles/new-season.css';

export function NewSeason( updateCreateNewSeason ) {
    const [ numberOfPlayers, updateNumberOfPlayers ] = useState( 0 );
    const [ canSubmit, updateCanSubmit ] = useState( false );

    function handleChange( event ) {
        updateNumberOfPlayers( event.target.value );
    }

    function submitSeason( event ) {
        const newSeasonPlayers = {
            players: []
        };

        for ( let index = 0; index < parseInt( numberOfPlayers ); index++ ) {
            newSeasonPlayers.players.push( {
                'id': index,
                'name': document.getElementById( `player-${ index + 1 }-name` ).value,
                'team': document.getElementById( `player-${ index + 1 }-team` ).value
            } );
        }

        const db = getDatabase();
        const testRef = ref( db, `seasons/` );
        const newTestRef = push( testRef );
        set( newTestRef, newSeasonPlayers );

        updateCreateNewSeason.updateCreateNewSeason( false );
    }

    function checkCanSubmit() {
        updateCanSubmit( true );

        for ( let index = 0; index < parseInt( numberOfPlayers ); index++ ) {
            if ( !document.getElementById( `player-${ index + 1 }-name` ).value ) {
                updateCanSubmit( false );
            } else if ( !document.getElementById( `player-${ index + 1 }-team` ).value ) {
                updateCanSubmit( false );
            }
        }
    }

    return (
        <div className='new-season'>
            <button onClick={ () => updateCreateNewSeason.updateCreateNewSeason( false ) } className='new-season__submit'>Cancel</button>
            <h2>Create New Season</h2>
            <div className='new-season__field'>
                <span>Number of players</span>
                <select value={ numberOfPlayers } onChange={ handleChange }>
                    <option value='0'>-- Select --</option>
                    { [ ...Array( 20 ) ].map( ( e, index ) => {
                        return <option value={ index + 1 } key={ `player-choice_${ index }` }>{ index + 1 }</option>;
                    } ) }
                </select>
            </div>

            { numberOfPlayers > 0 ? (
                <Fragment>
                    <div className='new-season__players'>
                        <form id="new-season__form">
                            { [ ...Array( parseInt( numberOfPlayers ) ) ].map( ( f, index ) => {
                                return (
                                    <div className='new-season__field new-season__player' key={ `new-player_${ index }` }>
                                        <span>Player { index + 1 }</span>
                                        <input type='text' placeholder='Name' id={ `player-${ index + 1 }-name` } onKeyUp={ checkCanSubmit } />
                                        <input type='text' placeholder='Team' id={ `player-${ index + 1 }-team` } onKeyUp={ checkCanSubmit } />
                                    </div>
                                );
                            } ) }
                        </form>
                    </div>

                    <input type='submit' disabled={ !canSubmit } onClick={ submitSeason } className='new-season__submit' value='Create' />
                </Fragment>
            ) : null }
        </div>
    )
}
