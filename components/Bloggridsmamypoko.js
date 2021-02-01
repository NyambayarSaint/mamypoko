import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import checkLanguage from './miscs/checkLanguage';
import Carousel from 'react-elastic-carousel';
import minimize from './miscs/minimize';
import decrease from './miscs/decrease';
import { useRouter } from 'next/router';

const Bloggridsmamypoko = () => {

    const [data, setData] = useState([]);
    const R = useRouter();

    useEffect(() => {
        goGrab();
    }, []);

    const goGrab = async () => {
        const res = await checkLanguage('/news-categories', null, true);
        setData(res.data);
    }

    return (
        <Container>
            {data.length && data.map(el => (
                <div className="box">
                    <div className="big">
                        <img src={minimize(el.Image)} />
                        <div className="title">{el.Title}</div>
                    </div>
                    <div className="car">
                        <Carousel itemsToShow={1} showArrows={false}>
                            {el.Newsletters.length && el.Newsletters.map(ol => (
                                <div className="each">
                                    <img onClick={()=>ol.Slug && R.push('/news/'+ol.Slug)} src={minimize(ol.Thumb)}/>
                                    <div className="content">
                                        <div className="title" onClick={()=>ol.Slug && R.push('/news/'+ol.Slug)}>{ol.Title}</div>
                                        {ol.Caption && <div className="caption">{ol.Caption}</div>}
                                        {ol.Content && <div className="content">{decrease(ol.Content, 200, 120)}</div>}
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default Bloggridsmamypoko;

const Container = styled.div`
    padding-left:10vw;
    padding-right:10vw;
    .box{
        margin-bottom:50px;
        display:flex;
        gap:30px;
        .big{
            width:25%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            text-align:center;
            img{
                width:100%;
            }
            .title{
                color:${({theme})=>theme.mainColor3};
                font-weight:bold;
                font-size: 20px;
                line-height:20px;
            }
        }
        .car{
            width:75%;
            display:flex;
            align-items:center;
            .each{
                display:flex;
                margin-top:35px;
                gap:30px;
                img{
                    width:40%;
                    &:hover{
                        cursor:pointer;
                    }
                }
                .content{
                    .title{
                        font-size: ${({theme})=>theme.fontSizeMedium};
                        font-weight:bold;
                        color:${({theme})=>theme.mainColor3};
                        margin-bottom:20px;
                        &:hover{
                            cursor:pointer;
                        }
                    }
                    .caption{
                        font-weight:bold;
                        margin-bottom:10px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding:0px 15px;
        .box{
            flex-direction:column;
            gap:0px;
            margin-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding-bottom:30px;
            .big{
                width:100%;
                flex-direction:row;
                gap:15px;
                align-items:center;
                justify-content:center;
                border-bottom:1px solid rgba(0,0,0,0.1);
                padding-bottom:15px;
                margin-bottom:20px;
                img{
                    width:75px;
                }
                .title{
                    text-align:left;
                    font-size:16px;
                }
            }
            .car{
                width:100%;
                .each{
                    margin-top:0px;
                    flex-direction:column;
                    gap:15px;
                    img{
                        width:100%;
                    }
                    .content{
                        .title{
                            margin-bottom:10px;
                        }
                    }
                }
            }
        }
    }
`