import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import Carousel, { consts } from 'react-elastic-carousel';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import { useRouter } from 'next/router';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

const ChooseRetailer = ({ data }) => {
    const { config } = useContext(MenuContext);
    const R = useRouter();

    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <BiChevronLeft /> : <BiChevronRight />
        return (
            <button className="button-arrow" onClick={onClick} disabled={isEdge}>
                {pointer}
            </button>
        )
    }

    return (
        <Container SlidesPerRow={data.SlidesPerRow}>
            <h4>{data.Title}</h4>
            <div className="box">
                <Carousel itemsToShow={config.width > 768 ? data.SlidesPerRow : 1} renderArrow={myArrow}
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
                    }}>
                    {data.Retailers.map(el => (
                        <div className="piece" onClick={() => el.Link && R.push(el.Link)}>
                            {el.Link && <a target="__blank" href={el.Link}>
                                <div className="popup">
                                    <div className="link"><BiLinkExternal /></div>
                                    <div className="caption">Харилцагчруу чиглүүлэх</div>

                                    {el.Ebarimt && <div className="list"><AiOutlineCheck /> И-баримттай</div>}
                                    {el.FreeDelivery && <div className="list"><AiOutlineCheck /> Хүргэлт үнэгүй</div>}
                                    {el.Gift && <div className="list"><AiOutlineCheck /> Бэлэгтэй</div>}
                                </div>
                            </a>}
                            {el.Image && <img src={minimize(el.Image, 'medium')} />}
                            {el.SmallText && <div className="small">{el.SmallText}</div>}
                            {el.BigText && <div className="big">{el.BigText}</div>}
                        </div>
                    ))}
                </Carousel>
            </div>
        </Container>
    );
};

export default ChooseRetailer;

const Container = styled.div`
    padding-left:10vw;
    padding-right:10vw;
    margin-top:5vh;
    margin-bottom:5vh;
    h4{
        font-weight:bold;
        text-align:center;
        color:${({ theme }) => theme.mainColor3};
        margin-bottom:20px;
    }
    .button-arrow{
        background:none;
        border:1px solid rgba(0,0,0,0.1);
        font-size:20px;
        align-self:center;
        border-radius:100%;
        outline:none;
    }
    .box{
        border:1px solid ${({ theme }) => theme.mainColor};
        padding:30px 0px 15px;
        display:flex;
        border-radius:30px;
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
        .piece{
            text-align:center;
            position:relative;
            img{
                height:300px;
                object-fit:contain;
                ${({ SlidesPerRow }) => SlidesPerRow && `
                    height:calc(80vw / ${SlidesPerRow});
                `};
            }
            .popup{
                position:absolute;
                width:100%;
                padding:15px;
                ${({ SlidesPerRow }) => SlidesPerRow && `
                    height:calc(80vw / ${SlidesPerRow});
                    margin-top:calc(-80vw / ${SlidesPerRow});
                `};
                opacity:0;
                display:flex;
                justify-content:center;
                flex-direction:column;
                background:${({ theme }) => theme.mainColor};
                color:white;
                transition:0.5s ease;
                .list{
                    font-weight:bold;
                }
                .link{
                    svg{
                        font-size: 30px;
                    }
                }
                .caption{
                    margin-bottom:15px;
                }
            }
            .small{
                font-weight:bold;
                color:${({ theme }) => theme.mainColor3};
                margin-top:15px;
            }
            .big{
                font-weight:bold;
                color:${({ theme }) => theme.mainColor3};
                font-size: ${({ theme }) => theme.fontSizeMedium};
            }
            &:hover{
                cursor:pointer;
                .popup{
                    margin-top:0px;
                    opacity:1;
                }
            }
        }
        .rec-carousel-item{
            img{
                border-right:1px solid #72aef533;
            }
            &:last-child{
                img{
                    border-right:none;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        h4{
            font-size: ${({ theme }) => theme.fontSize2};
        }
        .box{
            padding-left:15px;
            padding-right:15px;
        }
        .piece{
            .popup{
                display:none !important;
            }
        }
    }
`