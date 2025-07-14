import axios from "axios"
import { useState, useEffect } from 'react'
import config from "../config"
import SavedPostSVG from '../images/saved.svg'
import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn"
import { useAtom } from 'jotai'
import { ThemeIcon } from '@mantine/core'; 

export default function SavePost({ postid }) {
  const [isPostAlreadySaved, setIsPostAlreadySaved] = useState(false)
  const [isLoggedIn] = useAtom(isLoggedInAtom)
  const [loggedUser] = useAtom(loggedUserAtom)

  useEffect(() => {
    async function checkSaved() {
      try {
        const response = await axios.get(`${config.USERS_API}/users/${loggedUser._id}/saved`)
        const savedArray = response.data || []

        const isSaved = savedArray.some(post => post.id === postid)
        setIsPostAlreadySaved(isSaved)
      } catch (error) {
        console.error("Error fetching saved posts", error)
      }
    }

    if (loggedUser?._id) {
      checkSaved()
    }
  }, [loggedUser, postid])

  async function savePostHandler() {
    if (!isLoggedIn || !loggedUser) return

    try {
      await axios.post(`${config.USERS_API}/users/${loggedUser._id}/saved`, { id: postid })
      setIsPostAlreadySaved(true)
    } catch (error) {
      console.error("Error saving post", error)
    }
  }

  async function deleteSavedPostHandler() {
    try {
      await axios.delete(`${config.USERS_API}/users/${loggedUser._id}/saved/${postid}`)
      setIsPostAlreadySaved(false)
    } catch (error) {
      console.error("Error deleting saved post", error)
    }
  }

  return (
    <div style={{
     
      
    }}>
    
      {isLoggedIn && loggedUser?._id ? (
          <ThemeIcon style={{background: isPostAlreadySaved ? "purple" : "gray"}} >
        <img
          onClick={isPostAlreadySaved ? deleteSavedPostHandler : savePostHandler}
          src={SavedPostSVG}
          alt="Save Icon"
          style={{
            width: "1.5em",
            height: "1.5em",
            cursor: "pointer",
          }}
        />
        </ThemeIcon>
      ) : (
        <img
          onClick={savePostHandler}
          src={SavedPostSVG}
          alt="Save Icon"
          style={{
            width: "1.5em",
            height: "1.5em",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  )
}
