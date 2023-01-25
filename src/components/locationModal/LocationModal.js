import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../characterList/charactersSlice';

import { getLocation } from '../../services/Service';

import './LocationModal.css';

function LocationModal(props) {

    const location = useSelector(state => (state.characters.openedLocation.id))
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [dimension, setDimension] = useState('');
    const [residents, setResidents] = useState(0);
    const [id, setId] = useState();


    useEffect(() => {
        getLocation(location)
            .then(({name, type, dimension, residents, id}) => {
                setName(name);
                setType(type);
                setDimension(dimension);
                setResidents(residents.length);
                setId(id);
            })
    }, [location]);

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {name}
            </Modal.Title>
          </Modal.Header>   
          <Modal.Body>
            <p>Name: {name}</p>
            {type !== 'unknown' ? <p>Type: {type}</p> : null}
            {dimension !== 'unknown' ? <p>Dimension: {dimension}</p> : null}
            <p>Residents: <a className='residents' onClick={() => {
                dispatch(setFilters({origin: id}));
                props.onHide();
            }}>{residents}</a></p>
          </Modal.Body>
        </Modal>
      );
}

export default LocationModal;