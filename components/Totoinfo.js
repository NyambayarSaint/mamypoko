import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import TextBreak from './miscs/TextBreak';

const Totoinfo = ({data}) => {
    return (
        <Container count={data.info.length+1} >
            <div className="text">
                <h1><TextBreak string={data.Title}/></h1>
            </div>
            {data.info.map(el=>{
                return(
                    <div className="box" key={Math.random()}>
                        <img src={minimize(el.Image, 'small')}/>
                        <h3>{el.Title}</h3>
                        <div className="links">
                            {el.Pages.map(link=><li key={Math.random()}><Link href={'/p/'+link.Slug}><a>{link.Name}</a></Link></li>)}
                        </div>
                    </div>
                )
            })}
        </Container>
    );
};

export default Totoinfo;

const Container = styled.div `
    display:flex;
    padding-left:10vw;
    padding-right:10vw;
    gap:30px;
    .text,.box{width: calc(100vw / ${({count})=>count});}
    .text{
        h1{
            font-size: 2vw;
            font-weight:bold;
        }
    }
    .box{
        margin-bottom:30px;
        h3{
            font-size:1.4vw;
            margin:25px 0px;
            padding-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            font-weight:bold;
        }
        .links{
            li{
                list-style-type:none;
                margin:15px 0px;
                text-transform:uppercase;
            }
        }
    }
    .box{
        img{
            width:100%;
            height:calc(100vh / ${({count})=>count});
            object-fit:cover;
        }
    }
    @media only screen and (max-width: 768px){
        flex-direction:column;
        padding-left:8px;
        padding-right:8px;
        .text,.box{
            width:100%;
        }
        .text{
            h1{
                font-size: ${({theme})=>theme.fontSizeMedium};
            }
        }
        .box{
            h3{
                font-size: ${({theme})=>theme.fontSizeMedium};
            }
        }
    }
`