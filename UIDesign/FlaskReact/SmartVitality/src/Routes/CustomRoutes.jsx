import {Routes, Route} from 'react-router-dom'
import SleepTrack from '../Components/SleepTracker/Sleeper'

function CustomRoutes(){
    return(
    <Routes>
        <Route path="/SleepTrack" element={<SleepTrack />}></Route>
        <Route path = "/" element></Route>
      </Routes>
    );
}

export default CustomRoutes;