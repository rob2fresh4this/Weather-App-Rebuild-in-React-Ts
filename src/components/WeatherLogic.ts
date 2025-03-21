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

export function get5DaysForcast(data: any) {
    let forecast = [];
    let addedDays = new Set(); // Track unique days to avoid duplicates

    for (let i = 0; i < data.list.length; i++) {
        const forecastEntry = data.list[i];
        const entryDate = new Date(forecastEntry.dt_txt);
        const day = entryDate.toLocaleString('en-US', { weekday: 'long' });

        // Ensure we get the first available forecast for today or 12:00 PM for other days
        if (!addedDays.has(day) && (i === 0 || forecastEntry.dt_txt.includes('12:00:00'))) {
            forecast.push({
                day,
                temp: roundCustom(forecastEntry.main.temp),
                temp_min: roundCustom(forecastEntry.main.temp_min),
                temp_max: roundCustom(forecastEntry.main.temp_max),
                description: forecastEntry.weather[0].description,
            });
            addedDays.add(day);
        }

        // Stop when we reach 5 days
        if (forecast.length === 5) break;
    }

    return forecast;
}

// Custom rounding function
function roundCustom(num: number): number {
    return (num % 1 > 0.4) ? Math.ceil(num) : Math.floor(num);
}


