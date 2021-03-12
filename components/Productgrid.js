import React from 'react';
import styled from 'styled-components';
import Carousel, { consts } from 'react-elastic-carousel';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import minimize from './miscs/minimize';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Productgrid = ({ data }) => {
    const { config } = useContext(MenuContext);
    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <BiChevronLeft /> : <BiChevronRight />
        return (
            <button className="button-arrow" onClick={onClick} disabled={isEdge}>
                {pointer}
            </button>
        )
    }
    return (
        <Container className="container">
            <div className="title">
                <p>{data.Title}<br /><span>{data.Type}&nbsp;</span> {data.Weight}</p>
            </div>
            <Carousel itemsToShow={config.width > 768 ? 4 : 1} renderArrow={myArrow}
                renderPagination={({ pages, activePage, onClick }) => {
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
                }}
            >
                {data.Entries.map(el => (
                    <div className="box" key={Math.random()}>
                        <img src={minimize(el.Image)} className="image" />
                        <div className="description">
                            <div className="each">
                                <img src="/img/piece.png" />
                                <p>{el.Piece}</p>
                            </div>
                            <div className="each">
                                <img src="/img/pack.png" />
                                <p>{el.Pack}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </Carousel>
        </Container>
    );
};

export default Productgrid;

const Container = styled.div`
    margin-top:8vh;
    margin-bottom:8vh;
    padding:1px 15px 15px;
    ${'' /* border:1px solid ${({theme})=>theme.mainColor}; */}
    box-shadow: 1px 1px 5px ${({ theme }) => theme.mainColor};
    border-radius:30px;
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
    .title{
        background:${({ theme }) => theme.mainColor};
        padding:8px 15px;
        border-radius:15px;
        width:fit-content;
        margin-top:-32px;
        margin-left:-45px;
        display:block;
        box-shadow:2px 2px 10px #0054a6;
        position:absolute;
        p{
            margin:0px;
            font-weight:bold;
            color:white;
            text-align:center;
            span{
                color:#f0c539;
            }
        }
    }
    .rec-pagination{
        display:none;
    }
    .box{
        text-align:center;
        .image{
            height:200px;
        }
        .description{
            display:flex;
            justify-content:center;
            gap:15px;
            .each{
                display:flex;
                align-items:center;
                gap:10px;
                img{
                    width:35px;
                    height:35px;
                }
                p{
                    margin:0px;
                    font-weight:bold;
                    color:${({ theme }) => theme.mainColor3};
                    font-size: 20px;
                }
            }
            
        }
    }
    @media only screen and (max-width: 768px){
        .title{
            margin-left:0px;
        }
        margin-top:15px;
        margin-bottom:15px;
    }
`