import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { jwtDecode } from 'jwt-decode'
import './userComments.css'
import { TbHttpDelete } from "react-icons/tb";


const UserComments = () => {
    
    const [ allComments, setAllComments ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const fetchComments = async () => {
        try{

            setLoading(true)
            const token = localStorage.getItem('token')
            if(!token) return

            const decoded = jwtDecode(token)
            const userId = decoded.id

            const res = await axios.get(`/comment/get-user-comment/${userId}`)

            setAllComments(res.data.userComments)
            setLoading(false)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const handleDeleteComment = async (commentId) => {
      try{

        const token = localStorage.getItem('token')
        if(!token) return

        const res = await axios.delete(`/comment/delete-comment/${commentId}`)
        setAllComments((prevComment) => {
          return prevComment.filter((del) => del._id !== commentId)
        })

      }catch(err){
        console.error('error', err)
      }
    }

  return (
    <>
      <div>

        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='all_comments_item rating_skeleton'></div>
          ))
        ) : (
          allComments.length === 0 ? (
            <p className='no_comments_para'>No comments found.</p>
          ) : (
            allComments.map((comment, index) => (
              <div key={index} className='all_comments_item'>
                <p>{comment.movie.title}</p>
                <p>{comment.text}</p>
                <TbHttpDelete onClick={() => handleDeleteComment(comment._id)} className='del_icon' />  
              </div>
            ))
          )
        )}

        
      </div>
    </>
  )
}

export default UserComments
