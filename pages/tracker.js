import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BASE_URL = "https://1ljbmscwa4.execute-api.eu-north-1.amazonaws.com/dev/cloudbloom_backend";

export default function Tracker() {
  const [categories] = useState([
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
  const [city, setCity] = useState("Hyderabad");
  const [userId, setUserId] = useState("user123"); // temporary static ID; replace with logged-in user

  // Fetch plants when category changes
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${BASE_URL}/api/plants?category=${selectedCategory}`)
        .then(res => setPlants(res.data))
        .catch(err => console.error("Error fetching plants:", err));
    }
  }, [selectedCategory]);

  // Fetch data when plant changes
  useEffect(() => {
    if (selectedPlant) {
      // Get plant details
      axios.get(`${BASE_URL}/api/plant-details?name=${selectedPlant}`)
        .then(res => {
          setPlantImage(res.data.image || "");
          setCareTips(res.data.defaultTips || []);
        })
        .catch(err => console.error("Error fetching plant details:", err));

      // Get watering logs
      axios.get(`${BASE_URL}/api/watering-log`, {
        params: { plant: selectedPlant, user_id: userId }
      })
        .then(res => setWateringLog(res.data))
        .catch(err => console.error("Error fetching watering log:", err));

      // Get weekly tracker info
      axios.get(`${BASE_URL}/api/weekly-tracker`, {
        params: { plant: selectedPlant, user_id: userId, city }
      })
        .then(res => {
          setWeeklyData([
            { date: new Date().toLocaleDateString(), watered: res.data.weather_rainfall },
          ]);
        })
        .catch(err => console.error("Error fetching weekly tracker:", err));
    }
  }, [selectedPlant]);

  // Generate care tips
  const fetchPersonalizedTips = () => {
    axios.post(`${BASE_URL}/api/care-tips`, {
      user_id: userId,
      plant_name: selectedPlant,
      soil_ph: parseFloat(soilPh),
      location: city
    })
      .then(res => {
        setWeatherData(res.data.weather);
        setCareTips(res.data.tips);
      })
      .catch(err => console.error("Error fetching care tips:", err));
  };

  // Add watering log
  const addWateringLog = () => {
    axios.post(`${BASE_URL}/api/watering-log`, {
      user_id: userId,
      plant_name: selectedPlant,
      soil_ph: parseFloat(soilPh),
      notes: "Watered via tracker"
    })
      .then(() => {
        // Re-fetch logs
        axios.get(`${BASE_URL}/api/watering-log`, {
          params: { plant: selectedPlant, user_id: userId }
        }).then(res => setWateringLog(res.data));
      })
      .catch(err => console.error("Error adding watering log:", err));
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Plant Care Tracker</h1>

          {/* Location Input */}
          <div className="mb-4">
            <label className="font-semibold">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="ml-2 p-2 border rounded"
              placeholder="Enter your city"
            />
          </div>

          {/* Category & Plant Select */}
          <div className="flex gap-4 mb-6">
            <select
              className="p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>

            <select
              className="p-2 border rounded"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Plant</option>
              {plants.map((p) => <option key={p.name}>{p.name}</option>)}
            </select>
          </div>

          {/* Plant Details */}
          {selectedPlant && (
            <div className="bg-white shadow p-6 rounded-lg flex gap-6">
              <img src={plantImage} alt={selectedPlant} className="w-48 h-48 object-cover rounded" />
              <div>
                <h2 className="text-xl font-semibold">{selectedPlant}</h2>
                {weatherData && (
                  <>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Sunlight: {weatherData.sunlight}</p>
                    <p>Rainfall: {weatherData.rainfall} mm</p>
                  </>
                )}
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
                {careTips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}

          {/* Watering Log */}
          {wateringLog.length > 0 && (
            <div className="mt-6 p-6 bg-gray-100 rounded shadow">
              <h2 className="text-lg font-semibold">Watering Log</h2>
              <ul>
                {wateringLog.map((entry, i) => (
                  <li key={i}>{entry.timestamp}</li>
                ))}
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
            <h2 className="text-lg font-semibold">Weekly Tracker</h2>
            <Line data={{
              labels: weeklyData.map(d => d.date),
              datasets: [{
                label: "Rainfall (mm)",
                data: weeklyData.map(d => d.watered),
              }]
            }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
