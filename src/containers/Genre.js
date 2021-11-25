import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { setSelectedMenu, getMoviesGenre, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';
import { animateScroll as scroll } from 'react-scroll';

const Wrapper = styled.div`
    display : flex;
    width : 100%;
    flex-direction : column;
`;

const Genre = () => {
    const dispatch = useDispatch();
    const { name  } = useParams();
    const movies = useSelector(state => state.movies);
    const config = useSelector(state => state.config);
    const { secure_base_url } = config.base.images;
    
    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page');

    useEffect(() => {
        dispatch(setSelectedMenu(name))
        scroll.scrollToTop({
            smooth: true,
        });
        dispatch(getMoviesGenre(name , page))
        return () => clearMovies();
    },[dispatch, name , page]);

    // if loading
    if(movies.loading) return <Loader />;

    return (
        <Wrapper>
            <MoviesList movies={movies} baseUrl={secure_base_url} />
        </Wrapper>
    )
}

export default Genre
