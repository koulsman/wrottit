import { useState, useEffect } from "react";
import  axios  from "axios";
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button , Tooltip, NavLink} from '@mantine/core';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import { useAtom } from "jotai";
import { isLoggedInAtom,loggedUserAtom } from "./isLoggedIn";
import { ColorSwatch, Indicator, Divider} from '@mantine/core';
// import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import myDatetimes from "./MyDatetimes";


export default function LoggedInfo({name,uid, status}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoggedIn,setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [loggedUser,setLoggedUser] = useAtom(loggedUserAtom)
    const [posts,setPosts] = useState([])
    const navigate = useNavigate()
    console.log(loggedUserAtom)
    
    function handleMyDatetimes() {
      navigate('/MyDatetimes')
    }
    function handleMyLikes() {
        // Navigate()
        console.log(loggedUser)
        console.log(loggedUser?._id)
        navigate(`/${loggedUser?._id}/MyLikes`)
    }

    function handleMyPosts() {
          navigate(`/${loggedUser?._id}/MyPosts`)
    }
    function handleMyComments() {
        navigate(`/${loggedUser?._id}/MyComments`)
    }

    function handleSavedPosts() {
      navigate(`/${loggedUser?._id}/SavedPosts`)
  }
  
    async function handlePosts() {
      console.log("!!!!!!!!!!!!!!UID:", uid);
      try {
        const response = await axios.get(`http://localhost:3002/posts/${uid}`);
        console.log("Posts fetched:", response.data); // Debugging για τα δεδομένα
        setPosts(response.data);
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    }
  
    useEffect(() => {
      handlePosts();
    }, []);
    function handleLogOut() {
       setIsLoggedIn(isLoggedIn => isLoggedIn = false);
    }

    return (
        <>
          <Drawer position="right" opened={opened}  onClose={close} >
            {/* Drawer content */}
          
                Name : {name}
                <br/>
                status:
                {isLoggedIn === true ? <div style={{display: "flex"}}>active 
                  
                <ColorSwatch color="#00FF00" style={{display: "flex", alignItems: "flex-end", width: "0.5em",marginRight: "1em"}}/> </div> : <div>status inactive</div>}
                
                <Divider my="md" />
                <NavLink label="my likes" onClick={handleMyLikes}></NavLink>
                <NavLink label="my posts" onClick={handleMyPosts}></NavLink>
                <NavLink label="my comments" onClick={handleMyComments}></NavLink>
                <NavLink label="my datetimes" onClick={handleMyDatetimes}></NavLink>
                <NavLink label="my datetimes" onClick={handleSavedPosts}></NavLink>
                <Divider my="md" />
                <Button onClick={handleLogOut}>Logout</Button>
                
          </Drawer>
          <Tooltip label="Open Profile">
          {/* <Button onClick={open}>{name}</Button> */}
          <Indicator color="lime" onClick={open}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
      />
    </Indicator>
          </Tooltip>
        </>
      );
    
}


