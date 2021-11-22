import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
    width : 100%;
    border-color: ${props =>
    props.selected
      ? 'var(--color-primary-dark)'
      : 'var(--color-primary-light)'};

`;

const MenuItem = ({ title }) => {
    return (
        <StyledItem>
            {title}
        </StyledItem>
    )
}

export default MenuItem
