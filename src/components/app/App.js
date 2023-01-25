import Header from "../header/Header";
import CharacterList from "../characterList/CharacterList";
import Filter from "../filter/Filter";
import LocationModal from "../locationModal/LocationModal";
import { useSelector, useDispatch } from "react-redux";
import { closeLocation } from "../characterList/charactersSlice";

function App() {

    const locationModalShow = useSelector(state => state.characters.openedLocation.opened);
    const dispatch = useDispatch();

    return (
        <div className="app">
            <LocationModal show={locationModalShow} onHide={() => dispatch(closeLocation())}/>
            <Header/>
            <Filter/>
            <CharacterList/>
        </div>
    );
}

export default App;