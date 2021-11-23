import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu, getMoviesDiscover,clearMovies } from '../actions';

const Discover = () => {
    const { name } = useParams();
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const lowercasedName = name.replace(/\s+/g, '_').toLowerCase()
    
    useEffect(() => {
        dispatch(setSelectedMenu(name));
        dispatch(clearMovies())
        dispatch(getMoviesDiscover(lowercasedName))
    },[dispatch, name, lowercasedName])

    if(movies.loading) return 'loading...'
    return (
        <div>
            {movies.results.map((movie) => (
                <p key={movie.id}> {movie.title} </p>
            ))}
        </div>
    )
}

export default Discover
