import React from "react";
import { useState } from "react";
import axios from 'axios'
import './SleepTrack.css';
import NavBar from '../NavBar/NavBar'
function SleepTrack(){
    const [sleepEfficiency, setSleepEfficiency] = useState(null);
    const [data, setData] = useState({"age": "", 
        "bedTime": "",
        "wakeTime": "",
        "awakenings" : "",
        "caffeine": "",
        "alcohol": "",
        "smoking": "No",
        "exercise": "",
        "REM" : "",
        "deep_sleep" : ""
    })
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/submit", data, {
            headers : {
            "Content-Type" : "application/json"
        }})
        console.log("Server Response: ", response.data)
        setSleepEfficiency(response.data.sleep_efficiency);
    }
    return(
        <>
         <NavBar/>
        <div  className="container">
       <form onSubmit={handleSubmit}>
                <p>Enter your age:</p>
                <input type="number" name="age" value={data.age} onChange={handleChange} min={10} />

                <p>Enter your Bed Time:</p>
                <input type="time" name="bedTime" value={data.bedTime} onChange={handleChange} />

                <p>Enter your Wake Time:</p>
                <input type="time" name="wakeTime" value={data.wakeTime} onChange={handleChange} />

                <p>Enter Awakenings (No. of times you woke up in the night):</p>
                <input type="number" name="awakenings" value={data.awakenings} onChange={handleChange} min={0} />

                <p>Enter Caffeine Consumption (0 - 100):</p>
                <input type="number" name="caffeine" value={data.caffeine} onChange={handleChange} min={0} max={100}/>

                <p>Enter Alcohol Consumption (0 - 5):</p>
                <input type="number" name="alcohol" value={data.alcohol} onChange={handleChange}min={0} max={5}/>

                <p>Enter Smoking Status:</p>
                <select name="smoking" value={data.smoking || "No"} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
                <br /> <br />
                <p>Enter your REM sleep % :</p>
                <input type="number" name="REM" value={data.REM} onChange={handleChange} min={0} max={100} /> 
                
                <p>Enter your Deep sleep % :</p>
                <input type="number" name="deep_sleep" value={data.deep_sleep} onChange={handleChange} min={0} max={100} /> 

                <p>Enter Exercise Frequency (0 - 5):</p>
                <input type="number" name="exercise" value={data.exercise} onChange={handleChange} min={0} max={5} /> 

                <br /><br />
                <button type="submit">Submit</button>
            </form>
            {sleepEfficiency !== null && (
                <div>
                    <h3>Predicted Sleep Efficiency: {(sleepEfficiency*100).toFixed(2)}%</h3>
                </div>
            )}
            </div>
        </>
    );
}

export default SleepTrack