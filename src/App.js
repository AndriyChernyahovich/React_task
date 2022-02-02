import React, {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import MoviesDetail from "./components/MoviesDetail/detail";
import Card from "./components/Card/card";
import './App.css'
import Pagination from "./components/pagination";
import addFavourites from "./components/AddFavourites";


const API_KEY = "8bd7ad481d1640e1826b9b2df2461c0f"

export default function App(props) {
    const MOVIE_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=3`
    const SEARCH_API =  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=/`
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() =>{
       getMovies(MOVIE_API) ;
    }, [])

    const getMovies = API => {
        fetch(API)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })
    }

    const handleOnSubmit = event => {
        event.preventDefault();
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm("");
        }
    }
    const handleOnChange = event => {
        setSearchTerm(event.target.value)
    }
    const onClickDetail = (res) => {
        setMovies([...movies,...res.results])
    }


    return(
        <BrowserRouter>
     <Router>
         <Switch>
             <Route exact path='/'>
                 <header>
                     <h3 className='logo'>Filmedia</h3>
                     <Link to='/list' className='link'>Favourite list</Link>
                 </header>
                     <form onSubmit={handleOnSubmit}>
                         <input
                         className='search'
                         type='search'
                         placeholder='Search'
                         value={searchTerm}
                         onChange={handleOnChange}
                         />
                     </form>
                    <div className='movie-container'>
                        {movies.length > 0 &&
                        movies.map((movie, i) => <Card key={i} movie={movie}   />)
                        }
                    </div>
                 <Pagination onClickDetail={onClickDetail}/>
             </Route>
             <Route path='/list' component={addFavourites}>

             </Route>
             <Route path='/movie/:movieId'>
                 <MoviesDetail  />
             </Route>
         </Switch>
     </Router>
        </BrowserRouter>
    )
}


