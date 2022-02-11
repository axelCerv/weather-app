import moment, { now } from 'moment';
import React, { useEffect, useState } from 'react'

import rainImage from '../img/rain.jpg'
import snowImage from '../img/snow.jpg'
import sunImage from '../img/sun.jpg'
import cloudImage from '../img/cloud.jpg'

function InfoCity(props) {

    const { cityData } = props;

    const [nowTime, setNowTime] = useState(moment().format('h:mm:ss a'))
    const [bgImage, setbgImage] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
            setNowTime(moment().format('h:mm:ss a'))
        },1000)
    },[nowTime])


    const weatherImage = async() =>{
        const weather = await cityData.map((city)=>{
            const name = city.consolidated_weather[0].weather_state_name;
            return name
        })
        const state = weather.toString();
        if(state === 'Snow' || state === 'Sleet'){
            setbgImage(snowImage) 
        }else if(state === 'Hail' || state === 'Thunder' || state === 'Heavy Rain' || state === 'Light Rain'){
            setbgImage(rainImage)
        }else if(state === 'Showers' || state === 'Heavy Cloud'){
            setbgImage(cloudImage)
        }else if(state === 'Light Cloud' || state === 'Clear'){
            setbgImage(sunImage)
        }
    }

    useEffect(()=>{
        weatherImage();
    },[cityData])


    const date = moment().format('MMMM Do YYYY')


    const convertDeg = (deg) =>{
        let pre = parseInt(deg) ;
        return pre.toFixed(0)
    }

  return (
    <>
        {!cityData
        ? 
        <h1>No existe Ciudad</h1>

        :
        
        cityData.map((city, idx)=>{

            const todayInfo = city.consolidated_weather[0];

            return (
            <div className='dataCity container' key={idx}>

                <picture className='bgWeather reveal'>
                    <img src={ bgImage } alt="" />
                </picture>

                <div className='cityHero'>
                    <div className='cityMain'>

                        <div className='cityHead'>
                            <h1>{city.parent.title + ', ' + city.title}</h1>
                            <p className='time'>{date}</p>
                        </div>

                        <div className='cityWeather'>
                            <div className='weatherDay'>
                                <p className='todayDeg'>
                                    {convertDeg(todayInfo.the_temp)}<sup>°c</sup>
                                </p>
                                <img 
                                    src={`https://www.metaweather.com/static/img/weather/${todayInfo.weather_state_abbr}.svg`} 
                                    alt="" 
                                    className='todayImage'
                                />
                            </div>
                            <p className='todayNameWeather'>
                                    {todayInfo.weather_state_name}
                            </p>
                        </div>         
                            
                    </div>

                    <div className='weather'>
                        <p className='dayName'>Today</p>
                        <div className='weatherInfo reveal'>
                            <div className='contentInfoToday'>
                                <p className='headInfo'>Weather Details</p>
                                <div className='itemInfo'>
                                    <p>
                                        Max:
                                    </p>
                                    <p>
                                        {convertDeg(todayInfo.max_temp)}<sup>°c</sup>
                                    </p>
                                </div>
                                <div className='itemInfo'>
                                    <p>Min:</p>
                                    <p>
                                        {convertDeg(todayInfo.min_temp)}<sup>°c</sup>
                                    </p>
                                </div>
                                <div className='itemInfo'>
                                    <p>Himidity:</p>
                                    <p>
                                        {convertDeg(todayInfo.humidity)}
                                    </p>
                                </div>
                                <div className='itemInfo'>
                                    <p>Wind direction:</p>
                                    <p>
                                        {convertDeg(todayInfo.wind_direction)}
                                    </p>
                                </div>
                                <div className='itemInfo'>
                                    <p>Wind speed:</p>
                                    <p>
                                        {convertDeg(todayInfo.wind_speed)} km/h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hour'>
                    <p>{nowTime}</p>
                </div>
                <div className='nextDays'>
                        {city.consolidated_weather.map((day, idx)=>{
                            return (
                                <div className='day upReveal' key={idx}>
                                    <header className='dayName'>
                                        {moment(day.applicable_date).format('dddd Do')}
                                    </header>
                                    <div className='weatherDay'>
                                        <img src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`} alt="" />
                                        <div>
                                            <p className='degDay'>
                                                {convertDeg(day.max_temp)}<sup>°c</sup>
                                            </p>
                                            <p className='degDay minDeg'>
                                                {convertDeg(day.min_temp)}<sup>°c</sup>
                                            </p>
                                        </div>
                                    </div>
                                    <p className='kindWeather'>
                                        {day.weather_state_name}
                                    </p>
                                    
                                    
                                </div>    
                                );
                            })
                        }
                </div>
            </div>
            )
        })
        }
    </>
  )
}

export default InfoCity