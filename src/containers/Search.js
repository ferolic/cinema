import React , { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMoviesSearch, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import { animateScroll as scroll } from 'react-scroll';

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

    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page');

    useEffect(() => {
        dispatch(getMoviesSearch(query, page))
        scroll.scrollToTop({
          smooth: true,
        });
        return () => clearMovies();
    },[dispatch,query, page]);

    if(movies.loading) {
        return <Loader />;
    } 
    
    // if there are no movies
    else if (movies.total_results === 0) {
        return (
          <NotFound
            title="Sorry!"
            subtitle={`There were no results for ${query}...`}
          />
        );
    }

    return (
        <Wrapper>
           <MoviesList movies={movies} baseUrl={secure_base_url} />
        </Wrapper>
    )
}

export default Search
