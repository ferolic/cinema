import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedMenu, getMoviesGenre} from '../actions';
import { useParams  } from 'react-router-dom';

const Genre = () => {
    const { name } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedMenu(name))
    },[dispatch, name]);

    useEffect(() => {
        dispatch(getMoviesGenre(name))
    },[dispatch , name]);

    return (
        <div>
           {name}       
        </div>
    )
}



export default Genre
