import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import minimize from './miscs/minimize';
import {MenuContext} from '@/miscs/ContextMenuProvider'
import { useContext } from "react";

const CarouselMultiple = ({data}) => {
    const {config} = useContext(MenuContext);
    return (
        <Container arrows={data.Arrows} radius={data.BorderRadius} container={data.Container} width={data.Width} style={{background: data.BackgroundColor}}>
            {data.Caption && <h5>{data.Caption}</h5>}
            <Carousel itemsToShow={config.width > 768 ? data.SlidesPerRow : 1}>
                {data.Sliders && data.Sliders.map(el=>(
                    el.caption ? 
                    <a href={el.caption ? el.caption : '#'} target="__blank" key={Math.random()}>
                        <div className="con">
                            <img alt={el.alternativeText} className="box" src={minimize(el, 'medium')}/>
                            {el.alternativeText && <p>{el.alternativeText}</p>}
                        </div>
                    </a>
                    :
                    <div className="con" key={Math.random()}>
                        <img alt={el.alternativeText} className="box" src={minimize(el, 'medium')}/>
                        {el.alternativeText && <p>{el.alternativeText}</p>}
                    </div>
                ))}
            </Carousel>
        </Container>
    );
};

export default CarouselMultiple;

const Container = styled.div`
    padding:50px 15px;
    ${({container})=> container && `
        padding:50px 10vw;
    `};
    h5{
        text-align:center;
        font-weight:bold;
        color:${({theme})=>theme.mainColor};
        text-shadow:1px 1px 4px rgba(0,0,0,0.1);
    }
    a{
        text-decoration:none;
    }
    .con{
        outline:none;
        p{
            font-weight:bold;
            opacity:0.7;
            text-align:center;
            color:black;
            margin-top:15px;
        }
    }
    .box{
        margin:0px 15px;
        width:20vw;
        width: ${({width}) => width && width};
        border-radius:${({radius})=>radius};
        background-size: cover;
        background-position:center;
    }
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        .box{
            width:100%;
            margin:0px;
        }
    }
`