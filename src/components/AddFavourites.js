import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

 const AddFavourites = () =>{
     const [movies, setMovies] = useState([])


     useEffect(()=> {
         const test = JSON.parse(localStorage.getItem('allEntries'))
         setMovies(test)
     }, [])

    function removeFav (item) {
        let localArray = JSON.parse(localStorage.getItem('allEntries'))

       for(let i=0; i < localArray.length; i++){
           if(localArray[i].id === item.id){
               localArray.splice(i,1)
           }
       }
       localStorage.setItem("allEntries", JSON.stringify(localArray));
       setMovies(localArray)
     }

return(
<div>
    <Link to='/' className='link'>Home</Link>
    <div className='main-container'>
         {movies.map((item, i) =>(
             <div className='image-container movie overlay' key={i}>
                 <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} className='card-img' alt='...'/>

                 <div className='info'>
                     <h3>{item?.title}</h3>
                     <span>
               {item?.vote_average}
           </span>
                 </div>
                 <div className='over'>
                     <p>{item?.overview}</p>
                     <button className='link' type='button' onClick={()=>{removeFav(item)}}>Unfavourite</button>
                 </div>
             </div>
         ))}
    </div>
</div>
 )
 }

 export default AddFavourites