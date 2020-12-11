import React from 'react';
import styled from 'styled-components';
import decrease from './miscs/decrease';
import minimize from './miscs/minimize';

const Totofeature = ({data}) => {
    
    return (
        <Container>
            {data.Title && <h2>{data.Title}</h2>}
            <div className="wrapper">
            
            {data.TotofeatureCards.map((el,i)=>{
                if(i===0){
                    return(
                        <div className="box" key={Math.random()}>
                            <div className="overflow" style={{backgroundImage: `url(${minimize(el.Image, 'large')})`}}>
                            </div>
                            <div className="content">
                                <h4 className="title">{el.Title && el.Title}</h4>
                                <p className="description">{el.Description && decrease(el.Description, 250, 75)}...</p>
                            </div>
                        </div>
                    )
                }
            })}
            <div className="box">
                {data.TotofeatureCards.map((el,i)=>{
                    if(i!==0){
                        return(
                            <div className="sub" key={Math.random()}>
                                <div className="overflow" style={{backgroundImage: `url(${minimize(el.Image, 'medium')})`}}>
                                </div>
                                <div className="content">
                                    <h4 className="title">{el.Title && el.Title}</h4>
                                    <p className="description">{el.Description && decrease(el.Description, 100) + '...'}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
                
                
            </div>
        </Container>
    );
};

export default Totofeature;

const Container = styled.div `
    padding-top:5vh;
    padding-bottom:5vh;
    margin-top:5vh;
    margin-bottom:5vh;
    h2{
        font-weight:bold;
        padding-left:20vw;
        padding-right:20vw;
        margin-bottom:5vh;
    }
    .wrapper{
        display:flex;
        flex-wrap:wrap;
        padding-left:10vw;
        padding-right:10vw;
        div{
            background-size: cover !important;
            background-position: center center !important;
            background-repeat:no-repeat !important;
        }
        .box{
            background:grey;
            width:50%;
            height:38vw;
            display:flex;
            flex-direction:column;
            .sub{
                height:50%;
            }
        }
        .box,.sub{
            position:relative;
            overflow:hidden;
            &:hover{
                cursor:pointer;
            }
            .overflow{
                height:100%;
                transition:1s ease;
            }
            .content{
                position:absolute;
                bottom:15px;
                left:15px;
                color:white;
                z-index:1;
                .description{
                    margin-bottom:0px;
                    font-size: ${props=>props.theme.fontSizeMedium};
                }
                .title{
                    font-weight:bold;
                }
            }
        }
        .sub{
            &:after{
                content: "";
                width:100%;
                height:50%;
                background-image:linear-gradient(to top, rgba(0,0,0,0.6), transparent);
                position:absolute;
                left:0;
                right:0;
                bottom:0;
            }
            &:hover{
                .overflow{
                    transform:scale(1.07);
                }
            }
        }
        .box:first-child{
            &:after{
                content: "";
                width:100%;
                height:50%;
                background-image:linear-gradient(to top, rgba(0,0,0,0.6), transparent);
                position:absolute;
                left:0;
                right:0;
                bottom:0;
            }
            &:hover{
                .overflow{
                    transform:scale(1.07);
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        h2{
            padding-left:5vw;
            padding-right:0px;
            font-size: ${props => props.theme.fontSizeMedium};
        }
        .wrapper{
            padding-left:8px;
            padding-right:8px;
            flex-direction:column;
            .box{
                width:100%;
                height:40vh;
                .content{
                    right:15px;
                    .title{
                        font-size: ${props=>props.theme.fontSize};
                    }
                    .description{
                        font-size: ${props=>props.theme.fontSize};
                        line-height:${props=>props.theme.fontSize};
                    }
                }
            }
            .box:last-child{
                flex-direction:row;
                height:20vh;
                .sub{
                    height:100%;
                    width:50%;
                    &:after{
                        height:40%;
                    }
                    .title{
                        font-size:${props=>props.theme.fontSize};
                        margin-bottom:0px;
                    }
                    .description{
                        display:none;
                    }
                }
            }
        }
    }
`