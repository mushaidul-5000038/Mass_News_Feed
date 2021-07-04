import {  useState } from "react"
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import '../Styles/Sign_up_in.css'

const Signup = () => {
    const history = useHistory()
    const [user_name,setName]= useState('')
    const [password,setPassword]= useState('')
    
    const [InUse,setInUse]= useState('')

   
    const Register= (e) => {
        e.preventDefault()
        if(user_name && password){
        Axios.post('http://localhost:3001/Signup',
          {
            user_name: user_name,
            password: password ,
            
          }
        ).then((result)=>(result.data.message=='No' ?
            setInUse(true) : history.push('/signinPage') 
             ))
         
        
      
        
      
        
      }
      else{
          alert('Please fill all the input')
        }
      }

    return (
        <div className='signUpIn__form'>

            <h2>Register</h2>
            <hr />
            <form  className='signUpIn__formContainer'>
            <input type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
            <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
            {InUse && <span>UserName not available !</span>}
            <button onClick={Register}>
             Register
            </button>
            </form>
            
        </div>
    )
}

export default Signup
