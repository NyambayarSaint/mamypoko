import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from 'next/router'
import { motion } from "framer-motion";
import {BsArrowRight} from 'react-icons/bs';
import {FaWindowClose} from 'react-icons/fa'

import Button from "@/shared/Button";
import checkLanguage from "@/miscs/checkLanguage";
import months from "@/miscs/months";
import minimize from '@/miscs/minimize';
import decrease from "@/miscs/decrease";


const BlogGrids = ({data}) => {

    const R = useRouter()
    const [current, setCurrent] = useState(3); //INITIAL LOAD COUNT
    const [newsData, setData] = useState([]);
    const [filter, setFilter] = useState('DESC');
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const increaser = 3

    useEffect(()=>{
        goLoadMore()
    },[current, filter])

    const goLoadMore = async () => {
        let queryString = `
        {
            newsletters(sort: "createdAt:${filter}", limit:${current}) {
            Title
            Thumb {url formats}
            Content
            Slug
            createdAt
            }
        }
        `;
        let res = await checkLanguage(queryString, null);
        setData(res.data.newsletters)
        setLoad(true)
    }

    const filterHandler = e => setFilter(e.target.value);
    const loadmoreHandler = () => setCurrent(current + increaser);
    
    const handleEnter = async (e) => {
        if(e.key === 'Enter'){
            if(search !== ""){
                setLoad(false);
                let res = await checkLanguage(`/newsletters?Title_contains=${search}`, null, true)
                res.data.length ? setSearchedData(res.data) : window.alert(`${data.NoResult} "${search}"`);
                return setLoad(true);
            }
            closeSearchHandler();
        }
    }
    const closeSearchHandler = () => {
        setSearchedData([]);
        setSearch('');
    }
    return (
        <Container>
            <div className="row">
                <div className="col-md-3 left">
                    <div className="row">
                        <div className="col-12 sections">
                            <div className="caption"><strong>{data.SearchCaption}</strong></div>
                            {!searchedData.length ?
                                <div className="search">
                                    <input className="form-control" placeholder={data.SearchPlaceholder} value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleEnter} />
                                </div>
                            : null}
                        </div>
                        <div className="col-12 sections">
                            <div className="caption"><strong>{data.SortByDate}</strong></div>
                            {!searchedData.length ?
                                <select className="form-control" onChange={filterHandler}>
                                    <option value="DESC">{data.NewToOld}</option>
                                    <option value="ASC">{data.OldToNew}</option>
                                </select>
                            : null}
                        </div>
                    </div>
                </div>
                
                <div className="col-md-9 right">

                    <motion.div animate="show" initial="hide" variants={container}>
                        {searchedData.length ? <motion.p className="col-12">{data.SearchResult} "<span style={{fontWeight:'bold',cursor:'pointer'}} onClick={closeSearchHandler}>{search}" <FaWindowClose/></span></motion.p> : null}
                    {load ? 
                        searchedData.length ?
                        searchedData.map((el,i)=>{
                            let date = new Date(el.createdAt)
                            return(
                                <div className="col-12" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/news/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Thumb[0],'small')})`}}></motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/news/' + el.Slug}>
                                                <a>
                                                    <motion.h4 variants={elemText} className="title">{decrease(el.Title)}</motion.h4>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>{decrease(el.Content, 200, 100)}...</motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })
                        :
                        newsData.map((el,i)=>{
                            return(
                                <div className="col-12" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/news/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Thumb[0],'small')})`}}></motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/news/' + el.Slug}>
                                                <a>
                                                    <motion.h4 variants={elemText} className="title">{decrease(el.Title)}</motion.h4>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>{decrease(el.Content, 200, 100)}...</motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })
                    : null}
                    </motion.div>
                    <div style={{textAlign:'center'}}>
                        {!searchedData.length ? load ? <Button className="loadmore" onClick={loadmoreHandler}>{data.LoadMore}</Button> : <Button className="loadmore loading"><img src="/img/spinner.gif"/></Button> : null}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogGrids;

const Container = styled.div`
    padding-top: 10vh;
    padding-bottom: 10vh;
    padding-left:10vw;
    padding-right:10vw;
    button{
        background:white;
        border:1px solid;
    }
    .left{
        .caption{
            margin-bottom:10px;
        }
        .sections{
            margin-bottom:30px;
        }
        input,select{
            border:1px solid;
            border-radius:0px;
        }
    }
    .box{
        display:flex;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        border:1px solid #f0f0f0;
        .img{
            width:200px;
            height:100%;
            background-size: cover;
            background-repeat:no-repeat;
            background-position:center center;
            margin-right:15px;
        }
        .text{
            padding:15px;
            .title{
                font-weight:bold;
            }
            p{
                margin-bottom:0px;
                opacity:0.8;
            }
        }
    }   
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        .right{
            .col-12{
                padding:0px;
            }
        }
        .box{
            flex-direction:column;
            .img{
                width:100%;
                height:200px;
            }
            .title{
                font-size: ${props=>props.theme.fontSize};
            }
        }
    }
`;

const container = {
    show: {
        transition: {
            staggerChildren: 0.5
        }
    }
}
const elem = {
    hide: {
        opacity: 0,
        y: 50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemText = {
    hide: {
        opacity: 0,
        x: 50
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemP = {
    hide: {
        opacity: 0,
        x: -50
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemImg = {
    hide: {
        opacity: 0,
        y: -50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}