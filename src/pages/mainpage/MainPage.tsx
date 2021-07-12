import React, { useEffect, useState } from 'react';
import './MainPage.scss'
import Search from 'components/search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {HOST_SERVER_API, HOST_SERVER_STATIC} from '../../contants/index';
import { Button } from 'reactstrap';
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getWeather, selectWeather } from 'redux/weatherSlice';
import CardContainer from 'components/card/CardContainer';
import CardToday from 'components/card/CardToday';

interface MyLocation {
    distance: number
    title: string
    location_type: string
    woeid: number
    latt_long: string
  }

const initialMyLocation = {
    distance: 0,
    latt_long: "",
    location_type: "",
    title: "",
    woeid: 0
}

const MainPage:React.FC = () => {
    const [myLocation,setMyLocation] = useState<MyLocation>(initialMyLocation)
    const dispatch = useAppDispatch();
    const weather = useAppSelector(selectWeather)
    const [showSearch,setShowSearch] = useState<boolean>(false)

    useEffect(() =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show);
          }
    },[])
 
    function show (location: any) {
        const url = `${HOST_SERVER_API}/location/search/?lattlong=${location.coords.latitude},${location.coords.longitude}`;
        axios.get<Location>(url)
        .then((response: AxiosResponse) =>{
            setMyLocation(response.data[0])
            dispatch(getWeather(response.data[0].woeid))
        })
    }

    function handleClickLocation() {
        dispatch(getWeather(myLocation.woeid))
    }
    
    const handleClickShowSearch  = ( ) => {
        setShowSearch(!showSearch)
    }

    const renderListWeather = weather?.consolidated_weather.map((detail,index) => {
        return  <div className="col-2 col-sm-2">
                    <CardContainer key={index} weather={detail} today={index === 0 ? true : false}></CardContainer>
                </div>
    })

    return (
        <div className="wrapper">
            <div className="wrapper__left">
                <section className="location">
                    <Search show={showSearch} showSearch={handleClickShowSearch}></Search>
                    <Button className="location__btn" onClick={handleClickShowSearch}>Search for place</Button>
                    <div className="location__icon" onClick={handleClickLocation}>
                        <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                    </div>
                </section>
                <section className="weather__img">
                    <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/${weather.consolidated_weather.length ? weather.consolidated_weather[0].weather_state_abbr : 'hc' }.png`} alt="Anh thời tiết" />
                    <div className="weather__img-list">
                        <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/hc.png`} alt="Anh thời tiết" />
                        <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/hc.png`} alt="Anh thời tiết" />
                        <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/hc.png`} alt="Anh thời tiết" />
                        <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/hc.png`} alt="Anh thời tiết" />
                    </div>
                </section>
                <section className="celcius__today">
                    <h1>{weather.consolidated_weather.length ? Math.round(weather.consolidated_weather[0].the_temp ) : 0 }
                    </h1>
                    <div className="celcius__today-char">
                        <span className="celcius__o">o</span>
                        <span className="celcius__c">C</span>
                    </div>
                </section>
                <section className="weather__title">
                    <h1>
                        {weather.consolidated_weather.length ? weather.consolidated_weather[0].weather_state_name : 'Light'}
                    </h1>
                </section>
                <section className="weather__subtitle">
                    <p>
                        Today
                        <span>-</span>
                        {weather.consolidated_weather.length ? new Date(weather.consolidated_weather[0].applicable_date).toLocaleDateString() : ''}
                    </p>
                </section>
                <section className="weather__location">
                    <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                    <p>{weather.title}</p>
                </section>
            </div>
            <div className="wrapper__right">
                <div className="row weather__list">
                    {renderListWeather}
                </div>
                <div className="row weather__highlight">
                    <h1>Today's Highlight</h1>
                    <div className="col-3 col-sm-3">
                        <CardToday title="Wind" number={weather?.consolidated_weather[0]?.wind_speed} unit="mph"></CardToday>
                    </div>
                    <div className="col-3 col-sm-3">
                        <CardToday title="Humidity" number={weather?.consolidated_weather[0]?.humidity} unit="%"></CardToday>
                    </div>
                    <div className="col-3 col-sm-3">
                        <CardToday title="Visibility" number={weather?.consolidated_weather[0]?.visibility} unit="miles"></CardToday>
                    </div>
                    <div className="col-3 col-sm-3">
                        <CardToday title="AirPressure" number={weather?.consolidated_weather[0]?.air_pressure} unit="mb"></CardToday>
                    </div>
                    <p className="note__personal">Created by Than - https://github.com/than112211/weather</p>
                </div>  
            </div>
        </div>
    );
}

export default MainPage;