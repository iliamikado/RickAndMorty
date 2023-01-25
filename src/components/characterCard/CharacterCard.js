import { useDispatch } from 'react-redux';
import { openLocation } from '../characterList/charactersSlice';

import './CharacterCard.css';

function CharacterCard(props) {
    const dispatch = useDispatch();
    const {name, species, image, gender, type, origin, location, lastEpisode} = props.character;
    const originId = origin.url.split('/').at(-1);
    const locationId = location.url.split('/').at(-1);

    return (
        <div className="character-card">
            <img src={image}/>
            <div className='description'>
                <p>Name: {name}</p>
                <p>Species: {species}</p>
                <p>Gender: {gender}</p>
                {type ? <p>Type: {type}</p> : null}
                <p>Origin: {origin.name !== 'unknown' ? <a className='location-name' onClick={() => dispatch(openLocation(originId))}
                >{origin.name}</a> : 'unknown'}</p>
                <p>Last location: {location.name !== 'unknown' ? <a className='location-name' onClick={() => dispatch(openLocation(locationId))}
                >{location.name}</a> : 'unknown'}</p>
                <p>Last episode: {lastEpisode}</p>
            </div>
        </div>
    );
}

export default CharacterCard;