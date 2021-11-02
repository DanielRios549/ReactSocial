import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { PostContext } from '../contexts/postContext'

export const useAuth = () => useContext(AuthContext)
export const usePost = () => useContext(PostContext)