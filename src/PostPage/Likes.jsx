import { useState } from 'react';
import Like from "../images/like.svg";
import Dislike from "../images/dislike.svg";
import './Likes.css';
import { isLoggedInAtom, loggedUserAtom } from '../Header/isLoggedIn';
import { useAtom } from 'jotai';
import axios from 'axios'
import config from "../config";


export default function Likes({votes,postid}) {
    const [likes, setLikes] = useState(votes);
    const [hovered, setHovered] = useState({ like: false, dislike: false });
    const [loggedUser,setLoggedUser] = useAtom(loggedUserAtom);
    const [isLoggedIn,setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [postLiked,setPostLiked] = useState(false)
    const [postDisliked,setPostDisliked] = useState(false)
     
    
    async function handleUpvote() {
        console.log(loggedUser)
        console.log(postid)
        if (loggedUser  && postLiked===false) {
            if(likes <= votes) {
                setLikes((likes) => likes + 1);
                setPostLiked(true);
                setPostDisliked(false);
               //update likes
                try {
                    const response = await axios.post(`${config.POSTS_API}/${postid}/upvotes`, {
                        likes,
                    });
                    const newLikes = response.data;
                    console.log(newLikes);
                } catch (error) {
                    alert(`Error: ${error.response?.data?.message || error.message}`);
                }
                //update posts liked by user
                // try{
                //     const response = await axios.post(`http://localhost:3002/${postid}/upvotes`)
                // }
                // catch(error) {

                // }
                
            }
            
        }
        else if(loggedUser && postLiked === true) {
            setLikes((likes) => likes - 1);
            setPostLiked(false);

                 try {
                    const response = await axios.post(`${config.POSTS_API}/${postid}/upvotes`, {
                        likes,
                    });
                    const newLikes = response.data;
                    console.log(newLikes);
                } catch (error) {
                    alert(`Error: ${error.response?.data?.message || error.message}`);
                }
                
        
        }
        
    }

    async function handleDownvote() {
        if (loggedUser  ) {
        if (likes > 0 && likes >= votes && postDisliked===false) {
            setLikes((likes) => likes - 1);
            setPostLiked(false);
            setPostDisliked(true);
            try {
                const response = await axios.post(`http://localhost:3002/${postid}/upvotes`, {
                    likes,
                });
                const newLikes = response.data;
                console.log(newLikes);
            } catch (error) {
                alert(`Error: ${error.response?.data?.message || error.message}`);
            }
        }
    }
    }

    return (
        <div>
            <div className="postInteractionContainer" style={{background: "purple", color: "white"}}>
                <img
                    src={Like}
                    style={{
                        width: "2em",
                        height: "2em",
                        filter: hovered.like ? 'brightness(0) saturate(100%) invert(21%) sepia(93%) saturate(7452%) hue-rotate(0deg) brightness(93%) contrast(109%)' : 'none',
                        
                    }}
                    onClick={handleUpvote}
                    onMouseOver={() => setHovered({ ...hovered, like: true,dislike: false })}
                    onMouseOut={() => setHovered({ ...hovered, like: false,dislike: false })}
                />
                <div className="likesCounter" >{likes}</div>
                <img
                    src={Dislike}
                    style={{
                        width: "2em",
                        height: "2em",
                        filter: hovered.dislike ? 'brightness(0) saturate(100%) invert(21%) sepia(93%) saturate(7452%) hue-rotate(0deg) brightness(93%) contrast(109%)' : 'none' // Κόκκινο χρώμα
                    }}
                    onClick={handleDownvote}
                    onMouseOver={() => setHovered({ ...hovered, like: false, dislike: true })}
                    onMouseOut={() => setHovered({ ...hovered, like: false, dislike: false })}
                />
            </div>
        </div>
    );
}
