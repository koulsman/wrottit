import Chat from "../images/chat.svg"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Comments({commentsCounter}) {
    const [commentsCount, setCommentsCount] = useState(0);

    // Function to fetch comments count
   
   
    return (
        <div className='postInteractionContainer' style={{background: "purple", color: "white"}}>
            <img src={Chat} className="vectors" alt="Comments Icon" />
            <div className="likesCounter">{commentsCounter}</div>
        </div>
    );
}
