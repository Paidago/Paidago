import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'
import { register, login, verifyToken, logout } from "../api/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export function AuthProvider ({ children })  {
    const [ user, setUser ] = useState(null)
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ errors, setErrors ] = useState(null)
    const [ loading, setLoading ] = useState(true)


    const signup = async user => {
        try{
            const res = await register(user)
            window.localStorage.setItem('token', res.data.token)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error){
            console.error(error.response)
            setErrors(error.response.data)
        }
        
    }

    const signin = async user => {
        try{
            const res = await login(user)
            window.localStorage.setItem('token', res.data.token)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error){
            console.error(error)
            if(!Array.isArray(error.response.data)){
                setErrors([error.response.data.message])
            }else{
                setErrors(error.response.data)
            }            
        }
        
    }

    const signout = async () => {
        try{
            await logout()
            window.localStorage.removeItem('token')
            setUser(null)
            setIsAuthenticated(false)
        }catch(error){
            console.log(error)
        }
    }


    const fetchUser = async () => {
        try{
            const token = window.localStorage.getItem('token')

            if(!token){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }
            const res = await verifyToken(token)

            if(!res.data){
                setIsAuthenticated(false)
                setLoading(false)
            }else{
                setUser(res.data)
                setIsAuthenticated(true)
                setLoading(false)
            } 
        }catch(error){
            setLoading(true)
            setUser(null)
            setIsAuthenticated(false)
            console.error(error.response)
        }
    }

    useEffect(() => {
        if(!errors){
            const timer = setTimeout(() => {
                setErrors([])
            }, 3500)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        fetchUser()
    }, [])


    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            signup,
            signin,
            signout,
            errors,
            loading,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};