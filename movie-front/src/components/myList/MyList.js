import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { Link } from 'react-router-dom'
import './MyList.css'
import { TbHttpDelete } from "react-icons/tb";

const MyList = () => {

  const [myList, setMyList] = useState([])
  const [loading, setLoading] = useState(true)

  const handleFetchList = async () => {
    try{
      
      setLoading(true)
      const res = await axios.get('/myList')

      setMyList(res.data)
      setLoading(false)

    }catch(err){
      console.error('Error fetching my list:', err);
    }
  }

  useEffect(() => {
    handleFetchList()
  }, [])

  const deleteMovie = async (movieId) => {
    try{

      const res = await axios.delete(`/myList/delete-movie/${movieId}`)

      setMyList((prevMovie) => {
        return prevMovie.filter((del) => del._id !== movieId)
      })

    }catch(err){
      console.error('error', err)
    }
  }

  return (
    <>
      <section className='myList_wrapper_section'>

        {loading ? (
          <>
            <div className='myList_sect row_skeleton'>
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="myList_item myList_skeleton"></div>
              ))}
            </div>
          </>
        ) : (
          <>
            {myList.length === 0 ? (
              <div className='no_movies_sect'> 
                No Movies in Your List
              </div>
            ) : (
              <div className='myList_sect'>
                {myList.map((myListt, index) => (
                  <div key={index} className='myList_item' >
                      <Link to={`/movies/${myListt._id}`} >
                        <img src={myListt.image.url} alt={myListt.title} />
                      </Link>
                      <TbHttpDelete onClick={() => deleteMovie(myListt._id)} className='movie_del' />  
                    </div>
                ))}
              </div>
            )}
          </>
        )}

      </section> 

    </>
  )
}

export default MyList
