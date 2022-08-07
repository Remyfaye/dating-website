import React,{useState, useEffect} from 'react'
import './swipercards.css'
import TinderCard from 'react-tinder-card'
import { useCookies } from "react-cookie"
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel';
import RecommendIcon from '@mui/icons-material/Recommend';
import ChatDisplay from '../../pages/chatpage/ChatDisplay'

const API_BASE = "https://faysdatingwebapp.herokuapp.com/"



const SwiperCards = ({g,user,gUserId, userId}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [cookies, setCookie, removeCookie] = useCookies(['User'])
    const [lastDirection, setLastDirection] = useState()
    const [newMessage, setNewMessage] = useState('')
    const [getMatch, setGetMatch] = useState(null)
    const [mess, setMess] = useState(null)
    const[messageState, setMessageState] = useState(false)
    const[conversationId, setConversationId] = useState(null)
    const senderId = userId
    const receiverId = gUserId
     
    const addMatches = async () => {
      
      const response = await axios.put(API_BASE + 'users/addmatch', {
        gUserId,
        userId
      })
      setGetMatch(response.data)
      
      setCookie("Match", response.data.getmatch)
      console.log(response)
    }

    
  const sendMessage = async () => {
    const response = await axios.post(API_BASE + 'messages/startConvo', {
      senderId, receiverId
    })
     setConversationId(response.dada)
     
    const response2 = await axios.post(API_BASE + 'messages/newMessage', {
    conversationId:response.data,
    sender:userId,
    text:newMessage 
  })


  
  // const receiverId = convo.members.find(member=> member !== currentUser._id)
  setNewMessage('')
  setMessageState(false)
  // socket.current.emit("sendMessager", {
  //   senderId: currentUser._id,
  //   receiverId,
  //   text:newMessage
  // })
}

     
// const createConvo = async () => {
//   const response = await axios.post(API_BASE + 'messages/newmessage', {
//   members: [{senderId:userId, receiverId:gUserId}]
// })
//  setConversationId(response.dada)

// }

    // const handleMessage = () => {
    //   createConvo()
    //   sendMessage()
    // }
    //console.log(PF + g?.url)

  return (
    <div>
       
          <div style={{ backgroundImage: `url('${PF + g?.url}')` }} className='card'>

            <div className='card_info'>
              
              <h3 className='g_first_name'>{g.first_name}</h3>              
              <h3 className='g_about'>{g.about}</h3>
             
            </div>

            {messageState ?
            
                <div className='chat_input_text dashboard'>
                  <div className='text_area'>
                  <textarea type='text' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
                  <button  className='cancel_text_area' onClick={() => setMessageState(false)}>X</button>
                  </div>
                  <button  className='chat_submit_btn' onClick={sendMessage}>Send</button>
                  
                </div>

              : <div className='card_icon'>
              <button className='card_icon_item' onClick={() => setMessageState(true)} style={{Color:"red"}}>Message</button>
              <button className='card_icon_item' onClick={addMatches}> Save</button> 
            </div> 
            }
           

              
            
            
            {/* <ChatDisplay/> */}
             
                        
          </div>
    

      

        {/* <div className='card_container' style={{ backgroundImage: 'url('+ PF + profileimg + ')' }}>
            <h1>namw</h1>
        </div> */}

       {/* {characters.map((character) =>
        //   <TinderCard 
        //   className='swipe' 
        //   key={character.name} 
        //   onSwipe={(dir) => swiped(dir, character.name)} 
        //   onCardLeftScreen={() => outOfFrame(character.name)}> */}

            {/* <div  className='card'>
              <h3>{user.first_name}</h3>
              
            </div> */}
            
        {/* //     <div className='swipe_indo'></div>
        //   </TinderCard>
        // )}  */}

      {/* {genderedUser.map( g => {
        <div style={{ backgroundImage: `url('${g.url}')` }} className='card'>
          <h3>{g.first_name}</h3>              
        </div>
      })} */}

{/* const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    } */}
    
{/* 

    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    } */}

    </div>
  )
}

export default SwiperCards
