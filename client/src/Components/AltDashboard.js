import '../Styles/AltDashboard.css'
import ImageView from './ImageView'

const AltDashboard = () => {
    return (
        <div className='altdash'>
        <div className='altdash__Container'>
            <div className='altdash__heading'>
            <span className='altdash__span1'>Welcome to </span>
            <span className='altdash__span2'>MASS News Feed</span>
            <hr />
            </div>
            
            <p className='altdash__paragh'>Sign up to share your updates with this wonderful community !</p>
            
        </div>

        <img className='altdash__arrow' 
            src="https://icons-for-free.com/iconfiles/png/512/down+arrow+download+icon-1320185738770602413.png" 
            alt="downArrow" 
        />

        <div className='altdash__imageView'>

            <ImageView/>

        </div>
        
         
        </div>
    )
}

export default AltDashboard
