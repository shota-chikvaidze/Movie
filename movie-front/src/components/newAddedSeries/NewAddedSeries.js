import React, { useState, useEffect } from 'react'
import './NewAddedSeries.css'
import axios from 'axios'
import { LiaArrowRightSolid, LiaArrowLeftSolid } from "react-icons/lia";
import { Link } from 'react-router-dom'
import { FiTv } from "react-icons/fi";

const NewAddedSeries = () => {

    const [slider, setSlider] = useState(0)
    const [newSeries, setNewSeries] = useState([])
    const [loading, setLoading] = useState(true)

    const seriesPerPage = 7
    const totalSeries = newSeries.length
    const maxPage = Math.max(0, Math.ceil(totalSeries / seriesPerPage) - 1)

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

    const fetchNewAddedSeries = async () => {
        try{

            setLoading(true)
            const res = await axios.get('http://localhost:5000/api/series/new-added-series')
            
            setNewSeries(res.data.newRealesedSeries)
            setLoading(false)
            
        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchNewAddedSeries()
    }, [])

  return (
    <section className='slider_3_section'>
        <div className="slider_series_container">
          <div className='slider_title_wrapper'>
            <span>
              <FiTv />
            </span>
            <h1>New Added Series</h1>
          </div>
          <button onClick={prev} disabled={slider === 0} className="series_slider_btn series_slider_btn_left"> <LiaArrowLeftSolid /> </button>

          <div className="slider_3_series_wrapper">
              <div className='series_track' style={{ transform: `translateX(-${slider * 100}%)` }}>

                { loading ? (
                  <>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className='slider_3_series_card skeleton_card'></div>
                    ))}
                  </>
                ) : (
                  <>
                    { newSeries.map((newSeries, index) => (
                      // <Link to={`/movies/${newSeries._id}`} >
                        <div key={index} className='slider_3_series_card'>

                          <div className='slider_3_series_card_details'>
                            <img src={newSeries.image.url} alt={newSeries.title} className='movie_img_rating_image'/>
                            <div className='slider_3_series_context'>
                              <p> {newSeries.year} </p>
                              <p> {newSeries.rating[0]?.source}: {newSeries.rating[0]?.score} </p>
                            </div>
                          </div>
                          <p className='slider_3_seriesTitle'> {newSeries.title} </p>

                        </div>
                      // </Link>
                    )) }
                  </>
                ) }

                  
              </div>
          </div>
          
          <button onClick={next} disabled={slider === maxPage} className="series_slider_btn series_slider_btn_right"> <LiaArrowRightSolid /> </button>
        </div>
    </section>
  )
}

export default NewAddedSeries