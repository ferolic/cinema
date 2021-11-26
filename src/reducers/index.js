import { combineReducers } from 'redux';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import errorReducer from './errorReducer';
import movieReducer from './movieReducer';


export default combineReducers({
    config: configReducer,
    movies : moviesReducer,
    error : errorReducer,
    movie : movieReducer,
})