import StarIcon from '../../Assets/star-regular (1).svg'
import MagnifyingGlass from '../../Assets/magnifying-glass-solid (1).svg'
import Ellipsis from '../../Assets/ellipsis-solid.svg'
import { APIkey } from './environment'

const WeatherApp = () => {

    let apiKey = APIkey
    let cityName = 'Stockton'
    async function getWeatherData() {// cityName: string
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);
        const data = await response.json();
        return data;
    }

    function get5DaysForcast(data: any) {
        let filteredData = [];
        
        for (let item of data.list) {
            let dateTime = item.dt_txt; // Extract date-time string
            if (dateTime.includes("12:00:00")) { // Check if it's noon
                filteredData.push(item);
            }
        }
        return filteredData;
    }

    getWeatherData().then((data) => {
        console.log(get5DaysForcast(data));
    });


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
                <div className='w-[19%] bg-[#1C204B] rounded-[15px] pt-[30px] pb-[25px] px-[30px]'>
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
                </div>
                <div className='w-[19%] bg-[#1C204B] rounded-[15px] p-3'>
                    card 2
                </div>
                <div className='w-[19%] bg-[#1C204B] rounded-[15px] p-3'>
                    card 3
                </div>
                <div className='w-[19%] bg-[#1C204B] rounded-[15px] p-3'>
                    card 4
                </div>
                <div className='w-[19%] bg-[#1C204B] rounded-[15px] p-3'>
                    card 5
                </div>
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