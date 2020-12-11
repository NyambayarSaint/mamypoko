import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Totofull3 = ({data}) => {
    return (
        <Container count={data.Images.length}>
            {data.Images.map(el=>{
                return(
                    <div
                        className="grids"
                        key={Math.random()}
                        style={{backgroundImage:`url(${minimize(el,'large')})`}}
                    />
                )
            })}
        </Container>
    );
};

export default Totofull3;

const Container = styled.div `
    display:flex;
    .grids{
        background:pink;
        height:300px;
        width: calc(100vw / ${props=>props.count});
        height: calc(100vw / ${props=>props.count});
        background-size: cover;
        background-position:center center;
    }
`