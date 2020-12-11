import React, { useState } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import checkLanguage from './miscs/checkLanguage';
import minimize from './miscs/minimize';
import Link from 'next/link';
import {AiOutlineRight} from 'react-icons/ai'

const Categorieschild = ({data}) => {

    const router = useRouter();
    const nonRouter = data.category && data.category.Slug;
    const useSlug = router.query.slug ? router.query.slug : nonRouter
    
    const [categories, setCategories] = useState(null);

    const loadData = async () => {
        let query = `
        {
            categories(where:{Slug: "${useSlug}"}) {
              Title
              Children {
                Title
                Thumb{
                  url formats
                }
                Slug
              }
            }
          }
        `
        let res = await checkLanguage(query, null);
        res.data.categories.length && setCategories(res.data.categories[0]);
    }
    useState(()=>{
        useSlug && loadData();
    },[])

    return (
        <Container>
            {categories ?
                <>
                    <h2><Link href="/p/category"><a>Ангилал</a></Link> <AiOutlineRight/> {categories.Title}</h2>

                    <div className="con">
                        {categories.Children.length && categories.Children.map(el=>(
                            el.Slug ?
                                    <div className="box" key={Math.random()}>
                                        <Link href={'/p/products?slug='+el.Slug}>
                                            <a>
                                                <img src={minimize(el.Thumb[0],'medium')} />
                                            </a>
                                        </Link>
                                        <Link href={'/p/products?'+el.Slug}><a><p>{el.Title}</p></a></Link>
                                    </div>
                            :
                            <div className="box" key={Math.random()}>
                                <img src={minimize(el.Thumb[0],'medium')} />
                                <p>{el.Title}</p>
                            </div>
                        ))}
                    </div>
                </>
            :
            <p>Loading...</p>}
        </Container>
    );

};

export default Categorieschild;

const Container = styled.div`
    padding-left:10vw;
    padding-right:10vw;
    padding-top:5vh;
    padding-bottom:5vh;
    h2{
        margin-bottom:5vh;
        text-transform:capitalize;
    }
    .con{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        gap:30px;
        .box{     
            width:calc(33% - 30px);
            display:flex;
            flex-direction:column;
            justify-content:center;
            img{
                width:100%;
                margin-bottom:10px;
            }
            p{
                margin-bottom:0px;
                text-align:center;
            }
        }
    }
`