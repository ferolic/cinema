import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { init } from '../actions';
import Sidebar from './Sidebar';
import Discover from './Discover';
import Genre from './Genre';
import Home from './Home';

const App = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(init())
    },[dispatch]);

    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/discover/:name'element={<Discover />} />
                <Route path='/genres/:name' element={ <Genre />} />
            </Routes>
        </Router>
    )
}   

export default App
