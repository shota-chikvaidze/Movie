import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Actors.css'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";


export const Actors = () => {

    const [actors, setActors] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)

    const fetchActors = async (page) => {
      try{

          setLoading(true)
          const res = await axios.get(`http://localhost:5000/api/actors/get-actors/?page=${page}&limit=20`)
          
          setActors(res.data.actors)
          setCurrentPage(res.data.currentPage)
          setTotalPages(res.data.totalPage)
          setLoading(false)

      }catch(err){
          console.error('error', err)
      }
    }

    useEffect(() => {   
      fetchActors(currentPage)
    }, [currentPage])

  return (
    <>
        <section className='actors_section'>
            <div className='actors_container'>

              {loading ? (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className='actor_item skeleton_card'></div>
                  ))}
                </>
              ) : (
                actors.map((actor, index) => (
                  <Link to={`/actors/${actor._id}`} >
                    <div key={index} className='actor_item'>
                      <div className='actor_item_image'>
                        <img src={ actor.image } alt={ actor.title } />
                      </div>
                        <p> {actor.name} </p>
                    </div>
                  </Link>
                ))
              )}

                
            </div>

            {actors.length === 0 ? (
              <>
              
              </>
            ) : (
              <>
                <div className="pagination_controls">
                  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} > <MdOutlineNavigateBefore /> </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} > <MdOutlineNavigateNext /> </button>
                </div>
              </>
            )}
        </section>
    </>
  )
}
