import '../../styles/seasons.css';

export function SeasonSelector( seasons, selectedSeason, setSelectedSeason, updateCreateNewSeason ) {

    function clickHandler( season ) {
        seasons.setSelectedSeason( season );
        console.log( season );
    }

    return (
        seasons.seasons && seasons.selectedSeason ? (
            <div className='seasons season-selector'>
                <h2>Seasons</h2>
                <ul>
                    { seasons.seasons.map( ( season, index ) => {
                        return <li key={ season.key } className={ season.key === seasons.selectedSeason.key ? 'season--selected' : '' }>
                            <button onClick={ () => clickHandler( season ) }>{ index + 1 }</button>
                        </li>
                    } ) }
                    <li>
                        <button onClick={ () => seasons.updateCreateNewSeason( true ) }>+</button>
                    </li>
                </ul>
            </div>
        ) : null
    )
}
