import React, { useState, useEffect } from 'react'
import './NewAddedMovies.css'
import axios from 'axios'
import { LiaArrowRightSolid, LiaArrowLeftSolid } from "react-icons/lia";
import { Link } from 'react-router-dom'

const NewAddedMovies = () => {

    const [slider, setSlider] = useState(0)
    const [newMovies, setNewMovies] = useState([])

    const moviesPerPage = 6
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

            const res = await axios.get('http://localhost:5000/api/movies/new-added-movies')
            setNewMovies(res.data.newRealesed)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchNewAddedMovies()
    }, [])

  return (
    <section className='slider_2_section'>
        <div className="slider-container">
        <h1>New Added Movies</h1>
            <button onClick={prev} disabled={slider === 0} className="slider-btn slider-btn-left"> <LiaArrowLeftSolid /> </button>

            <div className="movies-wrapper">
                <div className='movies-track' style={{ transform: `translateX(-${slider * 100}%)` }}>
                    { newMovies.map((newMovie, index) => (
                      <Link to={`/movies/${newMovie._id}`} >
                        <div key={index} className='movie_card'>
                                        
                          <div className='movie_card_details'>
                            <img src={newMovie.image.url} alt={newMovie.title} className='movie_img_rating_image'/>
                            <div className='movie_context'>
                              <p> {newMovie.year} </p>
                              <p> {newMovie.rating[0]?.source}: {newMovie.rating[0]?.score} </p>
                            </div>
                          </div>
                          <p className='movieTitle'> {newMovie.title} </p>
                                        
                        </div>
                      </Link>
                    )) }
                </div>
            </div>

            <button onClick={next} disabled={slider === maxPage} className="slider-btn slider-btn-right"> <LiaArrowRightSolid /> </button>
        </div>
    </section>
  )
}

export default NewAddedMovies
