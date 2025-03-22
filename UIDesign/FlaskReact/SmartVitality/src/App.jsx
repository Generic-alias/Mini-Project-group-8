import React,{ useState,useEffect } from 'react'
// import axios from 'axios'
// import SleepTrack from './Components/SleepTracker/Sleeper'
import CustomRoutes from './Routes/CustomRoutes'
import Home from './Components/Home/Home'
function App() {
  // const [data, setData] = useState([{}])
  // useEffect(() => {
  //   fetchAPI()
  //   }
  // , [])
  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:5000")
  //   console.log(response.data.users)
  //   setData(response.data.users)
  // }
  return (
    <>
      {/* <h1>{ data.map((t) => <div>{t}</div>) }</h1> */}
      
      <Home />

        
      <CustomRoutes/>
    </>
  )
}

export default App
