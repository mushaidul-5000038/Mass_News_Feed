import Axios from 'axios'
import { useEffect, useState } from 'react'
import '../Styles/Card.css'
import {useDataLayerValue} from '../DataLayer'

const Card = ({user_name,current_user,image_path,caption,total_votes,postedTime}) => {
    
    const [{user}]=useDataLayerValue()
    
    const[uservote,SetUserVote]= useState(-1)
    const[tvote,setTvote]=useState(total_votes)
    
    useEffect(()=>{
       console.log('card useefffff')
       if(uservote==0){ 
       inputVote()
       }


    },[uservote,total_votes])  

    const inputVote=()=>{
        if( uservote==0 ){
            console.log('uservote')
            Axios.post('http://localhost:3001/voteAdd',
             {
                 user_name:user_name,
                 current_user:current_user,
                 image_path:image_path,
             }
             ).then((response)=> {console.log(response)})
             console.log(uservote,'afte')
             setTvote(tvote+1)
         }
         else{
             console.log('voted already')
         }

    }
       
     const giveVote  = () =>{
         
            const first=  Axios.post('http://localhost:3001/vote',
            { current_user: current_user,
              image_path: image_path,
            }
           ).then((response)=> {SetUserVote(response.data.length)}) 
           
           console.log(uservote) 
          
      
     }
      
    return (
        <div className='card'>

            <div className='card__container'>
            <img src={`images/${image_path}`} alt="" />
            <div className='card__details'>
                <p>{caption}</p>
                <h3>Posted by {user_name}    <span className='card__time'> -{postedTime}</span></h3>
                <h3>Total Votes: {tvote}</h3>
                {user&& 
                <div className='card__voteButton'>
                    <button onClick={giveVote}>
                        VOTE
                    </button>
                    {uservote>0 ? <h3>Already voted !</h3> : ''}
                </div>
                }
                
            </div>

            </div>
            
            
          
            {/* <button onClick={deleteEmployee}>Delete</button> */}
        </div>
    )
}

export default Card
