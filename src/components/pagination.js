import React, {useEffect, useState} from "react";
import axios from "axios";


function Pages({onClickDetail}) {
    const [totalPages] = useState()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const getFilmList = async () => {
        try{
            setLoading(true)
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8bd7ad481d1640e1826b9b2df2461c0f&language=en-US&page=${page}&include_adult=false&query=3`)
            onClickDetail(res.data)
        } catch (e){
            console.error(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() =>{
        getFilmList()
    },[page] )


     const clickOnDetail = () => {
         setPage(page + 1)
     }
    return (
        <div className='page-container'>
            {totalPages !== page &&
                <button
                    className="link"
                    onClick={() => clickOnDetail()}>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            }
        </div>
    )
}

export default Pages

