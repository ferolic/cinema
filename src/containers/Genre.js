import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedMenu, getMoviesGenre } from '../actions';

const Genre = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(setSelectedMenu(name))
        dispatch(getMoviesGenre(name))
    },[dispatch, name]);

    // if loading
    if(movies.loading) return 'Loading...';

    return (
        <div>
            {movies.results.map((movie) => (
                <p key={movie.id}> {movie.title} </p>
            ))}
        </div>
    )
}

export default Genre
