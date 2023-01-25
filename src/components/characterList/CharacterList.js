
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getFilteredCharacters } from '../../services/Service';
import { loadNewCharacters, loadMoreCharacters } from './charactersSlice';
import CharacterCard from '../characterCard/CharacterCard';

import {Spinner} from 'react-bootstrap';

import './CharacterList.css';

function CharacterList() {

    const characters = useSelector((state) => (state.characters.characters));
    const filters = useSelector((state) => (state.characters.filters));
    const dispatch = useDispatch();

    const [nextPage, setNextPage] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getFilteredCharacters(filters).then(data => {
            dispatch(loadNewCharacters(data.result));
            setNextPage(data.nextPage);
            setLoading(false);
        });
    }, [filters]);

    return (
        <div className="character-list">
            {characters.map((character) => (<CharacterCard key={character.id} character={character}/>))}
            {loading ? <Spinner animation='border' className='loading'/> : null}
            {!loading && characters.length === 0 ? <div className='empty-list'>No characters found</div> : null}
            {nextPage && !loading ? 
                <button
                    className='btn btn-primary load-more'
                    onClick={() => {
                        setLoading(true);
                        getFilteredCharacters(filters, nextPage).then(data => {
                            dispatch(loadMoreCharacters(data.result));
                            setNextPage(data.nextPage);
                            setLoading(false);
                        });
                    }}>Load more</button> : null
            }
            <div style={{'height': '100px'}}></div>
        </div>
    )
}

export default CharacterList;