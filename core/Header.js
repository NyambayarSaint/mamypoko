import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HamburgerMenu from 'react-hamburger-menu';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";

const Header = ({ menu }) => {

    const { general } = useContext(MenuContext);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [headerBlueHeight, setHeaderBlueHeight] = useState(70);
    const Router = useRouter();

    useEffect(() => {
        setHeaderBlueHeight(document.querySelector('.blue').offsetHeight)
    }, []);

    const checkActive = (path) => path === Router.asPath && 'active'

    return (
        <Container headerBlueHeight={headerBlueHeight} mobileMenu={mobileMenu}>
            {general.SocialLinks && <div className="top-social">
                {general.SocialLinks.Twitter && <a target="__blank" href={general.SocialLinks.Twitter}><FaTwitter /></a>}
                {general.SocialLinks.Facebook && <a target="__blank" href={general.SocialLinks.Facebook}><FaFacebook /></a>}
                {general.SocialLinks.Instagram && <a target="__blank" href={general.SocialLinks.Instagram}><FaInstagram /></a>}
            </div>}
            <div className="blue">
                <Link href="/"><a><img src="/img/logo.png" id="logo" /></a></Link>
                <div className="right">
                    <div className="search-con">
                        <BiSearchAlt2 />
                        <input type="text" placeholder="Хайх..." />
                    </div>
                    <div className="login-con">
                        <FaUser />
                        <div>Нэвтрэх</div>
                    </div>
                </div>
            </div>
            <div className="menu-con">
                <div className="box">
                    {menu.length && menu.map(el => (
                        el.Path ?
                            <Link key={Math.random()} href={el.Path}>
                                <a>
                                    <li className={`${checkActive(el.Path)}`}><span>{el.Title}</span><div className="arrow"></div></li>
                                </a>
                            </Link>
                            :
                            <li key={Math.random()}><span>{el.Title}</span></li>
                    ))}
                </div>
            </div>
            <div className="mobile-nav-padding" style={{height:61}}></div>
            <div className="mobile-nav">
                <img src="/img/logo-mobile.png" className="logo" />
                <HamburgerMenu isOpen={mobileMenu} menuClicked={() => setMobileMenu(!mobileMenu)} color="white" strokeWidth={4} height={18} />
            </div>
            <div className="mobile-menu">
                <div className="top">
                    <div className="search-con">
                        <BiSearchAlt2 />
                        <input type="text" />
                    </div>
                    {/* <div className="login-con">
                        <FaUser />
                        <div>Нэвтрэх</div>
                    </div> */}
                </div>
                <div className="bottom">
                    {menu.length && menu.map(el => (
                        el.Path ?
                            <Link key={Math.random()} href={el.Path}>
                                <a>
                                    <li onClick={()=>setMobileMenu(false)} className={`${checkActive(el.Path)}`}><span>{el.Title}</span><div className="arrow"></div></li>
                                </a>
                            </Link>
                            :
                            <li onClick={()=>setMobileMenu(false)} key={Math.random()}><span>{el.Title}</span></li>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    padding-top:calc( ${({ theme }) => theme.headerLogo} / 3 - 50px);
    box-shadow:1px 1px 5px rgba(0,0,0,0.1);
    .top-social{
        display:flex;
        justify-content:flex-end;
        padding-right:10vw;
        gap:15px;
        padding-bottom:30px;
        a{
            text-decoration:none;
            color:black;
        }
        svg{
            font-size:20px;
            opacity:0.4;
        }
    }
    .mobile-nav{
        display:none;
    }
    .mobile-menu{
        display:none;
    }
    .blue{
        padding:15px 0px;
        background:${({ theme }) => theme.mainColor};
        display:flex;
        justify-content:flex-end;
        position:relative;
        #logo{
            position:absolute;
            left:50%;
            top:0px;
            width:${({ theme }) => theme.headerLogo};
            margin-left:calc( ${({ theme }) => '-' + theme.headerLogo} / 2);
            margin-top:calc( ${({ theme }) => '-' + theme.headerLogo} / 2 + ${({ headerBlueHeight }) => headerBlueHeight / 2 + 'px'});
            transition:0.3s ease;
            &:hover{
                transform:scale(1.1);
            }
        }
        .right{
            display:flex;
            padding-right:10vw;
            .search-con{
                background:white;
                padding:8px 15px;
                margin-right:2vw;
                border-radius:30px;
                box-shadow:0px 2px 10px rgba(0,0,0,0.2);
                &:hover{
                    svg{
                        transform:scale(1.2);
                    }
                }
                svg{
                    margin-right:8px;
                    transition:0.3s ease;
                    &:hover{
                        cursor:pointer;
                    }
                }
                input{
                    background:none;
                    border:none;
                }
            }
            .login-con{
                text-align:center;
                color:white;
                margin-left:30px;
                svg{
                    font-size:20px;
                }
            }
        }
    }
    .menu-con{
        padding-top:calc( ${({ theme }) => theme.headerLogo} / 3);
        padding-bottom:15px;
        display:flex;
        justify-content:center;
        background:white;
        .box{
            display:flex;
            a{
                color:black;
                display:flex;
                justify-content:center;
                align-items:center;
                text-decoration:none;
                li{
                    color:black;
                    list-style-type:none;
                    border-right:1px solid rgba(0,0,0,0.05);
                    padding:30px 1vw;
                    text-align:center;
                    line-height:15px;
                    opacity:0.8;
                    font-weight:bold;
                    font-size: ${({ theme }) => theme.fontSize};
                    position:relative;
                    transition:0.3s ease;
                    .arrow{
                        width: 0; 
                        height: 0; 
                        border-left: 20px solid transparent;
                        border-right: 20px solid transparent;
                        border-bottom: 10px solid ${({ theme }) => theme.mainColor2};
                        position:absolute;
                        left:50%;
                        margin-left:-20px;
                        bottom:5px;
                        display:none;
                        transition:0.3s ease;
                    }
                    &.active{
                        color:${({ theme }) => theme.mainColor2};
                        background-image: radial-gradient(#a8d0ff, transparent, transparent);
                        .arrow{
                            display:block;
                        }
                    }
                    &:hover{
                        background-image: radial-gradient(#a8d0ff, transparent, transparent);
                        color: ${({ theme }) => theme.mainColor2};
                    }
                }
                &:first-child{
                    li{
                        margin-left:30px;
                    }
                }
                &:last-child{
                    li{
                        border-right:none;
                        margin-right:30px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .top-social{
            display:none;
        }
        .menu-con{
            display:none;
        }
        .blue{
            display:none;
        }
        padding-top:0px;
        .mobile-nav{
            width:100%;
            display:flex;
            justify-content: space-between;
            align-items:center;
            background-image: linear-gradient(to bottom right, ${({ theme }) => theme.mainColor2}, ${({ theme }) => theme.mainColor});
            padding:8px 15px;
            position:fixed;
            top:0;
            z-index:9999;
            .logo{
                height:45px;
            }
        }
        .mobile-menu{
            ${({ mobileMenu }) => !mobileMenu && `margin-left:100vw`};
            transition:0.3s ease;
            display:block;
            padding:15px;
            background:white;
            position:fixed;
            z-index:1000;
            width:100vw;
            .top{
                margin-bottom:15px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                .search-con{
                    background:${({ theme }) => theme.mainColor};
                    border-radius:30px;
                    color:white;
                    padding:8px 15px;
                    svg{
                        margin-right:7px;
                        font-size:20px;
                    }
                    input{
                        background:none;
                        border:none;
                        color:white;
                        font-weight:bold;
                    }
                }
                .login-con{
                    color:${({ theme }) => theme.mainColor};
                    text-align:center;
                    font-weight:bold;
                    svg{
                        font-size:20px;
                        text-align:center;
                    }
                }
            }
            .bottom{
                border-top:1px solid rgba(0,0,0,0.1);
                a{
                    color:black;
                }
                li{
                    list-style-type:none;
                    color:black;
                    font-weight:bold;
                    opacity:0.8;
                    padding:15px;
                    padding-top:10px;
                    padding-bottom:10px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                    transition:0.3s ease;
                    &.active{
                        background:${({ theme }) => theme.mainColor};
                        color:white;
                        border-bottom:1px solid;
                    }
                }
            }
        }
    }
`