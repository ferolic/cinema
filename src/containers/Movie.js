import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../actions';
import  Loader from '../components/Loader';

const Movie = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useSelector(state => state.movie);

    useEffect(() => {
        dispatch(getMovie(id))
    },[dispatch, id ]);

    //
    if (movie.loading) return  <Loader />;

    return (
        <div>
            {movie.title}
        </div>
    )
}

export default Movie
