import Sad from './images/wrottit-sad-modified.png'
import { Grid } from '@mantine/core'
import "./NoComments.css"
export default function NoComments() {
    return (
        <>
        
          <div className="noComments">

          
            <div className = "sadImage">
            <img src={Sad} alt="logo"/>
            </div>
       
           
            <div className="noCommentsText">
            <h1>Be the first to comment</h1>
            
            <p>
            Nobody's responded to this post yet.
            Add your thoughts and get the conversation going.
            </p>
            </div>
            </div>
           
      
        </>
    )
}