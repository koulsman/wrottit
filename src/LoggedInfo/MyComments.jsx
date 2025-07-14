import { useState, useEffect, useRef } from "react";
import PostCard from "../PostPage/PostCard";
import { Navbar } from "../NavBar/Navbar";
import { Grid } from "@mantine/core";
import axios from "axios";
import GearSpinner from "../images/gear-spinner.svg";
import config from "../config";
import { loggedUserAtom } from "../Header/isLoggedIn";
import { atom, useAtom } from "jotai";

export default function MyComments() {
  const [commentsPosted, setCommentsPosted] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [commentedPosts,setCommentedPosts] = useState([])
  const [loggedUser] = useAtom(loggedUserAtom);
  const uid = loggedUser._id;
  console.log("loggedUserid:", uid);
  console.log("loggedUser:", loggedUser);
  useEffect(() => {
    async function fetchCommentedPostsId() {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `${config.USERS_API}/users/${uid}/commented`
        );
        console.log("commented : " + response.data);

        const postsIds = response.data.map((element) => element.id);
        console.log("Posts Ids:", postsIds);
       
         
        setCommentsPosted(postsIds);
        
      
        
       
          //   postsIds.map((element,index) => {
          //       axios.get(`${config.POSTS_API}/posts/${element}`);
                
          //   })

          //  const fetchedPosts =await  Promise.all(postsIds);
          //  setCommentedPosts(fetchedPosts)     

        
            
      
      
      } catch (error) {
        console.log("Failed to fetch MyComments" + error);
      } finally {
        setIsFetching(false);
      }
      
    }

    fetchCommentedPostsId();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Col span="3">
          <Navbar />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          {isFetching && (
            <img
              src={GearSpinner}
              style={{ height: "10em", width: "10em", margin: "auto" }}
            ></img>
          )}
          aaaaa
          {commentedPosts.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </Grid.Col>
        <Grid.Col span="3"></Grid.Col>
      </Grid>
    </>
  );
}
