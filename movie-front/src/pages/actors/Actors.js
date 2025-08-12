import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Actors.css'

export const Actors = () => {

    const [actors, setActors] = useState([])

    const handleActors = async () => {
        try{

            const res = await axios.get('http://localhost:5000/api/actors')
            setActors(res.data.getActors)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        handleActors()
    }, [])

  return (
    <>
        <section className='actors_section'>
            <div className='actors_container'>
                {actors.map((actor, index) => (
                    <div key={index} className='actor_item'>
                        <img src={ actor.image } alt={ actor.title } />
                        <p> {actor.title} </p>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}
