import StarIcon from '../../Assets/star-regular (1).svg'
import MagnifyingGlass from '../../Assets/magnifying-glass-solid (1).svg'
import Ellipsis from '../../Assets/ellipsis-solid.svg'
import { APIkey } from './environment'
import DATA from './data.json'

const WeatherApp = () => {


    let apiKey = APIkey
    let cityName = 'Stockton'
    async function getWeatherData() {// cityName: string
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);
        const data = await response.json();
        console.log(data)
        return data;
    }

    // async function getWeatherData() {
    //     const data = DATA
    //     console.log(data)
    //     return data
    // }

    getWeatherData()

    function get5DaysForcast(data: any) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let today = new Date().getDay()
        let forcast = []
        for (let i = 0; i < 5; i++) {
            let day = days[(today + i) % 7]
            let temp = data.list[i].main.temp
            let temp_min = data.list[i].main.temp_min
            let temp_max = data.list[i].main.temp_max
            let description = data.list[i].weather[0].description
            forcast.push({ day, temp, temp_min, temp_max, description })
        }
        return forcast
    }

    let forecast = get5DaysForcast(DATA)

    return (
        <div className='w-[100%] h-screen bg-[#0E1323] text-[white] flex flex-col items-center justify-center'>
            <div className='w-[80%] h-[100px] p-7 rounded-[15px] flex justify-between bg-[#1C204B]'>
                <div className='flex items-center'>
                    <div className='text-[32px]'>Stockton, CA</div>
                    <img className="w-[41px] invert brightness-0" src={StarIcon} alt="Star" />
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center bg-white px-[10px] w-[330px] h-[50px] rounded-[15px]'>
                        <img className='w-[30px]' src={MagnifyingGlass} alt="Magnifying Glass" />
                        <input className='text-[18px] border-none' type="text" placeholder="Search Location" />
                    </div>
                    <img className="w-[41px] invert brightness-0" src={StarIcon} alt="Star" />
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

export default WeatherApp



{/* < div className='w-[19%] bg-[#1C204B] rounded-[15px] pt-[30px] pb-[25px] px-[30px]' >
<div className='flex justify-between items-center'>
    <div>Monday</div>
    <img src={Ellipsis} className='w-[16px]' alt="3 dot" />
</div>
<div className='flex flex-col items-center mb-[15px]'>
    <div className='text-[40px] pb-[20px]'>xxx°F</div>
    <div>High - xxx°F</div>
    <div>Low - xxx°F</div>
</div>
<div className='flex justify-center items-center'>Main Description</div>
</div > */}