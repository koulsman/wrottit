import Sad from '../images/wrottit-sad-modified.png'
import noComments from '../images/Asset 1.svg'
import { Grid } from '@mantine/core'
import "./NoComments.css"
export default function NoComments() {
    return (
        <>                             
          <div className="noComments">                                                     

          
            <div className = "sadImage">
            <img src={noComments} style={{width: "15em", height: "14em", margin: "1em 0 1em 0"}}alt="logo" />
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