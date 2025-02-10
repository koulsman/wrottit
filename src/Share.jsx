import './Likes.css';
import share from "./images/share.svg"
import { Popover, Text, Button } from '@mantine/core';


export default function Share() {
    function handleShare() {

    }
    return(
        <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
      <div className='postInteractionContainer' style={{}}>
            <img src={share} className="vectors"
                    onClick={handleShare} />
            {/* <div className="likesCounter">{comments}</div> */}
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        {/* <div>{FacebookIcon}{EmailIcon}{FacebookMessengerIcon}</div> */}
       share
       

      </Popover.Dropdown>
    </Popover>
        
    )
}
// }
// import {useState, useEffet} from 'react'

// export default function Share() {
//     return (
//         <div>
//             share
//         </div>
//     )
// }
// import React from "react";
// // import { FacebookMessengerShareButton } from "react-share";
// import { Button } from "@mantine/core";


// const Share = ({ url, title, postid }) => {
//     const copyURL  = `http://localhost:3000/post/${postid}`
//     // const redirectedURL = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=http://localhost:3000/post/&redirect_uri=${encodeURIComponent(url)}`
//     console.log(postid + "postID")
//   const handleShare = () => {
//     window.open(copyURL, '_blank');
//   };

//   return (
//     <Button onClick={handleShare} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
//       <button size={18} /> Share on Messenger
//     </Button>
//   );
// };

// export default Share;