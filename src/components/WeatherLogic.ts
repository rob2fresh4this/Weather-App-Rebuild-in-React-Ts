export function getFromLocalStorage() {
    console.log('Getting from local storage');
    let localStorageData = localStorage.getItem('CityORState');
    if (localStorageData === null) {
        return [];
    }
    return JSON.parse(localStorageData); // Return as array
}

export function saveToLocalStorage(CityORStat: string) {
    console.log(`Saving ${CityORStat} to local storage`);
    let getCityOrState = getFromLocalStorage(); // Get the current list
    if (!getCityOrState.includes(CityORStat)) {
        getCityOrState.push(CityORStat); // Add to the array if not already present
        localStorage.setItem('CityORState', JSON.stringify(getCityOrState)); // Save updated list
    }
}

export function removeFromLocalStorage(CityORStat: string) {
    console.log(`Removing ${CityORStat} from local storage`);
    let getCityOrState = getFromLocalStorage(); // Get the current list
    let index = getCityOrState.indexOf(CityORStat); // Find index of the item to remove
    if (index > -1) {
        getCityOrState.splice(index, 1); // Remove the item
        localStorage.setItem('CityORState', JSON.stringify(getCityOrState)); // Save updated list
    }
}



export function get5DaysForcast1(data: any) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date().getDay();
    let forecast = [];
    for (let i = 0; i < 5; i++) {
        let day = days[(today + i) % 7];
        let temp = data.list[i].main.temp;
        let temp_min = data.list[i].main.temp_min;
        let temp_max = data.list[i].main.temp_max;
        let description = data.list[i].weather[0].description;
        forecast.push({ day, temp, temp_min, temp_max, description });
    }
    return forecast;
}

export function get5DaysForcast(data: any) {
    // Filter for forecast data at 12:00:00
    const ForecastList = data.list.filter((item: { dt_txt: string }) => item.dt_txt.includes('12:00:00'));
    let forecast = [];
    // Loop to get data for the next 5 days
    for (let i = 0; i < 5; i++) {
        const forecastEntry = ForecastList[i];
        // Ensure that forecast data exists
        if (!forecastEntry) {
            continue;
        }

        const day = new Date(forecastEntry.dt_txt).toLocaleString('en-US', { weekday: 'long' });
        const temp = forecastEntry.main.temp;
        const temp_min = forecastEntry.main.temp_min;
        const temp_max = forecastEntry.main.temp_max;
        const description = forecastEntry.weather[0].description;
        forecast.push({ day, temp, temp_min, temp_max, description });
    }

    return forecast;
}
