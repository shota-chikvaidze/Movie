import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import './Search.css'

const Search = () => {

  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('search') || '';

  const handleSearch = async () => {
      try {
          const [moviesRes, seriesRes] = await Promise.all([
              axios.get(`http://localhost:5000/api/movies/movies?search=${query}`),
              axios.get(`http://localhost:5000/api/series/all-series?search=${query}`)
          ]);
        
          const movies = moviesRes.data.movies.map(movie => ({ ...movie, type: 'Movie' }))
          const series = seriesRes.data.series.map(serie => ({ ...serie, type: 'Series' }))
        
          setMovies([...movies, ...series])
      } catch (err) {
          console.error('error', err)
      }
  }

    useEffect(() => {
        handleSearch()
    }, [query])

  return (
    <>
        <section className='search_sectiion'>

            <h3 className='search_results'> Search results for: <span>{query}</span> </h3>
            <div className='search_container'>
                {movies.length > 0 ? (
                    <>
                        {movies.map((movie, index) => (
                            <Link to={movie.type === 'Movie' ? `/movies/${movie._id}` : `/series/${movie._id}`} key={index}> 
                              <div key={index} className='movie_card'>

                                <div className='movie_card_details'>
                                  <img src={movie.image.url} alt={movie.title} className='movie_img_rating_image'/>
                                  <div className='movie_context'>
                                    <p> {movie.year} </p>
                                    <p> {movie.rating[0]?.source}: {movie.rating[0]?.score} </p>
                                  </div>
                                </div>
                                <p className='movieTitle'>
                                  {movie.title} {movie.type && `(${movie.type})`}
                                </p>

                              </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <>
                      <div className='no_movies_container'>

                        <h4 className='no_movies_h4'>Oh darn. We don't have that.</h4>
                        <p className='no_movies_p'>Try searching for another movie or show.</p>
                      </div>
                    </>
                )}
            </div>

        </section>
    </>
  )
}

export default Search
