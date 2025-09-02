import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './ActorDetails.css'
import { FaAward } from "react-icons/fa";

const ActorDetails = () => {

  const { id } = useParams()
  const [ actorDetails, setActorDetails ] = useState(null)

  const fetchActorDet = async () => {
    try{

      const res = await axios.get(`http://localhost:5000/api/actors/get-actors-details/${id}`)
      setActorDetails(res.data.getActorsDetail)

    }catch(err){
      console.error('error', err)
    }
  }

  useEffect(() => {
    fetchActorDet()
  }, [])

  if(!actorDetails) return <p className="loading_text">Loading actor details...</p>

  return (
    <div className="actor_details_container">
      <div className="actor_details_left">
        <img src={actorDetails.image} alt={actorDetails.name} className="actor_image"/>
        <h1 className="actor_name">{actorDetails.name}</h1>
        <div className="actor_basic_info">
          <p><strong>Born:</strong> {actorDetails.born}</p>
          <p><strong>Height:</strong> {actorDetails.height} cm</p>
        </div>
      </div>

      <div className="actor_right">
        <section className="actor_bio_sect">
          <h2>Biography</h2>
          <p>{actorDetails.bio}</p>
        </section>

        <section className="actor_movies_sect">
          <h2>Movies</h2>
          <div className="movies_grid">
            {actorDetails.movies.map((movie, index) => (
              <div key={index} className="actor_movies">
                <p>{movie}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="actor_awards_sect">
          <h2>Awards</h2>
          <ul>
            {actorDetails.rewards.map((award, index) => (
              <li key={index}><FaAward className='actor_reward_icon' /> {award}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default ActorDetails
