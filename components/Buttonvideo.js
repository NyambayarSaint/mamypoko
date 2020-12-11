import React, { useState } from 'react';
import styled from 'styled-components';
import {IoIosPlay, IoMdClose} from 'react-icons/io';
import SublimeVideo from 'react-sublime-video';
import minimize from './miscs/minimize';

const Buttonvideo = ({data}) => {
    const [showVideo, setVideo] = useState(false);
    return (
        <>
        <div style={{marginTop:'5vh',marginBottom:'5vh'}}>
            <Button color={data.ColorCode} onClick={()=>setVideo(true)}>{data.Title} <IoIosPlay/></Button>
        </div>
        {showVideo &&
        <PopupVideo>
            <div className="container" style={{position:'relative'}}>
                <Button onClick={()=>setVideo(false)}><IoMdClose/></Button>
                <SublimeVideo autoPlay src={minimize(data.Video)} />
            </div>
        </PopupVideo>
        }
        </>
    );
};

export default Buttonvideo;

const Button = styled.button `
    border:1px solid ${props=>props.color};
    color: ${props=>props.color};
    background:rgba(255,255,255,0.4);
    width:20vw;
    min-width:250px;
    height:45px;
    transition:0.5s ease;
    outline:none;
    margin:0px auto;
    display:block;

    svg{
        font-size:25px;
        margin-left:0px;
    }
`
const PopupVideo = styled.div `
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:999;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    button{
        position:absolute;
        top:15px;
        right:30px;
        z-index:1000;
        min-width:unset;
        width:100px;
    }
    @media only screen and (max-width: 768px){
        button{
            min-width:unset;
            height:35px;
            width:75px;
        }
    }
`