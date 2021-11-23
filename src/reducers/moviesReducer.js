import * as TYPES from '../actions/types';

const moviesReducer = ( state = { loading : true} , action) => {
    switch(action.type){
        case TYPES.FETCH_MOVIES_GENRE:
        case TYPES.FETCH_MOVIES_DISCOVER:
            return { ...state, ...action.payload}
        case TYPES.FETCH_MOVIES_LOADING:
            return { ...state, loading : true }
        case TYPES.FETCH_MOVIES_FINISHED:
            return {...state, loading : false }
        default :
            return state;
    }
}

export default moviesReducer;