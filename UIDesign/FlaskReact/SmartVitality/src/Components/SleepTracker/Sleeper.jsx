import React from "react";
import './SleepTrack.css';

function SleepTrack(){
    return(
        <>
            <p>Enter Your Sleep Data</p>
            <p>Enter your age:</p>
            <input type = 'number'></input>
            <p>Enter your Bed Time: </p>
            <input type = 'time'></input>
            <p>Enter your Wake Time:</p>
            <input type = "time"></input>
            <p>Enter Awakenings (No. of times you woke up in the middle of the night)</p>
            <input type="number"/>
            <p>Enter Caffeine Consumption (0 - 100):</p>
            <input type="number"/>
            <p>Enter Alcohol Consumption (0 - 5):</p>
            <input type="number"/>
            <p>Enter Smoking Status:</p>
            <input type="checkbox"/>
            <p>Enter Exercise Frequency (0 - 5):</p>
            <input type="number"/>
        </>
    );
}

export default SleepTrack