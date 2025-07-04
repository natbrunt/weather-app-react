import './Search.css'
import {useState} from 'react'
import axios from 'axios'
import Weather from './Weather'

const Search = () => {
    const [query, setQuery] = useState('')
    const [showWeather, setShowWeather] = useState(false);
    const [myCity, setMyCity] = useState('');
    const [items, setItems] = useState([])

    const handleSearch = async () => {
        setItems([])
        setShowWeather(false)
        try {
	    const apiCall = `http://localhost:3001/api/autocomplete?input=${query}`
            const response = await axios.get(apiCall)
            for (let i = 0; i <response.data.predictions.length; i++) {
                console.log(response.data.predictions[i].description)
                setItems(prevItems => [...prevItems, response.data.predictions[i].description])
            }
            console.log(response.data)
        } catch (error) {
            console.error(error)
            setItems(['There was an error finding your city'])
        }
    }

    const MappingComponent = () => {
        return (
            <ul className='search_ul'>
                {items.map((item, index) => (
                    <li 
                        key={index}
                        className='search_li'
                        onClick={() => {
                            setMyCity(item), 
                            setShowWeather(true),
                            setItems([])
                        }}
                        >
                        {item}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='SearchBox'>
            <div>Curious about the weather?</div>
            <div className='SearchBar'>
                <input 
                    className="SearchInput" 
                    placeholder="city"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    className='SearchOK'
                    onClick={handleSearch}
                >
                    OK
                </button>
            </div>
            { showWeather == false && <MappingComponent /> }
            { showWeather == true && <Weather myCity={myCity}/>}
        </div>
    )
}

export default Search
