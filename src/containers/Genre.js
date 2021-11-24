import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { setSelectedMenu, getMoviesGenre } from '../actions';
import MoviesList from '../components/MoviesList';

const Wrapper = styled.div`
    display : flex;
    width : 100%;
    flex-direction : column;
`;

const Genre = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    const config = useSelector(state => state.config);
    const { secure_base_url } = config.base.images;

    useEffect(() => {
        dispatch(setSelectedMenu(name))
        dispatch(getMoviesGenre(name))
    },[dispatch, name]);

    // if loading
    if(movies.loading) return 'Loading...';

    return (
        <Wrapper>
            <MoviesList movies={movies} baseUrl={secure_base_url} />
        </Wrapper>
    )
}

export default Genre
