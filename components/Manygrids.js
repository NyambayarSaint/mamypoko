import React from 'react';
import styled from 'styled-components';
import {BsHouseDoor} from 'react-icons/bs';

const Manygrids = ({data}) => {
    return (
        <Container>
            {data.SingleGrids.map((el,i)=>{
                return(
                    <div className="box" key={'singlegrids'+i}>
                        <BsHouseDoor/>
                        {el.Title && el.Title.includes("|") ? <SemiBreak data={el.Title}/> : <p>{el.Title}</p>}
                        <h3>{el.Caption}</h3>
                    </div>
                )
            })}
        </Container>
    );
};

export default Manygrids;

const Container = styled.div `
    padding-top:8vh;
    padding-bottom:8vh;
    display:flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .box{
        text-align:center;
        min-width:250px;
        margin-top:15px;
        margin-bottom:15px;
        svg{
            font-size:50px;
            margin-bottom:15px;
            opacity:0.9;
        }
        p{
            margin-bottom:0px;
            strong{
                font-weight:400;
                color:${props=>props.theme.mainRed};
            }
        }
        h3{
            font-weight:400;
            letter-spacing:-2px;
            opacity:0.9;
        }
    }
`
const SemiBreak = ({data}) => {
    let prepare = data.split("|");
    return <p>{prepare[0]} <strong>{prepare[1]}</strong></p>
}