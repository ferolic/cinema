import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faPoll ,faDotCircle } from '@fortawesome/free-solid-svg-icons'

const StyledItem = styled.div`
    color : var(--text-color);
    width : 100%;
    display: flex;
    align-items:center;
    padding : 1rem 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    line-height : 1;
    opacity : ${props => props.selected ? '1' : '0.6'};
    border-color: ${props =>
    props.selected
      ? 'var(--color-primary-dark)'
      : 'var(--color-primary-light)'};
    border : ${props => props.selected ? '1px solid' : '1px solid transparent'};
    border-radius: 2rem;
    text-decoration : none;
    cursor : pointer;
    transition : all 100ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:not(:last-child){
        margin-bottom : 3rem;
    }

    &:hover {
        border: 1px solid;
    }
`;

function renderIcon(title){
    switch(title){
        case 'Popular':
            return faHeart;
        case 'Top Rated':
            return faPoll;
        case 'Upcoming':
            return faCalendar;
        default :
            return faDotCircle;
    }
}

const MenuItem = ({ title }) => {
    return (
        <StyledItem>
            <FontAwesomeIcon 
                size="1x" 
                style={{ marginRight : '10px'}} 
                icon={renderIcon(title)} 
            />
            {title}
        </StyledItem>
    )
}

export default MenuItem
