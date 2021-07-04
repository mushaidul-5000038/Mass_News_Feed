import { useEffect, useState } from "react"
import Axios from 'axios'
import {useDataLayerValue} from '../DataLayer'
import { useHistory } from "react-router-dom"
import '../Styles/Sign_up_in.css'

const Login = () => {

    const history = useHistory()

    const [{user},dispatch] = useDataLayerValue()
    const [userFound,setUserFound] = useState('')
    const [user_name,setLogName]= useState('')
    const [password,setLogPassword]= useState('')

    useEffect(() => {        
         if(user?.user){
             history.push('/')
         }
    }, [userFound,user])

    const LoginNow=  (e) =>{
        e.preventDefault()
          if(user_name && password){
              Axios.post('http://localhost:3001/Login',
              {
                user_name: user_name,
                password: password ,
                
              }
              ).then((response) => {
            
            
                  if (response.data.length>0) {
                          setUserFound(false)
                          dispatch({
                            type:"SET_USER",
                            user:response.data
                          }) 
                          
                          window.location.reload(false);
                  }
                  else{
                        setUserFound(true)
                          
                        console.log('user not found')
                   }
        
            
              });    
      
        }
      else{
            alert('Please fill all the input')
          }
      
        }

    return (
        <div className='signUpIn__form'>
                    <h2>Login</h2>
                    <hr />
                    <form  className='signUpIn__formContainer'>
                        <input type="text" placeholder='Enter your name' onChange={(e)=>setLogName(e.target.value)}/>
                        <input type="password" placeholder='Enter your password' onChange={(e)=>setLogPassword(e.target.value)} />
                        {userFound&& <span>Incorrect username or password !</span>}
                        
                        <button onClick={LoginNow}>
                            Login
                        </button>
                    </form>
            
        </div>
    )
}

export default Login
