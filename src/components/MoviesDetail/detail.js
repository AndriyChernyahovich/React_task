import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export default function MoviesDetail() {
    const [movie, setMovie] = useState();
    const params = useParams();

const getDetails = async () => {
        try{
            const res =  await axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=8bd7ad481d1640e1826b9b2df2461c0f&language=en-US`)
            setMovie(res.data)

        }catch (e){
            console.error(e)
        }
}
    useEffect(() => {
        getDetails()
    }, [])

    return (
      <div className='container'>
          <Link to='/' className='link'>Home</Link>
          <div className='content'>
              <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} className='card-img' alt='...'/>
          <h1>{movie?.title}</h1>
              <p>{movie?.overview}</p>
              <div className='vote'>
              <h4>IMDB: {movie?.vote_average} / 10</h4>
              <h4>Vote count: {movie?.vote_count}</h4>
              </div>
              <div className='release'>
              <h4>Release: {movie?.release_date}</h4>
              <h4>Popularity: {movie?.popularity}</h4>
              </div>
          </div>
      </div>
    )
}

