import StarIcon from '../../Assets/star-regular (1).svg'
import MagnifyingGlass from '../../Assets/magnifying-glass-solid (1).svg'

const WeatherApp = () => {
    return (
        <>
            <div>
                <div className='flex items-center'>
                    <div className='text-[32px]'>Stockton, CA</div>
                    <img className="w-[41px]" src={StarIcon} alt="Star" />
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <img className='w-[30px]' src={MagnifyingGlass} alt="Magnifying Glass" />
                        <input className='text-[18px]' type="text" placeholder="Search Location" />
                    </div>
                    <img className="w-[41px]" src={StarIcon} alt="Favorites" />
                </div>
            </div>
        </>
    )
}

export default WeatherApp