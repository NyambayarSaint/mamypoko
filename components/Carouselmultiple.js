import React from 'react';
import styled from 'styled-components';
import Carousel, {consts} from 'react-elastic-carousel';
import minimize from './miscs/minimize';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

const CarouselMultiple = ({ data }) => {
    const { config } = useContext(MenuContext);

    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <BiChevronLeft/> : <BiChevronRight/>
        return (
            <button className="button-arrow" onClick={onClick} disabled={isEdge}>
                {pointer}
            </button>
        )
    }

    return (
        <Container arrows={data.Arrows} radius={data.BorderRadius} container={data.Container} width={data.Width} style={{ background: data.BackgroundColor }}>
            {data.Caption && <h5>{data.Caption}</h5>}
            <Carousel itemsToShow={config.width > 768 ? data.SlidesPerRow : 1} renderArrow={myArrow} renderPagination={({ pages, activePage, onClick }) => {
                return (
                    <div className="pagination-custon-con">
                        {pages.map(page => {
                            const isActivePage = activePage === page
                            return (
                                <div className={`paginations-custom ${isActivePage}`} onClick={() => onClick(page)} key={page} />
                            )
                        })}
                    </div>
                )
            }}>
                {data.Sliders && data.Sliders.map(el => (
                    el.caption ?
                        <a href={el.caption ? el.caption : '#'} target="__blank" key={Math.random()}>
                            <div className="con">
                                <img alt={el.alternativeText} className="box" src={minimize(el, 'medium')} />
                                {el.alternativeText && <p>{el.alternativeText}</p>}
                            </div>
                        </a>
                        :
                        <div className="con" key={Math.random()}>
                            <img alt={el.alternativeText} className="box" src={minimize(el, 'medium')} />
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
    ${({ container }) => container && `
        padding:50px 10vw;
    `};
    .button-arrow{
        background:none;
        border:1px solid rgba(0,0,0,0.1);
        font-size:20px;
        align-self:center;
        border-radius:100%;
        outline:none;
    }
    .pagination-custon-con{
        display:flex;
        margin-top:15px;
        .paginations-custom{
            height:14px;
            width:14px;
            background:white;
            border-radius:100%;
            margin-right:14px;
            border:2px solid rgba(0,0,0,0.3);
            &.true{
                border:2px solid ${({ theme }) => theme.mainColor};
            }
            &:last-child{
                margin-right:0px;
            }
        }
    }
    h5{
        text-align:center;
        font-weight:bold;
        color:${({ theme }) => theme.mainColor};
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
        width: ${({ width }) => width && width};
        border-radius:${({ radius }) => radius};
        background-size: cover;
        background-position:center;
    }
    @media only screen and (max-width: 768px){
        padding:15px 15px;
        .box{
            width:100%;
            margin:0px;
        }
    }
`