
import React,{useRef, useEffect} from 'react'
import {format} from 'timeago.js'

const MessageInput = ({m, own,time}) => {
    const scrollRef = useRef()
    //console.log(own)

    useEffect(() => {
      scrollRef.current?.scrollIntoView()
      },[own])

  return (
    <div >
        
      <div ref={scrollRef}>
        <div className={own ? 'chat_right' : 'chat_left'}>
            <span>{m.text}</span> <br/>
            <div className='format_time'>{format(time)}</div>          
        </div>
      </div>
    </div>
  )
}

export default MessageInput
