import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WoeID } from 'saga/weather';
import { RootState } from '../app/store';

export interface DetailWeather {
    air_pressure: number,
    applicable_date: string,
    created: string,
    humidity: number,
    id: number,
    max_temp: number,
    min_temp: number,
    the_temp: number,
    predictability: number,
    visibility: number
    weather_state_abbr: string,
    weather_state_name: string,
    wind_direction: number,
    wind_direction_compass: string,
    wind_speed: number
}
export interface Weather {
    consolidated_weather: DetailWeather[],
    latt_long: string,
    location_type: string,
    parent: string,
    sources: object,
    sun_rise: string,
    sun_set: string,
    time: string,
    timezone: string,
    timezone_name : string,
    title: string,
    woeid: number,
}

const innitWeather: Weather = {
    consolidated_weather: [],
    latt_long: "",
    location_type: "",
    parent: "",
    sources: [],
    sun_rise: "",
    sun_set: "",
    time: "",
    timezone: "",
    timezone_name : "",
    title: "",
    woeid: 0,
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState : innitWeather,
  reducers: {
    getWeather: (state,action: PayloadAction<WoeID>) => {

    },

    setWeather: (state,action: PayloadAction<Weather>) =>
        state = action.payload
  }
});
const {actions,reducer} = weatherSlice
export const { getWeather,setWeather } = actions;
export default reducer;

export const selectWeather = (state: RootState) => state.weather;
