import React, { useState, useEffect } from 'react'
import './NewAddedMovies.css'
import axios from '../../api/axios'
import { LiaArrowRightSolid, LiaArrowLeftSolid } from "react-icons/lia";
import { Link } from 'react-router-dom'
import { RiMovie2Line } from "react-icons/ri";


const NewAddedMovies = () => {

    const [slider, setSlider] = useState(0)
    const [newMovies, setNewMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const moviesPerPage = 7
    const totalMovies = newMovies.length
    const maxPage = Math.max(0, Math.ceil(totalMovies / moviesPerPage) - 1)

    const prev = () => {
        if(slider > 0 ){
            setSlider(slider - 1)
        }
    }

    const next = () => {
        if(slider < maxPage){
            setSlider(slider + 1)
        }
    }

    const fetchNewAddedMovies = async () => {
        try{

            setLoading(true)
            const res = await axios.get('/movies/new-added-movies')

            setNewMovies(res.data.newRealesed)
            setLoading(false)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchNewAddedMovies()
    }, [])

  return (
    <section className='slider_2_section'>
        <div className="slider_2_container">
          <div className='slider_title_wrapper'>
            <span>
              <RiMovie2Line />
            </span>
            <h1>New Added Movies</h1>
          </div>
          <button onClick={prev} disabled={slider === 0} className="slider_btn slider_btn_left"> <LiaArrowLeftSolid /> </button>

          <div className="slider_2_movies_wrapper">
              <div className='slider_2_movies_track' style={{ transform: `translateX(-${slider * 100}%)` }}>
                { loading ? (
                  <>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className='slider_2_movie_card skeleton_card'></div>
                    ))}
                  </>
                ) : (
                  <>
                    { newMovies.map((newMovie, index) => (
                      <Link to={`/movies/${newMovie._id}`} >
                        <div key={index} className='slider_2_movie_card'>

                          <div className='slider_2_movie_card_details'>
                            <img src={newMovie.image.url} alt={newMovie.title} className='movie_img_rating_image'/>
                            <div className='slider_2_movie_context'>
                              <p> {newMovie.year} </p>
                              <p> {newMovie.rating[0]?.source}: {newMovie.rating[0]?.score} </p>
                            </div>
                          </div>
                          <p className='slider_2_movieTitle'> {newMovie.title} </p>

                        </div>
                      </Link>
                    )) }
                  </>
                ) }

              </div>
          </div>
          
          <button onClick={next} disabled={slider === maxPage} className="slider_btn slider_btn_right"> <LiaArrowRightSolid /> </button>
        </div>
    </section>
  )
}

export default NewAddedMovies
