import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';

import Searchbar from '../components/Searchbar';
import MenuItem from '../components/MenuItem';
import slidestyle from '../utils/slidestyle';

const WrapperStickyBox = styled(StickyBox)`
    width: 100%;
    z-index : 999;
    display : flex;
    justify-content : space-between;
    align-items: center;
    padding : 1.5rem 2rem;
    background-color: var(--color-primary-lighter);
    box-shadow: 0 2px 40px var(--shadow-color);
`;

const Hamburguer = styled.div`
    border : none;
    outline : none;
    display : flex;
    flex-direction : column;
    align-self: center;
    justify-content: space-around;
    width : 25px;
    line-height: 1;
    height : auto;
    background-color: transparent;
    cursor: pointer;
`;

const Bar = styled.span`
    transition : all 0.3s;
    border-radius: 10px;
    margin : 2px 0;
    height: 4px;
    width : 100%;
    display: inline-block;
    background-color: var(--color-primary);
`;

const Heading = styled.h2`  
    font-weight: 700;
    font-size : 1.1rem;
    text-transform:uppercase;
    letter-spacing: -0.5px;
    margin : 0 0 1rem 1rem;

    &:not(:first-child){
        margin-top: 4rem;
    }
`;

const LinkWrap = styled(Link)`
    text-decoration: none;
    display : block;
    outline : none;
    margin-bottom : 0.5rem;
`;

const Sidebar = () => {
    const config = useSelector((state) => state.config );
    const { staticCategories , genres , loading  } = config;
    const [isOpened, setisOpened] = useState(true);

    const isMenuOpen = ({isOpened}) => {
        setisOpened(isOpened)
    }

    return (
        <>
            <WrapperStickyBox>
                <Hamburguer onClick={() => setisOpened(true)}>
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburguer>
                <Searchbar />
            </WrapperStickyBox>  
            <Menu isOpen={isOpened} onStateChange={isMenuOpen}  styles={slidestyle} >
                <Heading> Discover </Heading>
                {renderStatic(staticCategories)}
                <Heading> Genres </Heading>
                {!loading && renderGenres(genres)}   
            </Menu> 
        </>
    )
}

function renderStatic(categories){
    return categories.map((category, i) => (
       <LinkWrap 
            to={`/discover/${category}`} 
            key={i} 
        >
            <MenuItem title={category} />
       </LinkWrap>
    ))
}

function renderGenres(genres) {
    return genres.map(genre => (
        <LinkWrap to={`/genres/${genre.name}`} key={genre.id}>
            <MenuItem title={genre.name} />
        </LinkWrap>
    ))
}
export default Sidebar
