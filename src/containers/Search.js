import React , { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMoviesSearch, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = () => {
    const dispatch = useDispatch();

    const { query } = useParams();
    const config = useSelector(state => state.config);
    const movies = useSelector(state => state.movies);
    const { secure_base_url } = config.base.images;

    useEffect(() => {
        dispatch(getMoviesSearch(query))
        return () => clearMovies();
    },[dispatch,query]);

    return (
        <Wrapper>
           <MoviesList movies={movies} baseUrl={secure_base_url} />
        </Wrapper>
    )
}

export default Search
