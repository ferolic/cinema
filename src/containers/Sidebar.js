import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';

import Searchbar from '../components/Searchbar';
import MenuItem from '../components/MenuItem';
import slidestyle from '../utils/slidestyle';
import TmdbLogoGreen from '../svg/tmdbgreen.svg';

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

const StyledCoffee = styled.a`
    display: flex !important;
    outline : none;
    justify-content: center !important;
    align-items: center !important;
    padding : 0.5rem 2rem;
    color : #000000;
    background-color: #ffffff;
    border-radius: 3px;
    text-decoration : none;
    font-family : 'Poppins', sans-serif;
    font-size : 1.2rem;
    letter-spacing: 0.6px;
    box-shadow : 0px 1px 2px rgba(190, 190, 190, 0.5);
    margin : 2rem auto;
    transition : 0.3s all linear;

    &img{
        width : 27px;
        box-shadow : none;
        border : none;
        vertical-align: middle;   
    }

    &:hover,
    &:active,
    &:focus {
        text-decoration: none;
        box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
        opacity: 0.85;
        color: #000000;
    }
`;

const CopyRight = styled.div`
    display : flex;
    align-self : center;
    align-items : center;
    color : #fff;
    margin-bottom : 2rem;
`;

const StyledLink = styled.a`
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    color: inherit;
`;

const Svg = styled.img`
    max-width: 100%;
    height: 3rem;
    display: inline-block !important;
    margin-bottom: 1.4rem !important;
`;

const Sidebar = () => {
    const config = useSelector((state) => state.config );
    const { staticCategories , genres , loading , selected  } = config;
    const [isOpened, setisOpened] = useState(false);

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
                {renderStatic(staticCategories, selected, setisOpened)}
                <Heading> Genres </Heading>
                {!loading && renderGenres(genres ,selected, setisOpened)}
                <StyledCoffee>
                    <img
                        src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
                        alt="Buy me a coffee"
                    />
                    <span style={{ marginLeft:'5px'}}> Buy me a coffee </span>
                </StyledCoffee> 
                <CopyRight>
                    CopyRight ©
                    <StyledLink href='https://www.github.com/ferolic'> 
                        Ferolic 
                    </StyledLink>
                </CopyRight> 
                <Svg
                    src={`${TmdbLogoGreen}`}
                    alt="The Movie Database"
                />
            </Menu> 
        </>
    )
}

function renderStatic(categories , selected, setisOpened){
    return categories.map((category, i) => (
       <LinkWrap 
            to={`/discover/${category}`} 
            key={i} 
            onClick={setisOpened ? () => setisOpened(false) : null}
        >
            <MenuItem 
                title={category} 
                selected={category === selected ? true : false} 
            />
       </LinkWrap>
    ))
}

function renderGenres(genres,selected,setisOpened) {
    return genres.map(genre => (
        <LinkWrap 
            to={`/genres/${genre.name}`} 
            key={genre.id}
            onClick={setisOpened ? () => setisOpened(false) : null}
        >
            <MenuItem 
                title={genre.name} 
                selected={ genre.name === selected ? true : false} 
            />
        </LinkWrap>
    ))
}
export default Sidebar
