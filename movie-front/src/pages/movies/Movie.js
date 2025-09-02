import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Movie.css'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Movie = () => {

  const [ movies, setMovies ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(1)
  const [ year, setYear ] = useState('')
  const [ genre, setGenre ] = useState('')
  const [ rating, setRating ] = useState('')
  const [ loading, setLoading ] = useState(true)

  const fetchMovies = async (pageNumber = 1) => {
    try{
      
      setLoading(true)
      const res = await axios.get(`http://localhost:5000/api/movies/movies` , {
        params: {
          page: pageNumber,
          limit: 20,
          genre: genre,
          year: year,
          rating: rating
        }
      })


      setMovies(res.data.movies)
      setTotalPages(res.data.totalPages)
      setPage(res.data.page)
      setLoading(false);

    }catch(err){
      console.error('error')
    }
  }

  useEffect(() => {
    fetchMovies(page)
  }, [page])

  return (
    <>
      <section className='movies_section'>
    
        <div className='filter_container'>
          <div>
            <p>Genre</p>
            <select onChange={(e) => setGenre(e.target.value)} value={genre}>
              <option value=''>All</option>
              <option value='Action'>Action</option>
              <option value='Drama'>Drama</option>
              <option value='Comedy'>Comedy</option>
              <option value='Sci-Fi'>Sci-Fi</option>
            </select>
          </div>
    
          <div>
            <p>Year</p>
            <select onChange={(e) => setYear(e.target.value)} value={year}>
              <option value=''>All</option>
              <option value='2024'>2024</option>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
              <option value='2017'>2017</option>
              <option value='2016'>2016</option>
              <option value='2015'>2015</option>
              <option value='2014'>2014</option>
              <option value='2013'>2013</option>
              <option value='2012'>2012</option>
              <option value='2011'>2011</option>
              <option value='2010'>2010</option>
              <option value='2009'>2009</option>
              <option value='2008'>2008</option>
              <option value='2007'>2007</option>
              <option value='2006'>2006</option>
              <option value='2005'>2005</option>
            </select>
          </div>
    
          <div>
            <p>IMDb</p>
            <select onChange={(e) => setRating(e.target.value)} value={rating}>
              <option value=''>All</option>
              <option value='9'>9+</option>
              <option value='8'>8+</option>
              <option value='7'>7+</option>
            </select>
          </div>
    
          <div className='filter_search_button'>
            <button onClick={() => { setPage(1); fetchMovies(1);}}>Search</button>
          </div>
    
        </div>
    
        <div className='movies_container'>
    
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className='movie_card skeleton_card'></div>
              ))}
            </>
          ) : (
            <>
              { movies.map((movies, index) => (
                <Link to={`/movies/${movies._id}`} >
                  <div key={index} className='movie_card'>
                
                    <div className='movie_card_details'>
                      <img src={movies.image.url} alt={movies.title} className='movie_img_rating_image'/>
                      <div className='movie_context'>
                        <p> {movies.year} </p>
                        <p> {movies.rating[0]?.source}: {movies.rating[0]?.score} </p>
                      </div>
                    </div>
                    <p className='movieTitle'> {movies.title} </p>
                
                  </div>
                </Link>
              )) }
            </>
          )}
  
        
        
        </div>
        
        {movies.length === 0 ? (
          <>
          
          </>
        ) : (
          <>
            <div className="pagination_controls">
              <button onClick={() => setPage(page - 1)} disabled={page >= 0} > <MdOutlineNavigateBefore /> </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} > <MdOutlineNavigateNext /> </button>
            </div>
          </>
        )}
  
        
      </section>
    </>
  )
}