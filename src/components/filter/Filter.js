import './Filter.css';

import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../characterList/charactersSlice';
import { useState, useEffect } from 'react';

import { getLocationsNames } from '../../services/Service';

function updateFilter(prevStat, newStat) {
    return {...prevStat, ...newStat};
}

function Filter() {
    
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [gender, setGender] = useState('all');
    const [location, setLocation] = useState(-1);
    const [locations, setLocations] = useState([{name: 'All', id: -1}]);

    const newLocation = useSelector(state => state.characters.filters.origin)

    useEffect(() => {
        getLocationsNames().then(data => {
            setLocations([{name: 'All', id: -1}, ...data]);
        });
    }, [])

    useEffect(() => {
        if (location !== newLocation) {
            setLocation(newLocation);
        }
    }, [newLocation])

    return (
        <div className="filter">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={gender} onChange={(e) => {setGender(e.target.value)}}>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            <label className="form-label">Location</label>
            <select className="form-select" name="location" value={location} onChange={(e) => {setLocation(e.target.value)}}>
                {locations.map(({name, id}) => {
                    return (
                        <option key={id} value={id}>{name}</option>
                    )
                })}
            </select>
            <button className='btn btn-primary' onClick={() => {dispatch(setFilters({name, gender, origin: location}))}}>Find</button>
        </div>
    )
}

export default Filter;