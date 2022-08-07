
// import React, { useState, useEffect} from 'react'
// import Header from '../../components/header/Header'
// import Message from './Message'
// import axios from 'axios'
// const API_BASE = "http://localhost:8000/api/"

// const ChatInput = ({conversationId, user,currentUser}) => {
//     const username = user?.first_name
//     const[messages, setMessages] = useState([])

//     useEffect(() => {
//         const getMessages = async () => {
//           const response = await axios.get(API_BASE + 'messages/newmessage/'+  conversationId)
            
//           //console.log(response)
//           setMessages(response.data)
//         }    
//         getMessages()
//     }, [conversationId])

//   return (
//     <div>
//       <Header 
//       username={username}
//       authToken='true'/>
//       <hr/>

//       <div className='chatInput_wrapper'>

//         {messages?.map(m => (
//           <Message message={m} own={m.sender === currentUser._id} conversationId={conversationId}/> 
//         ))}
        

//       </div>

//     </div>
//   )
// }

// export default ChatInput
