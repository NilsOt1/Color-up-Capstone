import {Route, Routes} from 'react-router';
import './App.css'
import ColorSelection from "./pages/ColorSelection.tsx";

function App() {

    return (
        <>

            <Routes>
                <Route path={"/colorSelection"} element={<ColorSelection/>}/>
            </Routes>

        </>
    )
}

export default App
