import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu, getMoviesDiscover,clearMovies } from '../actions';

import MoviesList from '../components/MoviesList';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Discover = () => {
    const { name } = useParams();
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const lowercasedName = name.replace(/\s+/g, '_').toLowerCase()
    const config = useSelector(state => state.config);
    const { secure_base_url } = config.base.images;
    
    useEffect(() => {
        dispatch(setSelectedMenu(name));
        dispatch(clearMovies())
        dispatch(getMoviesDiscover(lowercasedName))
    },[dispatch, name, lowercasedName])

    if(movies.loading) return 'loading...'
    return (
        <Wrapper>
            <MoviesList movies={movies} baseUrl={secure_base_url} />
        </Wrapper>
    )
}

export default Discover
