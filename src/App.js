import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { getCity, getDataCity, getCurrentCity } from './Api/Api'
import InfoCity from './components/InfoCity';
import customBg from './img/customBg.jpg'
import scrollreveal from 'scrollreveal';


function App() {


  const getCurrentLocation = async() =>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        fetchCustomCity(lat, lon);
      });      
    } else {
      console.log('No se permito la localizacion')
    }
  }

  

  const fetchCustomCity = async(lat, lon) =>{
    if(lat, lon){
      try {
        const result = await getCurrentCity(lat, lon)
        const allDataCity = await getDataCity(result[0].woeid)
        setCityInfo([allDataCity])
        console.log(allDataCity)
      } 
      catch (error) {
        console.log(error)
      }
     
    }
  }

  useEffect(()=>{
    getCurrentLocation()
  },[])


  const [cityInfo, setCityInfo] = useState([])
  const [noExist, setNoExist] = useState(false);

  const onSearch = async(city)=>{
    
    if(city === ''){
      setNoExist(false)
      getCurrentLocation();
    }
    else{
      try {
        const data = await getCity(city)
        if(data.length === 0){
          setNoExist(true)
          getCurrentLocation();
        }else{
          const getFullData = data.map(city =>{
            const cityId = city.woeid;
            return cityId;
          })
          const cityResult = await getDataCity(getFullData);
          setCityInfo([cityResult])
          
        }
      } catch (error) {
        console.log(error)
      }
    }
    
  }

  const revealFunction = () =>{
    
    scrollreveal().reveal('.reveal',{
      reset:true
    })
    scrollreveal().reveal('.upReveal',{
        reset:true,
        origin: 'top',
        distance: '50px',
        interval: 100
    })
  }

  useEffect(()=>{
    revealFunction();
  },[cityInfo])


  return (
    <div className="App">
      <picture className='bgWeather customBg'>
        <img src={customBg} alt="" />
      </picture>
      <Header 
        onSearch={onSearch} 
        currentLocation={getCurrentLocation}
        noExist={noExist}
      />
      {cityInfo.length === 0 ?
        <div className='loading'>
          <h1><i class='bx bx-loader-circle bx-spin' ></i> Loading...</h1>
        </div>
        :
        <InfoCity cityData={cityInfo} />
      }
    </div>
  );
}

export default App;
