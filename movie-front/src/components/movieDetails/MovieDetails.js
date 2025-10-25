import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './MovieDetails.css'
import Rating from '../rating/Rating'

import { FaRegHeart } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import userAvatar from '../../assets/images/user-avatar.png'

const MovieDetails = () => {

  const [ movieDetails, setMovieDetails ] = useState({})
  const { id } = useParams()
  const [ errorPopup, setErrorPopup ] = useState(false)
  const [ errorForm, setErrorForm ] = useState({
    name: '',
    lastname: '',
    email: '',
    comment: '',
  })
  const [ comment, setComment ] = useState({
    text: '',
    movie: id,

  }) 
  const [ getComment, setGetComment ] = useState([])
  
  const fetchMovieById = async () => {
      try{

          const res = await axios.get(`http://localhost:5000/api/movies/movies-by-id/${id}`)
          setMovieDetails(res.data.getMoviesById)
          
      }catch(err){
          console.error('error', err)
      }
  }

  useEffect(() => {
      fetchMovieById()
  }, [id])

  const navigate = useNavigate()

  const handleError = async (e) => {
    
    try{
      e.preventDefault()

      const res = await axios.post('http://localhost:5000/api/error', errorForm)
      
      if(res.status === 200){
        navigate(`/movies/${id}`)
        setErrorPopup(false)
      }

    }catch(err){
      console.error('error', err)
    }

  }

  const handleopen = () => {
    setErrorPopup(true)
  }

  const handleClose = () => {
    setErrorPopup(false)
  }

  const handleChange = (e) => {
    setErrorForm({...errorForm, [e.target.name]: e.target.value})
  }

  const handleToggleMyList = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(
        'http://localhost:5000/api/myList',
        { movieId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { action } = res.data

      if(action === 'added'){
        alert('movie added to your list')
      }else if(action === 'removed'){
        alert('movie removed from your list')
      }



    } catch (err) {
      alert('You must be logged in to add to My List');
    }
  };



  // FETCH COMMENT


  const handlePostComments = async () => {
    try{

      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:5000/api/comment/post-comment',
        {
          text: comment.text,
          movieId: comment.movie
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.status === 201) {
        setComment({ text: '', movie: id })
        handleGetComments(); 
      }


    }catch(err){
      console.error('error', err)
    }
  }


  const handleGetComments = async () => {
    try{
      
        const res = await axios.get('http://localhost:5000/api/comment/get-comment', {
          params: {
            movieId: comment.movie
          }
        })
        if (res.status === 200) {
          setGetComment(res.data.comments);
        }
        
    }catch(err){
      console.error('error', err)
    }
  }

  useEffect(() => {
    handleGetComments()
  }, [id])

  const handleTextChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }

  return (
    <>
        <section className='movie_details_section'>
            <div className='movie_details_container'>
                <div className='movie_video_wrapper'>
                    
                    <img src={movieDetails.image?.url} alt={movieDetails.title} />
                    <div className="movie_video">
                      <iframe
                        src={movieDetails.videoPath}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={movieDetails.title}
                      ></iframe>
                    </div>

                </div>
                
                <div className='movie_details'>
                    <div className='movie_title_wrapper'>
                      <div className='title_div'>
                        {movieDetails.title} <span> ({movieDetails.year}) </span>
                      </div>
                      <div className='icon_div'>
                        <IoMdTime className='time_icon' onClick={() => handleToggleMyList(movieDetails._id)} title="Add or remove this movie from your list" />
                        <BiError className='error_icon' onClick={handleopen} title="Report an issue" />
                      </div>
                    </div>

                    <div className='rating_container'>
                      <div>
                        <p>
                          {Array.isArray(movieDetails.rating) && movieDetails.rating[0] ? (
                            <>
                              <span className='rating_source'>{movieDetails.rating[0].source}</span>{" "}
                              {movieDetails.rating[0].score}
                            </>
                          ) : (
                            "No ratings available"
                          )}
                        </p>
                      </div>

                      <Rating movieId={id} />
                      
                    </div>

                    <div className='movie_details_item'>

                      <p> Year: <span> {movieDetails.year} </span> </p>
                      <p> Genre:  <span> {movieDetails.genre} </span> </p>
                      <p> Director:  <span> {movieDetails.director} </span> </p>
                      <p>
                      {Array.isArray(movieDetails.starring) && movieDetails.starring.length >= 3 ? (
                            <>
                              Actor:{" "}
                              <span>{movieDetails.starring[0].actor}</span>,{" "}
                              <span>{movieDetails.starring[1].actor}</span>,{" "}
                              <span>{movieDetails.starring[2].actor}</span>
                            </>
                          ) : (
                            "No actors available"
                          )}
                      </p>
                    </div>

                    <div className='movie_details_desc'>
                      <p> Description: <span> { movieDetails.description } </span> </p>
                    </div>
                </div>

            </div>
        </section>

        <section className='comment_sect'>
          <div className='comment_container'>

            <div className='comments_length'>
              <h3>{getComment.length} Comments</h3>
            </div>
            <div className='send_comment_wrapper'>

              <div className='text_img_wrapper'>
                <img src={userAvatar} alt='user avatar' />
                <input type='text' required value={comment.text} onChange={handleTextChange} name='text' />
              </div>

              <div className='comment_post_btn_wrapper'>
                <button 
                onClick={handlePostComments}
                className={comment?.text?.length === 0 ? 'comment_btn_disabled' : 'comment_btn_allowed'} 
                disabled={comment?.text?.length === 0}> 
                  Comment 
                </button>
              </div>

            </div>

            {getComment.map((comment, index) => (
              <>
                <div key={index} className='comment_item'>
                  <div>
                    <img src={userAvatar} alt='user avatar' />
                  </div>
                  <div className='comment_side_wrapper'>
                    <p className='comment_user'>
                      <span> {comment.user?.name} {comment.user?.lastname}</span> 
                      {new Date(comment.postedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                    <p className='comment_text'> {comment.text} </p>
                  </div>
                </div>
              </>
            ))}
            
          </div>
        </section>


        { errorPopup && (
          <div className='popup_overlay'>
            <div className='popup'>

              <div className='popup_movie_side'>
                <img src={movieDetails.image?.url} alt={movieDetails.title} />
                <p> {movieDetails.title} ({movieDetails.year}) </p>
              </div>

              <form onSubmit={handleError} className='error_message_form'>

                <input name='name' type='text' onChange={handleChange} placeholder='Your name'  /> 
                <input name='lastname' type='text' onChange={handleChange} placeholder='Your lastname' /> 
                <input name='email' type='email' onChange={handleChange} placeholder='Your email' /> 
                <textarea name='comment' onChange={handleChange} placeholder='type your problem here'  /> 

                <button type='submit'>submit</button>
              </form>

              <IoClose className='close_btn' onClick={handleClose} />

            </div>
          </div>
        ) }
    </>
  )
}

export default MovieDetails
