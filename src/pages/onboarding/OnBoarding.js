import React from 'react'
import './onboarding.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const OnBoarding =  () => {

  const [cookies, setCookie, removeCookie] = useCookies(['User'])
  const[file, setFile] = useState(null)
  
  const handleChange = (e) => {
    
    const value = e.target.value
    const name = e.target.name
    setFormData((prevState) => ({
      ...prevState, [name]:value
    })) 

    //setFile(e.target.files[0])
 
    
  }

  const[formData, setFormData] = useState({
    _id:cookies.UserId,
    first_name:"",
    dob_day:"",
    gender_identity:"",
    gender_interest :"",
    
    url:"",
    about:"",
    

  })


  let navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    console.log('works')
    e.preventDefault()
    if(file){
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      formData.url = fileName
      try{
        await axios.post(API_BASE + 'upload', data)

      }catch(err){
      console.log(err)
      }
    }
    const response = await axios.put(API_BASE + 'auth/onboarding', {formData} )
    const success = response.status === 200
    if(success) navigate('/dashboard')
  }

 

  //console.log(formData)
  return (
    <div >
      <div className='onboarding'>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>First Name</label>
            <input 
              id='first_name'
              type='text'
              name='first_name'
              placeholder='firstName'
              required
              value={formData.first_name}
              onChange={handleChange}
              />            

            <label htmlFor='dob_day'>Birthday</label>
            <div className='multiple_inputs birthday'>
                <input 
                id='dob_day'
                type='number'
                name='dob_day'
                placeholder='DD'
                required
                value={formData.dob_day}
                onChange={handleChange}
                  />
                <input 
                  id='dob_month'
                  type='number'
                  name='dob_month'
                  placeholder='MM'
                  required
                  value={formData.dob_month}
                  onChange={handleChange}
                  />
                <input 
                  id='dob_year'
                  type='number'
                  name='dob_year'
                  placeholder='yyyy'
                  required
                  value={formData.dob_year}
                  onChange={handleChange}
                  />

               
            </div>

            <div className='gender_input'>
            <label className='label'>Gender</label>
            <div className='multiple_inputs'>
            <input 
                id='male'
                type='radio'
                name='gender_identity'
                
                
                value='man'
                onChange={handleChange}
                  />
                <label htmlFor='male'>male</label>
                
                <input 
                  id='female'
                  type='radio'
                  name='gender_identity'
                  
                  
                  value='woman'
                  onChange={handleChange}
                  />
                <label htmlFor='female'>female</label>
                                
            </div>
            
            </div>

            <div className='gender_input'>
            <label className='label'>Interested In</label>
            <div className='multiple_inputs'>
            <input 
                id='male_interest'
                type='radio'
                name='gender_interest'
                
               
                value='man'
                onChange={handleChange}
                  />
                <label htmlFor='male_interest'>male</label>
                
                <input 
                  id='female_interest'
                  type='radio'
                  name='gender_interest'
                  
                 
                  value='woman'
                  onChange={handleChange}
                  />
                <label htmlFor='female_interest'>female</label>
                                
            </div>
            </div>
                       

            <label>about me</label>
            <input
              id='about'
              name='about'
              type='text'
              required
              value={formData.about}
              onChange={handleChange}/>           

          </section>


          <section>
            {file && (
              <div className='share_img_cnt'>
                <img className='share_img' src={URL.createObjectURL(file)}/>
                <button className='share_cancel_img' onClick={()=>setFile(null)}>x</button>
              </div>
            )}
            <label htmlFor='file'>profile photo</label>
              <input type='file'
              name='url'              
              id='file' 
              accept='.png,.jpeg,.jpg'
              onChange={(e) => setFile(e.target.files[0])}
              required/>
              <div className='profile_container'>
                {formData.url && <img alt='profile pic' src={formData.url}/>}
              </div>
              <input type='submit'/>
          </section>
        </form>
      </div>
    </div>
  )
}

export default OnBoarding
