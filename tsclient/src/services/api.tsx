import axios from 'axios' 
import { IFormInput } from '../types/interface'
// import authHeader from './auth'
import { useAuth } from '../hooks/context/context'

// const state = useAuth()


export const api = axios.create({
    baseURL: import.meta.env.DEV ? "http://localhost:4000" : import.meta.env.VITE_API_URL
})


// export const getProtected = () => {
    
// {    return axios.get('http://localhost:4000/users/protected', { headers: { Authentication: state.token}})
// }}
