import React,{ useState,useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetchAPI()
    }
  , [])
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000")
    console.log(response.data.users)
  }
  return (
    <div>

    </div>
  )
}

export default App
