import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useCookies} from "react-cookie"
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const AuthModal = ({cancelClick, isSignUp,handleClick}) => {
    let navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loginFailure, setLoginFailure] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['User'])

    
    const [confirmpassword, setConfirmPassword] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(isSignUp && (password !== confirmpassword)){
                setError('passwords dont match')
            }
          
            const response = await axios.post(API_BASE +'auth/'+`${isSignUp ? 'signup' : 'login'}`, {email,password})
            const success = response.status === 201
            
            if(success && isSignUp) navigate('/onboarding')
            if(success && !isSignUp) navigate('/dashboard')
            if(response.status = 500) setLoginFailure(true)
            console.log(response)

            setCookie('Email', response.data.email)
            setCookie('UserId', response.data._id)

        }catch(err){
            console.log(err)
        }
    }

    
    
  return (
    <div>

        
      <div className='auth_modal'>
     
      <span className='cancel_modal' onClick={cancelClick}>X</span>
      <h2>{isSignUp? "Create Account" : 'login'}</h2>

        <form onSubmit={handleSubmit}>

            <input 
            type='email'
            id='email'
            name='email'
            placeholder='email'
            required
            onChange={(e) => setEmail(e.target.value)}/>

            <input 
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}/>

            <input 
            type='Password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='confirm Password'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}/>

            <input 
            className='primary_btn3' 
            type='submit' 
            
            placeholder='submit'
            />

            <p>{error}</p>

        </form>
        {loginFailure && <h3>you dont have an account</h3>}

        <hr/>


        <h3>find your perfect match...</h3>
      </div>
    </div>
  )
}

export default AuthModal
