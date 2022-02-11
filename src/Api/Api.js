export const getCity = async (city) =>{
    let url = `https://www.metaweather.com/api/location/search/?query=${city}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
    }
}
export const getDataCity = async (woeid) =>{
    try {
        let url = `https://www.metaweather.com/api/location/${woeid}`
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}
export const getCurrentCity = async (lat, long) =>{
    try {
        let url = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}

