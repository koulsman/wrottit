import { useState, useEffect } from "react";
import  axios  from "axios";
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button , Tooltip, NavLink} from '@mantine/core';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import { useAtom } from "jotai";
import { isLoggedInAtom,loggedUserAtom } from "../Header/isLoggedIn";
import { ColorSwatch, Indicator, Divider} from '@mantine/core';
// import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import myDatetimes from "../MyDatetimes";


export default function LoggedInfo({name,uid, status}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoggedIn,setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [loggedUser,setLoggedUser] = useAtom(loggedUserAtom)
    const [userImage,setUserImage] = useState('')
    const [posts,setPosts] = useState([])
    const navigate = useNavigate()
    console.log(loggedUserAtom)
    

    // async function handleUserImage() {
    //   try {
    //       const res = await axios.get('http://localhost:3000/users/userImage')
    //       setUserImage(res)
    //       console.log(userImage)
    //   }
    //   catch(err) {
    //     console.log(err)
    //   }
    // }
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

  function changeUserImage() {
    navigate(`/${loggedUser?._id}/ChangeUserImage`)
  }

  function communityCreatorHandler() {
    navigate(`/${loggedUser?._id}/CommunityCreator`)
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
      // handleUserImage();
    }, []);
    function handleLogOut() {
       setIsLoggedIn(isLoggedIn => isLoggedIn = false);
       setLoggedUser(loggedUser => loggedUser = '')
    }

    return (
        <>
          <Drawer position="right" opened={opened}  onClose={close}  style={{zIndex: 10}}>
            {/* Drawer content */}
                {userImage}
                Name : {name}
                <br/>
                status:
                {isLoggedIn === true ? <div style={{display: "flex"}}>active 
                  
                <ColorSwatch color="#00FF00" style={{display: "flex", alignItems: "flex-end", width: "0.5em",marginRight: "1em"}}/> </div> : <div>status inactive</div>}
                
                <Divider my="md" />
                <NavLink label="My Likes" onClick={handleMyLikes}></NavLink>
                <NavLink label="My Posts" onClick={handleMyPosts}></NavLink>
                <NavLink label="My Comments" onClick={handleMyComments}></NavLink>
                {/* <NavLink label="my datetimes" onClick={handleMyDatetimes}></NavLink>
                <NavLink label="my datetimes" onClick={handleSavedPosts}></NavLink> */}
                <NavLink label="Change User Image" onClick={changeUserImage}></NavLink>
                <NavLink label="Community Creator" onClick={communityCreatorHandler}></NavLink>
                <Divider my="md" />
                <Button onClick={handleLogOut}>Logout</Button>
                
          </Drawer>
          <Tooltip label="Open Profile">
          {/* <Button onClick={open}>{name}</Button> */}
          <Indicator color="lime" onClick={opened? close : open}>
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


