import { configureStore, ThunkAction, Action ,getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'saga';
import weatherReducer from '../redux/weatherSlice'

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
