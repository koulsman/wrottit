import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import { Grid } from "@mantine/core";
import { Navbar } from "../NavBar/Navbar";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import PostCard from "../PostPage/PostCard";
import axios from "axios";
import config from "../config";

export default function MyPosts() {
      const [isLoggedIn] = useAtom(isLoggedInAtom);
      const [loggedUser] = useAtom(loggedUserAtom);
      const [posts, setPosts] = useState([]);


      async function handlePosts() {
        console.log(loggedUser)
        try {
          const response = await axios.get(`${config.POSTS_API}/posts/postsby/${loggedUser?._id}`);
          console.log("Posts fetched:", response.data); // Debugging για τα δεδομένα
          setPosts(response.data);
        } catch (error) {
          console.error("Error getting posts:", error);
        }
      }
    
      useEffect(() => {
        handlePosts();
      }, []);
  return (
    <div>
    <Grid>
      <Grid.Col span="auto">
                <Navbar style={{position: "sticky"}} />
              </Grid.Col>
       <Grid.Col span="auto">
       {posts.map((post, index) => (
        // {posts.filter().map((post, index) => (
        <PostCard
          postid={post._id}
          key={index}
          community={post.community}
          username={post.uname}
          userid={post.uid}
          title={post.title}
          content={post.content}
          images={post.images}
          comments={post.comments}
          upvotes={post.upvotes}
        />
        // </div>
      ))}
        </Grid.Col>       
      
    </Grid>
    </div>
  );
}
