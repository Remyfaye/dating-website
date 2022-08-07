
import React, { useState, useRef, useEffect } from 'react'
import {io} from 'socket.io-client'
import {format} from 'timeago.js'
import axios from 'axios'
import Header from '../../components/header/Header'
import MessageInput from './MessageInput'
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"


const Message = ({clickedConvo, user}) => {

  const[newMessage, setNewMessage] = useState('')
  const[messages, setMessages] = useState(null)
  const convoId = clickedConvo._id
  const conversationId = clickedConvo._id
  const scrollRef = useRef()
  const  socket = useRef()
  // console.log(convoId)
  

  const[otherUser, setOtherUser] = useState(null)
  const currentUserId = user?.[0]._id
  const userId = clickedConvo.members.find((m) => m != currentUserId)
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

  const getMessages = async () => {
    const response = await axios.get(API_BASE + 'messages/allmessages' , {
      params:{convoId}
    })

  setMessages(response.data)
  // socket.current.emit("sendMessager", {
  //   senderId: currentUser._id,
  //   receiverId,
  //   text:newMessage
  // })
}

  const sendMessage = async () => {
      const response = await axios.post(API_BASE + 'messages/newmessage', {
      conversationId:conversationId,
      sender:currentUserId,
      text:newMessage
    })
    // const receiverId = convo.members.find(member=> member !== currentUser._id)
    setMessages([...messages, response.data])
    setNewMessage('')
    
    // socket.current.emit("sendMessager", {
    //   senderId: currentUser._id,
    //   receiverId,
    //   text:newMessage
    // })
  }

  /// scroll behaviour
  useEffect(() => {
    getMessages()
    getOtherUser()
    console.log(newMessage)
  //console.log(conversationId)
  scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages, newMessage])

  //console.log(convoId)

  return (
    <div>

    <Header username={otherUser?.[0].first_name} authToken={true} otherUser={otherUser} />

    <hr></hr>

    <div className='chatInput_wrapper'>
    {messages?.map(m => 

      <MessageInput m={m} own={m.sender === currentUserId} time={m.createdAt}/>
      
    )}
    </div>
      

      <div className='chat_input_text'>
        <textarea type='text' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
        <button  className='chat_submit_btn' onClick={sendMessage}>Send</button>
      </div>
      
    </div>
  )
}

export default Message







  // // messages
  // useEffect(() => {
  // arrivalMessage && convo?.members.includes(arrivalMessage.sender)&& setNewMessage((prev) =>[...prev, arrivalMessage])
  //   },[arrivalMessage, convo])

  // useEffect(() => {
  //   socket.current = io('ws://localhost:8900')
    
  //   socket.current.on("getMessage", data  => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now()
  //     })
  //   })
  // },[])

  // // collect from socket
 

  // // send to socket 
  // useEffect(() => {
  //   socket.current.emit("addUser",currentUser._id)
  //   socket.current.on("getUsers", users => {
  //     setOnlineUsers(currentUser.matches.filter((f) => users.some((u) => u.userId ===f)))
  //     console.log(onlineUsers)
  //   })
  //  },[currentUser])


   // const[arrivalMessage, setArrivalMessage] = useState(null)
  // const[onlineUsers, setOnlineUsers] = useState(null)