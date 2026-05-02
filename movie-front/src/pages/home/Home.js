import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { Link } from 'react-router-dom'
import NewAddedMovies from '../../components/newAddedMovies/NewAddedMovies'
import NewAddedSeries from '../../components/newAddedSeries/NewAddedSeries'
import './Home.css'

export const Home = () => {

  const [movies, setMovies] = useState([])
  const [slider, setSlider] = useState(0)
  const [loading, setLoading] = useState(true)

  const moviesPerView = 1
  const totalMovies = movies.length
  const maxIndex = Math.max(0, Math.ceil(totalMovies / moviesPerView) - 1)

  const prev = () => {
    if(slider > 0){
      setSlider(slider - 1)
    }
  }

  const next = () => {
    if(slider < maxIndex){
      setSlider(slider + 1)
    }
  }

  const fetchFeaturedMovies = async () => {
    try{

      setLoading(true)
      const res = await axios.get(`/movies/featured-movies`)
      
      setMovies(res.data.content)
      setLoading(false)

    }catch(err){
      console.error("error", err)
    }
  }

  useEffect(() => {
    fetchFeaturedMovies()
  }, [])


  return (
    <>
      <section className='slider_section'>
        <div className='slider_wrapper'>
          <button onClick={prev} className='nav_btn' disabled={slider === 0}>Prev</button>

          <div className='slider_container'>
            <div className='slider_track' style={{ transform: `translateX(-${slider * 100}%)` }} >
              
              { loading ? (
                <>
                  {Array.from({ length: 1 }).map((_, index) => (
                    <div key={index} className='slider_movie_item skeleton_card'></div>
                  ))}
                </>
              ) : (
                movies.map((movie, index) => (
                  <div className='slider_movie_item' key={movie._id}>
                    <div className='slider_movie_item slider_image'>
                      <img src={movie?.image} alt={movie?.title} />
                    </div>
                    <div>
                      <Link to={`/movies/${movie._id}`}>
                        <button className='slider_watch_movie_btn'> Watch a Movie </button>
                      </Link>
                      <div className='slider_movie_context'>
                        <h3 className='slider_movie_title'> {movie.title} </h3>
                        <div className='slider_movie_genre'>
                          <p> {movie.genre} </p>
                          <p>
                            <span>{movie?.rating?.[0]?.source}</span>
                            {movie?.rating?.[0]?.score || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) }

            </div>
          </div>

          <button onClick={next} className='nav_btn' disabled={slider === maxIndex}>Next</button>
        </div>
      </section>

      
      <NewAddedMovies />

      <NewAddedSeries />
      
    </>
  )
} 