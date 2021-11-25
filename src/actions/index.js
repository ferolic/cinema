import * as TYPES from './types';
import tmdbAPI from '../api/tmdb';

export const init = () => async(dispatch) => {
    dispatch({ type : TYPES.SET_LOADING })
    await dispatch(getConfig());
    await dispatch(getGenres());
    dispatch({ type : TYPES.REMOVE_LOADING })
};

// get config object from the api
export const getConfig = () => async(dispatch) => {
    const res = await tmdbAPI.get('/configuration');
    dispatch({
        type : TYPES.GET_CONFIG,
        payload : res.data
    })
};

// get genres from the api
export const getGenres = () => async(dispatch) => {
    const res = await tmdbAPI.get('/genre/movie/list');
    dispatch({
        type : TYPES.GET_GENRES,
        payload : res.data,
    })
}

// set the current selected menu
export const setSelectedMenu = name => (dispatch, getState) => {
    const { staticCategories, genres , loading } = getState().config;
    if(!loading){
        if(!name){
            dispatch({ type : TYPES.REMOVE_SELECTED_MENU })
        } else if(
            staticCategories.find(category => category === name) ||
            genres.find(genre => genre.name === name)
        ) {
            dispatch({ 
                type : TYPES.SET_SELECTED_MENU, 
                payload : name 
            })
        }
    }
}

// Get movies by genre
export const getMoviesGenre = (name) => async (
    dispatch,
    getState
  ) => {
    const { selected, genres } = getState().config;
    if (!selected) {
      return;
    }
    try {
      dispatch({ type: TYPES.FETCH_MOVIES_LOADING });
      const genreId = genres
        .filter(el => el.name === name)
        .map(el => el.id)
        .join('');
      const res = await tmdbAPI.get('/discover/movie', {
        params: {
          with_genres: genreId,
        },
      });
      await dispatch({
        type: TYPES.FETCH_MOVIES_GENRE,
        payload: res.data,
      });
      dispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
    } catch (err) {
      dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    }
  };

// Get movies discover
export const getMoviesDiscover = (name) => async (dispatch, getState) => {
  const { selected } = getState().config;
  if (!selected) {
    return;
  }
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_LOADING });
    const res = await tmdbAPI.get(`/movie/${name}`);
    await dispatch({
      type: TYPES.FETCH_MOVIES_DISCOVER,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
  }
};

// Get Movies Search
export const getMoviesSearch = (query) => async(dispatch) => {
    try{
      dispatch({ type : TYPES.FETCH_MOVIES_LOADING });
      const res = await tmdbAPI.get('/search/movie', {
        params : {
          query,
        }
      });
       
      await dispatch({
        type : TYPES.FETCH_MOVIES_SEARCH,
        payload : res.data,
      })

      dispatch({ type : TYPES.FETCH_MOVIES_FINISHED})
    } catch(err){
      dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    }
}


export const clearMovies = () => {
    return {
        type : TYPES.FETCH_MOVIES_LOADING
    }
}