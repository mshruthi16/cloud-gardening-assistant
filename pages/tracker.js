import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";  // Import Navbar
import Footer from "../components/Footer";  // Import Footer
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Tracker() {
  const [categories, setCategories] = useState([
    "Indoor Plants", "Flowering Plants", "Vegetables", "Herbs", 
    "Succulents & Cacti", "Fruits", "Climbers & Vines", 
    "Aquatic Plants", "Air-Purifying Plants", "Bonsai & Exotic Plants"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [soilPh, setSoilPh] = useState("");
  const [careTips, setCareTips] = useState([]);
  const [wateringLog, setWateringLog] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  // Fetch plants from MongoDB when category changes
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/api/plants?category=${selectedCategory}`)
        .then(response => setPlants(response.data))
        .catch(error => console.error("Error fetching plants:", error));
    }
  }, [selectedCategory]);

  // Fetch weather data when plant is selected
  useEffect(() => {
    if (selectedPlant) {
      axios.get("/api/weather")
        .then(response => setWeatherData(response.data))
        .catch(error => console.error("Error fetching weather:", error));

      // Fetch plant-specific details from MongoDB
      axios.get(`/api/plant-details?name=${selectedPlant}`)
        .then(response => {
          setPlantImage(response.data.image);
          setCareTips(response.data.defaultTips);
        })
        .catch(error => console.error("Error fetching plant details:", error));
      
      // Fetch past watering logs
      axios.get(`/api/watering-log?plant=${selectedPlant}`)
        .then(response => setWateringLog(response.data))
        .catch(error => console.error("Error fetching watering log:", error));

      // Fetch weekly tracker data
      axios.get(`/api/weekly-tracker?plant=${selectedPlant}`)
        .then(response => setWeeklyData(response.data))
        .catch(error => console.error("Error fetching weekly tracker:", error));
    }
  }, [selectedPlant]);

  // Submit user input (Soil pH, Weather Data) to get personalized tips
  const fetchPersonalizedTips = () => {
    axios.post("/api/care-tips", {
      plant: selectedPlant,
      weather: weatherData,
      soilPh,
      wateringLog
    })
    .then(response => setCareTips(response.data.tips))
    .catch(error => console.error("Error fetching care tips:", error));
  };

  // Add watering log entry
  const addWateringLog = () => {
    axios.post("/api/watering-log", { plant: selectedPlant, date: new Date() })
      .then(response => setWateringLog(response.data))
      .catch(error => console.error("Error adding watering log:", error));
  };

  return (
    <>
      <Navbar />  {/* Display Navbar at the top */}
      <div className="bg-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Plant Care Tracker</h1>

        {/* Plant Selection */}
        <div className="flex gap-4 mb-6">
          {/* Category Selection */}
          <select 
            className="p-2 border rounded"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Specific Plant Selection */}
          <select 
            className="p-2 border rounded"
            value={selectedPlant} 
            onChange={(e) => setSelectedPlant(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Select Plant</option>
            {plants.map(plant => (
              <option key={plant.name} value={plant.name}>{plant.name}</option>
            ))}
          </select>
        </div>

        {/* Plant Details & Parameters */}
        {selectedPlant && (
          <div className="bg-white shadow p-6 rounded-lg flex gap-6">
            {/* Plant Image */}
            <img src={plantImage} alt={selectedPlant} className="w-48 h-48 object-cover rounded" />

            <div>
              {/* Environmental Data */}
              <h2 className="text-xl font-semibold">{selectedPlant}</h2>
              <p className="text-gray-700">Temperature: {weatherData?.temperature}°C</p>
              <p className="text-gray-700">Humidity: {weatherData?.humidity}%</p>
              <p className="text-gray-700">Rainfall: {weatherData?.rainfall} mm</p>
              <p className="text-gray-700">Sunlight: {weatherData?.sunlight} hours</p>

              {/* Soil pH Input */}
              <div className="mt-2">
                <label className="font-semibold">Soil pH:</label>
                <input 
                  type="number" 
                  value={soilPh} 
                  onChange={(e) => setSoilPh(e.target.value)} 
                  className="border p-2 rounded ml-2"
                  placeholder="Enter pH"
                />
              </div>

              {/* Fetch Tips Button */}
              <button 
                onClick={fetchPersonalizedTips}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Get Personalized Care Tips
              </button>
            </div>
          </div>
        )}

        {/* Care Tips */}
        {careTips.length > 0 && (
          <div className="mt-6 p-6 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Care Tips</h2>
            <ul className="list-disc list-inside">
              {careTips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </div>
        )}

        {/* Watering Log */}
        {wateringLog.length > 0 && (
          <div className="mt-6 p-6 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Watering Log</h2>
            <ul>
              {wateringLog.map((entry, index) => <li key={index}>{entry.date}</li>)}
            </ul>
            <button 
              onClick={addWateringLog} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Watering Entry
            </button>
          </div>
        )}

        {/* Weekly Tracker Graph */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Weekly Care Tracker</h2>
          <Line data={{
            labels: weeklyData.map(data => data.date),
            datasets: [{ label: "Watering Log", data: weeklyData.map(data => data.watered) }]
          }} />
        </div>
      </div>
    </div>
      <Footer />  {/* Display Footer at the bottom */}
    </>
  );
}
