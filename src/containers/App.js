import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { init } from '../actions';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(init())
    },[dispatch]);

    return (
        <div>
            My App
        </div>
    )
}   

export default App
