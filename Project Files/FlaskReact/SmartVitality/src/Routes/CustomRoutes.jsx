import {Routes, Route} from 'react-router-dom'
import SleepTrack from '../Components/SleepTracker/Sleeper'
import Home from '../Components/Home/Home';
import Diet from '../Components/DietTracker/Diet';
function CustomRoutes(){
    return(
    <Routes>
        <Route path="/SleepTrack" element={<SleepTrack />}></Route>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/DietTrack" element = {<Diet/>}></Route>
      </Routes>
    );
}

export default CustomRoutes;