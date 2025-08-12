import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './MyList.css'

const MyList = () => {

  const [myList, setMyList] = useState([])

  const handleFetchList = async () => {
    try{
      
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:5000/api/myList', {
        headers: {Authorization: `Bearer ${token}`}
      })

      setMyList(res.data)

    }catch(err){
      console.error('Error fetching my list:', err);
    }
  }

  useEffect(() => {
    handleFetchList()
  }, [])

  return (
    <>
      <section className='myList_wrapper_section'>


      {myList.length === 0 ? (
        <>
          <div className='no_movies_sect'> 
            No Movies in Your List
          </div>
        </>
      ) : (
        <>
          <div className='myList_sect'>
            {myList.map((myList, index) => (
              <Link to={`/movies/${myList._id}`} >
                <div key={index} className='myList_item' >
                  <img src={myList.image.url} alt={myList.title} />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>

      
    </>
  )
}

export default MyList
