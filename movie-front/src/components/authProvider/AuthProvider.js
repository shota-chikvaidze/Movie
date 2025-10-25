import React, { useContext, createContext, useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const authContext = createContext({
    user: null,
    setUser: () => {},
    loading: true,
    logoutUser: () => {}
})

export const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [userState, setUserState] = useState(null)

    const setUser = (userData) => {
        setUserState(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logoutUser = () => {
        setUserState(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }
    
    const getUser = async () => {
        try{

            setLoading(true)
            
            const res = await axios.get('/user/getUser')
            setUserState(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            setLoading(false)
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <authContext.Provider value={{ user: userState, setUser, loading, logoutUser }}>
        {children}
    </authContext.Provider>
  )
}


export const useAuth = () => useContext(authContext)