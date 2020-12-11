import React, { useState } from 'react';
import styled from 'styled-components';
import {HiPlusCircle} from 'react-icons/hi'
import minimize from './miscs/minimize';
import {Parser} from 'html-to-react'
import {GrCart} from 'react-icons/gr';
import {BiArrowBack} from 'react-icons/bi'
import { useRouter } from 'next/router';

const parser = new Parser();

const Totoproduct = ({data}) => {
    const [selected, setSelected] = useState(0);
    const router = useRouter();
    return (
        <Container className="container">
            <h5 onClick={()=>router.back()} className="backbutton"><BiArrowBack/> Буцах</h5>
            <h1 className="maintitle">{data.Title}</h1>
            <div className="row wrapper">
                <div className="sides col-md-4">
                    {data.Images.length &&
                        <div className="color-container">
                            <strong><p>ӨНГӨНИЙ СОНГОЛТ:</p></strong>
                            {data.Images.map((el,i)=><div key={Math.random()} onClick={()=>setSelected(i)} className="colors" style={{background: el.caption}}/>)}
                            <div className="selected-container">
                                <div className="selected" style={{background: data.Images[selected].caption}}></div>
                                <div className="txt">
                                    <span>/СОНГОСОН ӨНГӨ/</span>
                                    <strong><p>{data.Images[selected].alternativeText}</p></strong>
                                </div>
                            </div>
                        </div>
                    }
                    <button className="wheretobuy">ХААНААС АВАХ ВЭ ?</button>
                    <div className="price"><span>ЖАГСААЛТАЛТНЫ ҮНЭ: </span> <strong>${data.Price}</strong></div>
                    <hr/>
                    <button className="liked-item">ТААЛАГДСАН <GrCart style={{marginTop:-3}}/>-Д НЭМЭХ <HiPlusCircle/></button>
                </div>
                <div className="sides main col-md-8">
                    <div className="row">
                        <div className="col-md-10"><img className="product-image" src={minimize(data.Images[selected], 'large')}/></div>
                        <div className="col-md-2">
                            <div className="seemorephotos">
                                {}
                            </div>
                            {data.Awards.map(el=><img className="awards" key={Math.random()} src={minimize(el, 'thumbnail')}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <hr style={{width:'100%'}}/>
                <div className="offset-md-2 col-md-8 content">{parser.parse(data.Content)}</div>
                <div className="col-md-6 features">
                    <strong><span>ОНЦЛОГУУД</span></strong>
                    <hr style={{margin:'5px 0px 10px'}}/>
                    <ul>
                        {data.Features.map(features=><li key={Math.random()}>{features.Text}</li>)}
                    </ul>
                </div>
                <div className="col-md-6 specs">
                    <strong><span>ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ</span></strong>
                    <hr style={{margin:'5px 0px 10px'}}/>
                    {data.Specifications.map(element=>{
                        return(
                            <div className="con" key={Math.random()}>
                                <strong><p>{element.Title}</p></strong>
                                <div className="row">{element.Sub.map(el=><div className="col-6" key={Math.random()}><a target="_blank" href={el.Link}>{el.Text}</a></div>)}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {data.OtherSpecs.map(element=>{
                return(
                    <div className="row others" key={Math.random()}>
                        <div className="col-md-6">
                            <strong><span>{element.Title}</span></strong>
                            <hr/>
                            <div className="row">
                            {element.SubSpecs.map(el=>{
                                return(
                                    <div className="col-6" key={Math.random()}>
                                        <div className="flexx">
                                            <img src={minimize(el.Icon, 'thumbnail')}/>
                                            <div className="txt">
                                                <p>{el.Text}</p>
                                                <small>What's this?</small>
                                                <div className="exp"><div className="close"></div><strong>Toto TIP: <br/></strong>{el.Description}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                )
            })}
                
        </Container>
    );
};

export default Totoproduct;

const Container = styled.div `
    margin-top:30px;
    padding:15px 0px;
    .backbutton{
        margin-bottom:30px;
        background:black;
        color:white;
        width:fit-content;
        padding:8px 15px;
        &:hover{
            cursor:pointer;
        }
    }
    .maintitle{
        border-bottom:1px solid;
        padding-bottom:15px;
        margin-bottom:15px;
    }
    .row{
        .sides{
            .color-container{
                padding:15px;
                border:1px solid rgba(0,0,0,0.05);
                margin-bottom:15px;
                .colors{
                    width:30px;
                    height:30px;
                    border-radius:50%;
                    box-shadow:1px 1px 7px rgba(0,0,0,0.6);
                    display:inline-block;
                    margin-right:15px;
                    transition:0.2s ease;
                    &:last-child{margin-right:0px;}
                    &:hover{
                        cursor:pointer;
                        box-shadow: 1px 1px 7px rgba(0,0,0,0.3);
                    }
                }
                .selected-container{
                    border-top:2px solid rgba(0,0,0,0.05);
                    margin-top:15px;
                    padding-top:15px;
                    display:flex;
                    .selected{
                        width:60px;
                        height:60px;
                        border-radius:50%;
                        border:2px solid rgba(0,0,0,0.4);
                        margin-right:10px;
                    }
                }
            }
            .wheretobuy{
                border:2px solid;
                background:transparent;
                padding:15px;
                font-weight:500;
                svg{
                    font-size: ${props=>props.theme.fontSizeMedium};
                    margin-top:-3px;
                }
                &:hover{
                    background:black;
                    color:white;
                }
            }
            .price{
                margin-top:30px;
                padding-bottom:30px;
            }
            .liked-item{
                border:1px solid #85a5ba;
                padding:5px 15px;
                background:#f2f6f9;
                font-weight:500;
                svg{
                    color:#85a5ba;
                }
            }
        }
        .sides.main{
            .product-image{
                margin:0px auto;
                display:block;
            }
            .awards{
                margin-top:10px;
                &:first-child{margin-top:0px;}
            }
        }
    }
    .content{
        padding-top:15px;
        margin-top:15px;
        margin-bottom:30px;
    }
    .features{
        span{
            text-transform:uppercase;
        }
        ul{
            opacity:0.7;
            font-weight:500;
            padding-left:20px;
            li{
                margin-bottom:10px;
            }
        }
    }
    .specs{
        margin-bottom:30px;
        p,span{
            text-transform:uppercase;
        }
        .con{
            margin-top:30px;
            border:1px solid rgba(0,0,0,0.1);
            padding:15px;
            a{
                font-weight:500;
            }
        }
    }
    .others{
        margin-top:30px;
        .flexx{
            display:flex;
            font-size: 14px;
            margin-bottom:5vh;
            img{
                height:100%;
                margin-right:10px;
            }
            p{
                margin:0px;
                font-weight:500;
                margin-top:-3px;
            }
            small{
                margin-top:-1px;
                display:block;
            }
            &:hover{
                .exp{
                    display:block;
                }
            }
            .exp{
                z-index: 999;
                left: 150px;
                top: 0;
                width: 115px;
                position: absolute;
                font-size: 11px;
                font-weight: 300;
                background-color: #fff;
                border: 1px solid #9db7c9;
                border-radius: 3px;
                padding: 6px;
                display:none;
                font-weight:500;
                .close{
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    cursor: pointer;
                    background: url(https://www.totousa.com/images/tooltip-close.png) no-repeat 0 0;
                }
                &:after{
                    width: 100%;
                    height: 9px;
                    background: url(https://www.totousa.com/images/tooltip-arrow.png) no-repeat 0 0;
                    position: absolute;
                    left: -9px;
                    top: 22px;
                    display: block;
                    content: '';
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:8px;
        padding-right:8px;
        .wrapper{
            display:flex;
            flex-direction:column-reverse;
        }
        .maintitle{
            font-size: ${props=>props.theme.fontSizeMedium};
        }
        .sides.main{
            .awards{
                height:30px;
                margin-top:10px !important;
                margin-bottom:10px !important;
                margin-right:10px;
                &:last-child{
                    margin-right:0px;
                }
            }
        }
        .sides{
            .color-container{
                p{
                    margin-bottom:5px;
                }
            }
            .selected-container{
                .selected{
                    width:45px !important;
                    height:45px !important;
                }
                p{
                    margin-bottom:0px;
                }
            }
            .price{
                margin-top:10px !important;
                padding-bottom:0px !important;
            }
        }
    }
    .features{
        margin-bottom:30px;
    }
`