import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/header/Header'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'
import ChatHeader from './ChatHeader'
import './chatpage.css'
import Bottombar from '../../components/bottombar/Bottombar'
import Message from './Message'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const ChatPage = () => {
  let navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['User'])
  const[user, setUser] = useState(null)
  const[clickedUser, setClickedUser] = useState(null)
  const[clickedConvo, setClickedConvo] = useState(null)
  const[btnState,setBtnState] = useState(true)
  const[convos,setConvos] = useState([])
  const userId = cookies.UserId
  const email = cookies.Email
  // console.log(userId)
  //console.log(clickedUser)

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

  const getConvos = async () => {
    const response = await axios.get(API_BASE + 'messages/allconvos', {
      params:{userId}
    })
    setConvos(response.data)
    //console.log(convos)
  }

  // const navigateToMessages = () => {
  //   setClickedUser()
  // }

  useEffect(() => {
    getUser()
    getConvos()
},[user])

    

  return (
    <div className='chat_page__'> 
     
     {!clickedConvo && <ChatHeader setBtnState={setBtnState} convos={convos}/>}
     

      <div  >
       
       
      {btnState && 
        convos.map(convo => 
          
         
            <div onClick = {() => setClickedConvo(convo)} >
              {!clickedConvo && 
                <ChatDisplay convo={convo} user={user} time={clickedConvo?.createdAt}/> 
              }
            </div>
        )
      }
      
      {clickedConvo && <Message clickedConvo={clickedConvo} user={user}/>} 
       
       </div>

      {!btnState && <MatchesDisplay user={user}  setClickedUser={setClickedUser}/>}

      <div className='chst_display_ulti'>{!clickedConvo && <Bottombar/> }</div>
     

        
     
      
      

      {/* {chatInput ? <ChatInput/> : null} */}

      
     
    </div>
  )
}

export default ChatPage
