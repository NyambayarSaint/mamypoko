import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import Carousel from 'react-elastic-carousel';
import {AiOutlineCheck} from 'react-icons/ai';
import {BiLinkExternal} from 'react-icons/bi';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";

const ChooseRetailer = ({ data }) => {
    const { config } = useContext(MenuContext);
    return (
        <Container SlidesPerRow={data.SlidesPerRow}>
            <h4>{data.Title}</h4>
            <div className="box">
                <Carousel itemsToShow={config.width > 768 ? data.SlidesPerRow : 1} showArrows={false}>
                    {data.Retailers.map(el => (
                        <div className="piece">
                            {el.Link && <a target="__blank" href={el.Link}>
                                <div className="popup">
                                    <div className="link"><BiLinkExternal/></div>
                                    <div className="caption">Харилцагчруу чиглүүлэх</div>

                                    {el.Ebarimt && <div className="list"><AiOutlineCheck/> И-баримттай</div>}
                                    {el.FreeDelivery && <div className="list"><AiOutlineCheck/> Хүргэлт үнэгүй</div>}
                                    {el.Gift && <div className="list"><AiOutlineCheck/> Бэлэгтэй</div>}
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
    .box{
        border:1px solid ${({ theme }) => theme.mainColor};
        padding:30px 0px 15px;
        display:flex;
        border-radius:30px;
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
                background:${({theme})=>theme.mainColor};
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
            font-size: ${({theme})=>theme.fontSize2};
        }
        .piece{
            .popup{
                display:none !important;
            }
        }
    }
`