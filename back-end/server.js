import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());
const PORT = 3001

app.get('/api/autocomplete', async (req, res) => {
  const input = req.query.input
  const key = process.env.GOOGLE_API_KEY
  const apiCall = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${key}`
  try {
    const response = await axios.get(apiCall)
    // res.send({data: "success"})
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google API' })
    console.log("error")
  }
})

app.get('/api/openweatherapi', async (req, res) => {
  const {myCity} = req.query
  const encodedQuery = encodeURIComponent(myCity)
  const count = '16';
  const metric = 'imperial';
  const key = process.env.OPEN_WEATHER_KEY
  const apiCall = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${encodedQuery}&cnt=${count}&units=${metric}&appid=${key}`;
  try {
      const response = await axios.get(apiCall)
      res.json(response.data);
  } catch (err) {
      res.status(500).json({ error: 'Failed openweathermap.org api'})
      console.log("error1")
      console.log(err)
  }
})

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
