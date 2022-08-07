
import React,{useEffect, useState, useRef} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'
import ChatInput from './ChatInput'
import Header from '../../components/header/Header'
import Message from './Message'
import { useNavigate } from 'react-router-dom'
import {format} from 'timeago.js'

const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const ChatDisplay = ({user,convo, time}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const currentUserId = user?.[0]._id
  const[otherUser, setOtherUser] = useState(null)
  const[clickedConvo, setClickedConvo] = useState(null)
  const userId = convo.members.find((m) => m != currentUserId)
  //console.log(otherUser)

  const getOtherUser = async () => {
    try{
      const response = await axios.get(API_BASE + 'users/user' , {
        params:{userId}
      })
      setOtherUser(response.data)
       //console.log(user)
    }catch(err){
      console.log(err)
    }
    
} 
  useEffect(() => {
    getOtherUser()
  }, [otherUser])

  return (
    <div className='chat'>

      
           <><div >
           <div className='chatDisplay' >
     
               <div className='chatDisplay_wrapper'>

                <div className='chat_display_img_alt'>
                   
                  <img className='chat_display_img' src={PF + otherUser?.[0].url}/>
                </div>
                   <div className='chat_display_info'>
                   <div className='info_name'>{otherUser?.[0].first_name}</div>
                   
                   </div>
               </div>
     
               <div className='time_stamp'></div>
     
               </div>
           </div>
           </>


     
    {/* {clickedConvo && <Message ={otherUser}/>} */}
    
      {/* <ChatInput convo={convo} user={user} />  */}
     
        

{/* : <ChatInput conversationId={conversationId} user={user} currentUser={currentUser} */}
        



      
    </div>
    

   
  )
}

export default ChatDisplay
