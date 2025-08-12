import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Series.css'

export const Series = () => {

  const [series, setSeries] = useState([])

  const handleSeries = async (req, res) => {

    try{

      const res = await axios.get('http://localhost:5000/api/series/all-series')      
      setSeries(res.data.series)

    }catch(err){
      console.error('error', err)
    }

  }

  useEffect(() => {
    handleSeries()
  }, [])

  return (
    <>
      <section className='series_section'>
        <div className='series_container'>
          { series.map((series, index) => (
            <div key={index} className='series_card'>

              <div className='series_card_details'>
                <img src={series.image.url} alt={series.title} />
                <div className='series_context'>
                  <p> {series.year} </p>
                  <p> {series.rating[0]?.source}: {series.rating[0]?.score} </p>
                </div>
              </div>
              <p className='seriesTitle'> {series.title} </p>

            </div>
          ))}
        </div>
      </section>
    </>
  )
}
