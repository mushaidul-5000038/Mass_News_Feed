import '../Styles/Header.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { useDataLayerValue } from '../DataLayer';

const Header = () => {
    const [{user},dispatch] = useDataLayerValue()
    const Logout=(e)=> {
        e.preventDefault()
        
        Axios.post('http://localhost:3001/Logout',
            {
            dnk:'any',
              
            }
          ).then(()=> console.log('loggedOut')
          )

          dispatch({
            type:"SET_USER",
            user:null
          })
          
    
        //   setLoginState(false)
        //   setUser('')
        //   setName('')
        //   setPassword('')  
        }
    return (
        <div className='header'>
            <div className='header__container'>

                <div className='header__rightPortion'>
                    <Link to='/'><h2>Home</h2></Link>
                </div>

                <div className='header__leftPortion'>
                  
                   {!user &&<Link to='/signup'><h2 className='header__item'>Sign Up</h2></Link>}
                   {!user && <Link to='/signinPage'><h2 className='header__item'>Login</h2></Link> } 

                    {user&& <h2 onClick={Logout} className='header__item header__logout'>Logout</h2>}

                </div>
                
                    
            </div>
               
        </div>
    )
}

export default Header
