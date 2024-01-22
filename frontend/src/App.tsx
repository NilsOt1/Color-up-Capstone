import {Route, Routes} from 'react-router';
import './App.css'
import ColorSelection from "./pages/ColorSelection.tsx";
import Rooms from "./components/Rooms.tsx";

function App() {

    return (
        <>

            <Routes>
                <Route path={"/colorSelection"} element={<ColorSelection/>}/>
                <Route path={"/roomSelection"} element={<Rooms/>}/>
            </Routes>

        </>
    )
}

export default App
