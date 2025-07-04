import {useState, useEffect} from 'react';
import axios from 'axios';
import './Weather.css'
import { Sun, MoonStar, Sunrise  } from 'lucide-react'

const Weather = ({myCity}) => {
    
    const [data, setData] = useState({})
    const [timeSunrise, setTimeSunrise] = useState('')
    const [timeSunset, setTimeSunset] = useState('')

    const handleRequest = async() => {
     try {
        const response  = await axios.get('http://localhost:3001/api/openweatherapi', {
            params: {
                myCity: myCity
            }
        })
        console.log(response.data)
        setData(response.data)
     } catch (error) {
        console.error(error)
        setData('error fetching weather api')
     }
    }

    useEffect(()=>{handleRequest()},[])



    useEffect(()=> {
        if (data.list !== undefined) {
            const dtSunrise = data.list[0].sunrise;
            setTimeSunrise(new Date(dtSunrise * 1000));
            const dtSunset = data.list[0].sunset;
            setTimeSunset(new Date(dtSunset * 1000));
        }
    }, [data])
    
    return(
        <div className="WeatherBox">
            <h1 className="WeatherTitle">
                {myCity}
            </h1>

            { data.list && (
            <>
                <pre><Sunrise /> {data.list[0].temp.morn} | feels like {data.list[0].feels_like.morn}</pre>
                <pre><Sun/> {data.list[0].temp.day} | feels like {data.list[0].feels_like.day}</pre>
                <pre><MoonStar /> {data.list[0].temp.night} | feels like {data.list[0].feels_like.night}</pre>

            { timeSunrise !== '' && (
            <>
                <pre>sunrise {timeSunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} <Sun/></pre>
                <pre>sunset {timeSunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} <MoonStar /></pre>
            </>
            )}

                <pre>weather condition: {data.list[0].weather[0].main}, {data.list[0].weather[0].description}</pre>
                
            
            </>
            )}

        </div>
    )
}

export default Weather