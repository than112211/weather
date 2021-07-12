import { PayloadAction } from '@reduxjs/toolkit'
import { HOST_SERVER_API } from 'contants';
import {put, takeEvery} from 'redux-saga/effects'
import { getWeather, setWeather } from 'redux/weatherSlice'
import axios, { AxiosResponse } from 'axios';

type URL = string
export type WoeID = number

function* trackingGetWeatehr(action: PayloadAction<WoeID>){
    const url:URL = yield `${HOST_SERVER_API}/location/${action.payload}`;
    const data:AxiosResponse = yield axios.get(url)
    yield put(setWeather(data.data))
}

function* weatherSaga() {
    yield takeEvery(getWeather,trackingGetWeatehr)
}
export default weatherSaga