import '../Styles/Dashboard.css'
import { useEffect, useState } from 'react';
import Card  from './Card';
import Axios from 'axios'
import axios from 'axios';
import {useDataLayerValue} from '../DataLayer'
import moment from 'moment';
import ImageView from './ImageView'



async function postImage({image,name,caption,postedTime}) {
    const formData = new FormData();
    
    formData.append("image", image)
    formData.append("name", name)
    formData.append("caption",caption)
    formData.append("postedTime",postedTime)  
  
    const result = await axios.post('http://localhost:3001/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    
    return result.data
  }

const Dashboard = () => {
  const [{user}]=useDataLayerValue()

  const [name,setName]= useState('')
  const [file, setFile] = useState()
  const [caption,setCaption]=useState('No captions added')
  const [imageAdded,setImageAdded]=useState(false)
 

 

//For images start-------------------------------------------
        const submit = async event => { 
            event.preventDefault()
            
            const timenow=Date.now()
            const postedTime=moment(timenow).calendar().toLocaleString()
            if(file.name.endsWith('.jpg') || file.name.endsWith('.png')|| file.name.endsWith('.jpeg')){
                if(user){
              
                    const result = await postImage({image: file,name,caption,postedTime})
                    setImageAdded(true)
                    }

            }
            else{
                alert('File type not supported')
            }
            
            
            
        }
        
        const fileSelected = event => {
            const file =event.target.files[0]
            setFile(file)
        }
       
      

        useEffect(()=>{
             console.log('dashb   dsadfzcxzcaqq')
             if(user.user){
              setName(user?.user[0].user_name)
              
             }

        },[imageAdded])

     
       
        
        
//For images end-----------------------------------------------
    return (
        <div className='dashboard'>
                {user&&
                    <div className='dashboard'>
                        <h1 className='dashboard__userName'>Welcome, {name}...</h1>
                        
                        <div className='dashboard__addPost'>
                            <form className='dashboard__form'>
                                <h2>Share your life updates</h2>
                                <div className='dashboard__inputs'>
                                    <input type="text" onChange={(e)=>(setCaption(e.target.value))} placeholder='Caption....' className='dashboard__caption'/>
                                    <input className='dashboard__imgInput' onChange={fileSelected} type="file" accept='image/*' name="avatar"/>
                                </div>
                                <button onClick={submit}>ADD</button>
                            </form>

                        </div>
                        
                        
                    
                        <ImageView currentUser={name}/>

                        
                                
                    
        
        
                    </div> 
                }
                  
            
        </div>
    )
}

export default Dashboard
