import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import './userComments.css'

const UserComments = () => {
    
    const [ allComments, setAllComments ] = useState([])

    const fetchComments = async () => {
        try{

            const token = localStorage.getItem('token')
            if(!token) return

            const decoded = jwtDecode(token)
            const userId = decoded.id

            const res = await axios.get(`http://localhost:5000/api/comment/get-user-comment/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setAllComments(res.data.userComments)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

  return (
    <>
      <div>
        {allComments.length === 0 ? (
          <p className='no_comments_para'>No comments found.</p>
        ) : (
          allComments.map((comment, index) => (
            <div key={index} className='all_comments_item'>
              <p>{comment.movie.title}</p>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default UserComments
