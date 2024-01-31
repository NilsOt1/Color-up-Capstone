import {Route, Routes} from 'react-router';
import './App.css'
import ColorSelection from "./pages/ColorSelection.tsx";
import RoomSelection from "./pages/RoomSelection.tsx";

function App() {

    return (
        <>

            <Routes>
                <Route path={"/color-selection/room/:colorRoomSetId"} element={<ColorSelection/>}/>
                <Route path={"/"} element={<RoomSelection/>}/>
            </Routes>

        </>
    )
}

export default App
