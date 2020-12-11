import React from 'react';
import styled from 'styled-components';
import {AiFillFacebook, AiOutlineGooglePlus} from 'react-icons/ai'
import {BsCardHeading} from 'react-icons/bs';
import {MenuContext} from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import Link from 'next/link';
import minimize from '@/components/miscs/minimize';

const Footer = () => {
    const {general} = useContext(MenuContext);
    const {completelyLoaded} = useContext(MenuContext);
    console.log(general,'general');
    return (
        <Container>
            {completelyLoaded && <div className="top">
                <img src={minimize(general.Logo2)} className="logo"/>
                <div className="middle">
                    <div className="sub">
                        <strong><p>FOLLOW US ON SOCIAL</p></strong>
                        <div className="social">
                            {general.SocialLinks.Facebook && <a href={general.SocialLinks.Facebook} target="__blank"><AiFillFacebook/></a>}
                            {general.SocialLinks.Google && <a href={general.SocialLinks.Google} target="__blank"><AiOutlineGooglePlus/></a>}
                        </div>
                    </div>
                    <div className="sub">
                        <strong><p>ТУСЛАМЖ</p></strong>
                        {general.FooterMenu.length && general.FooterMenu.map(el=>(
                            <Link key={Math.random()} href={el.Path}>
                                <a><li>{el.Title}</li></a>
                            </Link>
                        ))}
                    </div>
                    <div className="sub">
                        <strong><p>ХОЛБОО БАРИХ</p></strong>
                        {general.Location && <li>{general.Location}</li>}
                        {general.Phone && <li>{general.Phone}</li>}
                        {general.Email && <li>{general.Email}</li>}
                    </div>
                </div>
                <div className="feedback-con">
                    <div>
                        <BsCardHeading/>
                        <input type="text" placeholder="Санал хүсэлт..." />
                    </div>
                    <button>Илгээх</button>
                </div>
            </div>
            }
            <div className="bottom">
                <span>© Copyright 2020 Tavanbogd International LTD</span>
            </div>
        </Container>
    );
};

export default Footer;

const Container = styled.div `
    padding:60px 5vw 30px;

    background:${({theme})=>theme.mainColor};
    color:white;
    .bottom{
        margin-top:60px;
        text-align:center;
        color:white;
        span{

        }
    }
    .top{
        display:flex;
        align-items:center;
        gap:3vw;
        justify-content:space-between;
        .logo{
            width:200px;
        }
        .middle{
            display:flex;
            gap:4vw;
            color:white;
            .sub{
                min-width:150px;
                max-width:250px;
                li{
                    list-style-type:none;
                    margin-bottom:10px;
                }
                .social{
                    svg{
                        font-size:30px;
                        margin-right: 15px;
                        ${'' /* border-left:1px solid white;
                        &:last-child{
                            border-right:1px solid white;
                        } */}
                    }
                }
            }
        }
        .feedback-con{
            background:white;
            border-radius:5px;
            color:black;
            padding:15px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            min-width:315px;
            svg{
                font-size:25px;
                opacity:0.6;
                margin-right:15px;
            }
            input{
                background:none;
                border:none;
            }
            button{
                background:${({theme})=>theme.mainColor};
                color:white;
                border-radius:10px;
                padding:8px 15px;
                border:none;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .top{
            flex-direction:column;
            .middle{
                flex-direction:column;
                .sub{
                    text-align:center;
                    margin-bottom:30px;
                    &:first-child{
                        margin-top:30px;
                    }
                }
            }
        }
    }
`