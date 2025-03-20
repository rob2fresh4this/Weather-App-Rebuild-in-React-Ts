import StarIcon from '../../Assets/star-regular (1).svg'
import MagnifyingGlass from '../../Assets/magnifying-glass-solid (1).svg'
import Ellipsis from '../../Assets/ellipsis-solid.svg'
import { get5DaysForcast } from './WeatherLogic'
import DATA from './data.json'
import { APIkey } from './environment'
import { useEffect, useState } from 'react'

const WeatherApp = () => {
    const [forecast, setForecast] = useState<any[]>([]);
    const [cityName, setCityName] = useState('');
    const [usersInput, setUsersInput] = useState('');

    let key: string = APIkey; // Ensure key is always assigned

    async function getWeatherData(city: string) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`);
        const data = await response.json();
        console.log(data);

        if (data.city) {
            setCityName(`${data.city.name}, ${data.city.country}`);
            return data;
        } else {
            console.log('Error fetching weather data:', data);
            return null;
        }
    }

    async function handleSearch() {
        if (!usersInput.trim()) {
            alert('Please enter a city name');
            return;
        }

        const newData = await getWeatherData(usersInput); // Ensure we await data
        if (newData) {
            setForecast(get5DaysForcast(newData)); // Update state only if data is valid
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);

        function success(position: any) {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            console.log(`Longitude: ${lon} | Latitude: ${lat}`);
            GetUsersLocation(lon, lat);
        }

        function error() {
            console.log(`Error fetching location: getting dummy data`);
            console.log(DATA);
            setForecast(get5DaysForcast(DATA));
            setCityName(`${DATA.city.name}, ${DATA.city.country}`);
        }

        async function GetUsersLocation(lon: number, lat: number) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
            const data = await response.json();

            if (data.city) {
                setCityName(`${data.city.name}, ${data.city.country}`);
                setForecast(get5DaysForcast(data));
                console.log(data)
                console.log(get5DaysForcast(data));
            } else {
                console.log('Error fetching weather data:', data);
            }
        }
    }, []);


    return (
        <div className='w-[100%] h-screen bg-[#0E1323] text-[white] flex flex-col items-center justify-center'>
            <div className='w-[80%] h-[100px] p-7 rounded-[15px] flex justify-between bg-[#1C204B]'>
                <div className='flex items-center justify-between w-[100%] mr-4'>
                    <div className='text-[32px]'>{cityName}</div>
                    <img className="w-[41px] invert brightness-0" src={StarIcon} alt="Star" />
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center bg-white border-[3px] border-[#5747EA] px-[10px] w-[330px] h-[50px] rounded-[15px]'>
                        <img className='w-[30px]' src={MagnifyingGlass} alt="Magnifying Glass" />
                        <input
                            className="text-[18px] border-none text-[#7078C9] focus:outline-none focus:ring-0"
                            type="text"
                            placeholder="Search Location"
                            value={usersInput}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setUsersInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSearch} className='bg-[#0D6EFD] text-white hover:bg-blue-700 px-7 py-3 ml-4 rounded-[10px]'>Search</button>
                </div>
            </div>
            <br />

            <div className='w-[80%] flex justify-between'>
                {forecast.map((day, index) => (
                    <div key={index} className="w-[19%] bg-[#1C204B] rounded-[15px] pt-[30px] pb-[25px] px-[30px]">
                        <div className="flex justify-between items-center">
                            <div>{day.day}</div>
                            <img src={Ellipsis} className="w-[16px]" alt="3 dot" />
                        </div>
                        <div className="flex flex-col items-center mb-[15px]">
                            <div className="text-[40px] pb-[20px]">{day.temp}°F</div>
                            <div>High - {day.temp_max}°F</div>
                            <div>Low - {day.temp_min}°F</div>
                        </div>
                        <div className="flex justify-center items-center">{day.description}</div>
                    </div>
                ))}
            </div>

            {/* saved locations */}
            <div className='w-[80%] mt-[20px] bg-[#1C204B] rounded-[15px] p-7 '>
                <div className='flex justify-between items-center'>
                    <div>Stockton, CA</div>
                    <div>
                        <button className='bg-[#D9534F] text-white hover:bg-red-700 px-4 py-2 rounded-[10px]'>Remove</button>
                        <button className='bg-[#009925] text-white hover:bg-green-700 px-7 py-2 rounded-[10px]'>Go</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
