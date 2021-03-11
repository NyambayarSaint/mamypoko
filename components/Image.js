import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Image = ({ data }) => {
    const R = useRouter();
    return (
        <Container MobileWidth={data.MobileWidth} MobileImage={data.MobileImage}
            center={data.Position === "center"}
            left={data.Position === "left"}
            right={data.Position === "right"}
            ghost={data.Ghost}
        >
            <img className="desktop" onClick={() => data.Image.caption && R.push(data.Image.caption)} style={{ width: data.Width }} src={minimize(data.Image)} />
            {data.MobileImage && <img className="mobile" onClick={() => data.MobileImage.caption && R.push(data.MobileImage.caption)} style={{ width: data.MobileWidth }} src={minimize(data.MobileImage)} />}
        </Container>
    );
};

export default Image;

const Container = styled.div`
    width:100%;
    position:relative;
    z-index:1;
    .desktop{
        display:block;
    }
    .mobile{
        display:none;
    }
    ${({ center }) => center && `
        display:flex;
        justify-content:center;
    `};
    ${({ left }) => left && `
        display:flex;
        justify-content:flex-start;
    `};
    ${({ right }) => right && `
        display:flex;
        justify-content:flex-end;
    `};
    ${({ ghost }) => ghost && `
        position:absolute;
        z-index:2;
    `};
    img{
        &:hover{
            cursor:pointer;
        }
    }
    @media only screen and (max-width: 768px){
        img{
            ${({MobileWidth})=>MobileWidth && `width: ${MobileWidth} !important`};
            object-fit: unset !important;
        }
        .desktop{
            ${({MobileImage})=>MobileImage && `display:none;`};
        }
        .mobile{
            ${({MobileImage})=>MobileImage && `display:block;`};
        }
    }
`