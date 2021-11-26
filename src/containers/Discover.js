import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu, getMoviesDiscover,clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';
import { animateScroll as scroll } from 'react-scroll';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Discover = () => {
    const dispatch = useDispatch();

    const { name } = useParams();
    const movies = useSelector(state => state.movies);
    const lowercasedName = name.replace(/\s+/g, '_').toLowerCase()
    const config = useSelector(state => state.config);
    const { secure_base_url } = config.loading ? '' : config.base.images;

    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page');

    useEffect(() => {
        dispatch(setSelectedMenu(name));
        scroll.scrollToTop({
            smooth: true,
        });
        dispatch(getMoviesDiscover(lowercasedName, page))
        dispatch(clearMovies())
    },[dispatch, name, lowercasedName, page])

    if(movies.loading) return <Loader />
    if(config.loading) return <Loader />
    
    return (
        <Wrapper>
           {!config.loading &&  <MoviesList movies={movies} baseUrl={secure_base_url} />}
        </Wrapper>
    )
}

export default Discover
