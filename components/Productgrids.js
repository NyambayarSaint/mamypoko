import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import {FaWindowClose} from 'react-icons/fa';
import {GrCart} from 'react-icons/gr';
import {AiOutlineRight} from 'react-icons/ai'
import {BiChevronRight} from 'react-icons/bi';

import Button from "@/shared/Button";
import checkLanguage from "@/miscs/checkLanguage";
import minimize from '@/miscs/minimize';
import decrease from "@/miscs/decrease";
import { useRouter } from "next/router";


const BlogGrids = ({data}) => {

    const router = useRouter();
    const nonRouter = data.Categories_child && data.Categories_child.Slug
    const useSlug = router.query.slug ? router.query.slug : nonRouter

    const [current, setCurrent] = useState(6); //INITIAL LOAD COUNT
    const [newsData, setData] = useState([]);
    const [filter, setFilter] = useState('DESC');
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const [thisName, setThisName] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const increaser = 3

    useEffect(()=>{
        goLoadMore()
    },[current, filter])

    const goLoadMore = async () => {
        let queryString = `
        {
            categoriesChildren(where:{Slug: "${useSlug}"}) {
                Title
                Slug
                Products(sort: "createdAt:${filter}", limit:${current}){
                  Title
                  Images{url formats}
                  Price
                  Slug
                  createdAt
                }
            }
        }
        `;
        let res = await checkLanguage(queryString, null);
        setData(res.data.categoriesChildren[0].Products);
        setThisName(res.data.categoriesChildren[0].Title);
        setLoad(true)
    }

    const filterHandler = e => setFilter(e.target.value);
    const loadmoreHandler = () => setCurrent(current + increaser);
    
    const handleEnter = async (e) => {
        if(e.key === 'Enter'){
            if(search !== ""){
                setLoad(false);
                let res = await checkLanguage(`/products?Title_contains=${search}`, null, true)
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
            <h5 style={{marginBottom:50, marginTop:-30}}>
                <Link href="/p/category"><a>Ангилал</a></Link> <AiOutlineRight/>
                <a href="#" onClick={()=>router.back()}> Дэд ангилал </a> <AiOutlineRight/>
                {thisName}
            </h5>
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

                    <motion.div animate="show" initial="hide" variants={container} style={{overflow:'hidden'}}>
                        {searchedData.length ? <motion.p className="col-12">{data.SearchResult} "<span style={{fontWeight:'bold',cursor:'pointer'}} onClick={closeSearchHandler}>{search}" <FaWindowClose/></span></motion.p> : null}
                    {load ? 
                        searchedData.length ?
                        searchedData.map((el,i)=>{
                            return(
                                <div className="col-md-4" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/products/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Images[0],'small')})`}}></motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/products/' + el.Slug}>
                                                <a>
                                                    <motion.h6 variants={elemText} className="title">{decrease(el.Title)}</motion.h6>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>₮ {el.Price}</motion.p>
                                        </div>
                                        <hr/>
                                        <button className="like">ТААЛАГДСАН <GrCart style={{marginTop:-3}}/>-Д НЭМЭХ</button>
                                        <button className="more">ДЭЛГЭРЭНГҮЙ <BiChevronRight/></button>
                                    </motion.div>
                                </div>
                            )
                        })
                        :
                        newsData.map((el,i)=>{
                            return(
                                <div className="col-md-4" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/products/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Images[0],'small')})`}}></motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/products/' + el.Slug}>
                                                <a>
                                                    <motion.h6 variants={elemText} className="title">{decrease(el.Title)}</motion.h6>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>₮ {el.Price}</motion.p>
                                        </div>
                                        <hr/>
                                        <button className="like">ТААЛАГДСАН <GrCart style={{marginTop:-3}}/>-Д НЭМЭХ</button>
                                        <button className="more">ДЭЛГЭРЭНГҮЙ <BiChevronRight/></button>
                                    </motion.div>
                                </div>
                            )
                        })
                    : null}
                    </motion.div>
                    <div className="col-md-12" style={{textAlign:'center'}}>
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
        padding:8px 15px;
        line-height:19px;
        margin-bottom:15px;
    }
    .sections{
        margin-bottom:15px;
        .caption{
            margin-bottom:5px;
        }
    }
    .box{
        text-align:center;
        padding:15px;
        &:hover{
            box-shadow:#d9d9d9 0 0 5px;
        }
        .img{
            width:100%;
            height:200px;
            background-size: auto 100%;
            background-position:center center;
            background-repeat:no-repeat;
            margin-bottom:15px;
            transition:0.5s ease;
            &:hover{
                background-size: auto 110%;
            }
        }
        h6{
            font-weight:bold;
        }
        button.like{
            border:1px solid #85a5ba;
            background:#f2f6f9;
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