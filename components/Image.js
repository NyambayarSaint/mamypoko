import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Image = ({data}) => {
    const R = useRouter();
    return (
        <Container
        center={data.Position === "center"}
        left={data.Position === "left"}
        right={data.Position === "right"}
        ghost={data.Ghost}
        >
            <img onClick={()=>data.Image.caption && R.push(data.Image.caption)} style={{ width: data.Width }} src={minimize(data.Image)} />
        </Container>
    );
};

export default Image;

const Container = styled.div `
    width:100%;
    position:relative;
    z-index:1;
    ${({center}) => center && `
        display:flex;
        justify-content:center;
    `};
    ${({left}) => left && `
        display:flex;
        justify-content:flex-start;
    `};
    ${({right}) => right && `
        display:flex;
        justify-content:flex-end;
    `};
    ${({ghost}) => ghost && `
        position:absolute;
        z-index:2;
    `};
    img{
        &:hover{
            cursor:pointer;
        }
    }
`