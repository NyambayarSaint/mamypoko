import React from 'react';
import styled from 'styled-components';

const Contactinfo = ({ data }) => {
    return (
        <Container>
            <h2>{data.Caption}</h2>
            <div className="box">
                <div className="left">
                    <p><strong>Факс: </strong>{data.Fax}</p>
                    <p><strong>Утас: </strong>{data.Phone}</p>
                    <p><strong>E-mail: </strong>{data.Email}</p>
                </div>
                <div className="right">
                    <p><strong>Хаяг: <br/></strong>{data.Location}</p>
                </div>
            </div>
        </Container>
    );
};

export default Contactinfo;

const Container = styled.div`
    width:50vw;
    margin:0px auto;
    h2{
        text-align:center;
        text-transform:uppercase;
        color:${({theme})=>theme.mainColor3};
        margin-bottom:5vh;
        font-weight:bold;
    }
    .box{
        display:flex;
        background:rgba(114,174,245,0.7);
        border-radius:30px;
        padding:30px;
        color:white;
        gap:30px;
        align-items:center;
        .left{
            border-right:2px solid ${({theme})=>theme.mainColor2};
        }
        div{
            flex:1;
            p{
                font-weight:bold;

                &:last-child{
                    margin:0px;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        width:100%;
        padding-left:15px;
        padding-right:15px;
        h2{
            font-size: ${({theme})=>theme.fontSizeMedium};
        }
        .box{
            flex-direction:column;
        }
        .left{
            border-right:none !important;
        }
        div{
            p{
                text-align:center;
            }
        }
    }
`