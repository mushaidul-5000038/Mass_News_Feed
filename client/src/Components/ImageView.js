import { useEffect, useState } from "react"
import Axios from 'axios'
import Card from "./Card"

//for now
import '../Styles/ImageView.css'

const ImageView = ({currentUser}) => {
    const [images, setImages] = useState([])
   // const [ current_user,setCurrentUser] =useState('temp')
    
    useEffect(()=>{
        
        
        
       
        Axios.get('http://localhost:3001/content'
        ).then((response)=> {setImages(response.data)}) 
        

    },[])

    return (
        <div className='imageView'>

                    <h1>Mass News Feed</h1>
                    <hr />
                    <div className='imageView__container'>
                        {images?.map((e)=>(
                            <Card user_name={e.user_name} current_user={currentUser} 
                                image_path={e.image_path} caption={e.caption} 
                                total_votes={e.total_votes}  
                                postedTime={e.postedTime}
                            />
                        ))}
                    </div>

            
        </div>
    )
}

export default ImageView
