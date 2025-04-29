import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Diet.css";
import NavBar from "../NavBar/NavBar";

function Diet() {
  const [dropdown, setDropdown] = useState([]);
  const [data, setData] = useState({ food: "", serving: "" });
  const [food, setFood] = useState("");
  const [serving, setServing] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [out, setOut] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [plot, setPlot] = useState(null)
  const [loader, setLoader] = useState(0)
  // const dropper = async() =>{
  //   if(dropdown.length > 0){
  //     await setIsDropdownOpen(True)
  //   }
  // }
  // const toggleDropdown = () => {
  //   if (dropdown.length > 0) {
  //     setIsDropdownOpen((prev) => !prev);
  //   }
  // };

  const addFoodItem = () => {
    if (food.trim() && serving.trim()) {
      document.querySelector(".submission").style.display = "inline-block";
      setFoodList([...foodList, { food, serving }]);
      setFood("");
      setServing("");
    }
  };

  const fetchOutput = async () => {
    try {
      document.querySelector(".submission").style.display = "none";
      const response = await axios.post(
        "http://localhost:5000/diet/output",
        foodList,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setOut(response.data|| {});
      setFoodList([]);
    } catch (error) {
      console.error("Error fetching output:", error);
      setOut({});
    }
  };
// console.log(plot)
// console.log(out)
  const fetchFoodSuggestions = async (query) => {
    if (!query.trim()) {
      setDropdown([]);
      setIsDropdownOpen(false);
      return;
    }
    try {
      setLoader(1)
      const response = await axios.post(
        "http://localhost:5000/diet",
        { food: query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setDropdown(response.data.results.length > 0 ? response.data.results : []);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
    setLoader(0)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "food") {
      setFood(value);
      setPlot(null)
      setLoader(0)
      setOut({});
      if (value.trim() === "") {
        setDropdown([]);
        setIsDropdownOpen(false);
      } else {
        fetchFoodSuggestions(value);
      }
    } else if (name === "serving") {
      setServing(value);
      setPlot(null)
      setLoader(0)
    }
  };

  const handleFoodSelection = (selectedFood) => {
    setFood(selectedFood);
    setData({ ...data, food: selectedFood });
    setDropdown([]);
    setIsDropdownOpen(false);
    setOut({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(1)
      const response = await axios.post("http://localhost:5000/diet/output/store", foodList, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data)
      setPlot(response.data)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <NavBar />
      <form className="dietContainer" onSubmit={handleSubmit} autoComplete="off">
        <p>Enter what you ate:</p>
        <input
          className="input_dish"
          type="text"
          name="food"
          value={food}
          onChange={handleInputChange}
        />
        {isDropdownOpen && dropdown.length > 0 && (
          <ul className="dropdown open">
            {dropdown.map((value, index) => (
              <li
                key={index}
                className="listItem"
                onClick={() => handleFoodSelection(value)}
                style={{ cursor: "pointer" }}
              >
                {value}
              </li>
            ))}
          </ul>
        )}

        <p>Enter your servings (in g)</p>
        <input
          className="servings"
          type="number"
          name="serving"
          value={serving}
          onChange={handleInputChange}
        />
        <button type="button" onClick={addFoodItem} className="add">Add Item</button>
        <br />
        
          <ul className="foodList">
            {foodList.map((item, index) => (
              <li key={index}>
                {item.food} - {item.serving}g
              </li>
            ))}
          </ul>
        
        <br />
        <button type="submit" onClick={fetchOutput} className="submission">
          Submit
        </button>

        {Object.keys(out).length > 0 && (
          <div className="Output">
            <p>Output</p>
            <ul>
              {Object.entries(out).map(([key, value], idx) => (
                <li key={idx}>
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {
          plot !== null && (
            <div>
              <Plot data = {plot.data} layout = {plot.layout}>

              </Plot>
            </div>
          ) || 
          loader !== 0 && // foodList == [] &&
          (
            <div className="Loading">
              <span className="Loader a">
              </span>
              <span className="Loader b">
            </span>
            <span className="Loader c">
            </span>
            </div>
            
          )
        }
      </form>
    </>
  );
}

export default Diet;
