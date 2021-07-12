import { HOST_SERVER_STATIC } from 'contants';
import React from 'react';
import { DetailWeather } from 'redux/weatherSlice';
import './CardContainer.scss';

interface Props {
    weather: DetailWeather
    today: boolean
}
const CardContainer:React.FC<Props> = (props) => {
    const {weather,today} = props
    return (
        <div className="card__container">
            <h1>{today ? 'Today' : new Date(weather?.applicable_date).toLocaleDateString()}</h1>
            <img src={`${HOST_SERVER_STATIC}/static/img/weather/png/64/${weather?.weather_state_abbr ? weather.weather_state_abbr : 'hc' }.png`} alt="Anh thời tiết" />
            <div className="card__container-celsius">
                <p>
                    {Math.round(weather?.max_temp)}
                    <span>o</span>
                    <span>C</span>
                </p>
                <p>
                    {Math.round(weather?.min_temp)}
                    <span>o</span>
                    <span>C</span>
                </p>
            </div>
        </div>
    );
}

export default CardContainer;