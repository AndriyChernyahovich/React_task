import React from "react";
import {Link} from "react-router-dom";

const IMG_API = 'https://image.tmdb.org/t/p/w300/'



   const Movie = ({movie}) => {
        function toggleFavActive () {
            let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
            if(existingEntries === null){
                existingEntries = [];
            }
            const test = existingEntries.find(elem => elem.id === movie.id)
            if(!test){
                existingEntries.push(movie);
            }

            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }


        return (

            <div className='image-container movie overlay'>
                <img src={movie?.poster_path ? IMG_API + movie.poster_path :
                    "https://images.unsplash.com/photo-1609936968684-36b55c06ab7a?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"}
                     alt='title'/>
                <div className='info'>
                    <h3>{movie?.title}</h3>
                    <span>
               {movie?.vote_average}
           </span>
                </div>
                <div className='over'>
                    <p>{movie?.overview}</p>
                    <div className='bt'>
                    <Link to={`/movie/${movie?.id}`} className='link'>Details</Link>
                        <button className='link' type='button' onClick={()=> toggleFavActive()}>Favourite</button>
                    </div>
                </div>

            </div>

        )
    }
export default Movie