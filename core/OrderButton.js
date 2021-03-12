import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const OrderButton = () => {

    const img = useRef(null);
    const R = useRouter();

    useEffect(()=>{
        setInterval(() => {
            ding(img);
        }, 5000);
    },[]);

    const ding = (el) => {
        el.current && el.current.classList.add('jello-horizontal');
        setTimeout(() => {
            el.current && el.current.classList.remove('jello-horizontal');
        }, 500);
    }

    return (
        <Container onClick={()=>R.push('/p/jiwh-zahialah')}>
            <img ref={img} onMouseEnter={()=>ding(img)} src="/img/right.png"/>
        </Container>
    );
};

export default OrderButton;

const Container = styled.div `
    position:fixed;
    z-index:99;
    right:2.5vw;
    width:180px;
    &:hover{
        cursor:pointer;
    }
    @media only screen and (max-width: 768px){
        right:unset;
        left:0px;
        width:100px;
        bottom:5px;
        ${'' /* -webkit-transform: scaleX(-1); */}
        ${'' /* transform: scaleX(-1); */}
    }
    .jello-horizontal {
        -webkit-animation: jello-horizontal 0.9s both;
                animation: jello-horizontal 0.9s both;
    }
    @-webkit-keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
`