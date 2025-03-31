import React, { useState } from "react";
import axios from "axios";
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

  const toggleDropdown = () => {
    if (dropdown.length > 0) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const addFoodItem = () => {
    if (food.trim() && serving.trim()) {
      setFoodList([...foodList, { food, serving }]);
      setFood("");
      setServing("");
    }
  };

  const fetchOutput = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/diet/output",
        foodList,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setOut(response.data || {});
    } catch (error) {
      console.error("Error fetching output:", error);
      setOut({});
    }
  };

  const fetchFoodSuggestions = async (query) => {
    if (!query.trim()) {
      setDropdown([]);
      setIsDropdownOpen(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/diet",
        { food: query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setDropdown(response.data.results.length > 0 ? response.data.results : []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "food") {
      setFood(value);
      setOut({});
      if (value.trim() === "") {
        setDropdown([]);
        setIsDropdownOpen(false);
      } else {
        fetchFoodSuggestions(value);
      }
    } else if (name === "serving") {
      setServing(value);
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
      const response = await axios.post("http://localhost:5000/diet/output/store", foodList, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <NavBar />
      <form className="dietContainer" onSubmit={handleSubmit}>
        <p>Enter what you ate:</p>
        <input
          className="input_dish"
          type="text"
          name="food"
          value={food}
          onChange={handleInputChange}
        />
        <button type="button" className="list_button" onClick={toggleDropdown}>
          List the dishes
        </button>

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
        <br />
        <button type="button" onClick={addFoodItem}>Add Item</button>
        <br />
        <div>
          <ul className="foodList">
            {foodList.map((item, index) => (
              <li key={index}>
                {item.food} - {item.serving}g
              </li>
            ))}
          </ul>
        </div>
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
      </form>
    </>
  );
}

export default Diet;
