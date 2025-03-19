import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function SleepTrack(){
    const [data, setData] = useState({"age": "", 
        "bedTime": "",
        "wakeTime": "",
        "awakenings" : "",
        "caffeine": "",
        "alcohol": "",
        "smoking": "",
        "exercise": ""
    })
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Submitted Data: ", data)
    }
    return(
        <>
        <div className="NavBar">
        <Link to = "/">
          Home Page 
          </Link>
        <Link to="/SleepTrack">
             Sleep Tracking
          </Link>
        <Link to = "/DietTrack">
        Diet Tracking
        </Link>
        </div>
       <form onSubmit={handleSubmit}>
                <p>Enter your age:</p>
                <input type="number" name="age" value={data.age} onChange={handleChange} />

                <p>Enter your Bed Time:</p>
                <input type="time" name="bedTime" value={data.bedTime} onChange={handleChange} />

                <p>Enter your Wake Time:</p>
                <input type="time" name="wakeTime" value={data.wakeTime} onChange={handleChange} />

                <p>Enter Awakenings (No. of times you woke up in the night):</p>
                <input type="number" name="awakenings" value={data.awakenings} onChange={handleChange} />

                <p>Enter Caffeine Consumption (0 - 100):</p>
                <input type="number" name="caffeine" value={data.caffeine} onChange={handleChange} />

                <p>Enter Alcohol Consumption (0 - 5):</p>
                <input type="number" name="alcohol" value={data.alcohol} onChange={handleChange} />

                <p>Enter Smoking Status:</p>
                <select name="smoking" value={data.smoking} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>

                <p>Enter Exercise Frequency (0 - 5):</p>
                <input type="number" name="exercise" value={data.exercise} onChange={handleChange} /> 

                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default SleepTrack