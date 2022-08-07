import React, { useEffect } from 'react'
import { useState } from 'react'
import Bottombar from '../../components/bottombar/Bottombar'
import Header from '../../components/header/Header'
import ChatPage from '../chatpage/ChatPage'
import './dashboard.css'
import SwiperCards from '../../components/swipercards/SwiperCards'
import { useCookies } from "react-cookie"
import axios from 'axios'

const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const DashBoard = () => {
  const authToken = true
  const[genderedUser, setGenderedUser] = useState(null)
  const[user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['User'])
  const userId = cookies.UserId
  
  // console.log(userId)

  const getUser = async () => {
      try{
        const response = await axios.get(API_BASE + 'users/user' , {
          params:{userId}
        })
        setUser(response.data)
         //console.log(user)
      }catch(err){
        console.log(err)
      }
      
  } 
  
  const getGenderedUser = async () => {
    try{
      const gender = user[0].gender_interest
      const response = await axios.get(API_BASE + 'users/gendereduser', {
        params:{gender:user[0].gender_interest}
      })
      setGenderedUser(response.data)
      // console.log(user[0].email)
      // console.log(gender)
      
    }catch(err){
      console.log(err)
    }
      
  }

  const logOut = () => {
    removeCookie('UserId', cookies.UserId)
    window.location.reload()
  }

  // const matchedUser = user?.matches.map(({user_id} ) => user_id)
    
  //   const filteredGUsers = genderedUser?.filter(
  //     gU => !matchedUser.incudes(gU.user_id)
  //   )

  useEffect(() => {
    // console.log(genderedUser)
    getUser()
    getGenderedUser()
   
    
    
  }, [user, genderedUser])
  return (
    <div className='dashboard'>

      <div className='dashboard_page'>

        <Header authToken={authToken} user={user}/>

        {/* <h1 onClick={logOut}>X</h1> */}

        <div className='swiper_card'>
          {genderedUser?.map( g =>
              <SwiperCards 
              user={user}
              userId={userId}
              g={g}
              gUserId={g._id}
            />
            )        
          }
        </div>

      </div>

    

      

      <Bottombar/>
      
    </div>
  )
}

export default DashBoard
