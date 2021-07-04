import Axios from 'axios'
import { useEffect, useState } from 'react';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AltDashboard from './Components/AltDashboard';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useDataLayerValue } from './DataLayer';



function App() {

  const [{user},dispatch] = useDataLayerValue()   
   //const [loginState,setLoginState]= useState(false)
  
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log('app useeeffff')
    Axios.get("http://localhost:3001/Login").then((response) => {
    console.log(response.data.loggedIn)  
    if (response.data.loggedIn == true) {
        
        
        dispatch({
          type:"SET_USER",
          user:response.data
        })
      }
    });
    
  }, []);


  return (
    

    <Router>
    <div className="App">
       <Header/>
      <div className='app__body'>
      <Switch>
           <Route path='/signinPage'>
            {<Login/> }
            
          </Route>
          <Route path='/signup'>
          
           {<Signup/>} 
          </Route>
          <Route path='/'>
            {user?<Dashboard/>:<AltDashboard/>}
            
          </Route>
      </Switch> 


      </div>
      
    </div>
    </Router>

      


    
  );
}

export default App;
