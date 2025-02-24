import { isLoggedInAtom, loggedUserAtom } from "./isLoggedIn";
import { Grid } from "@mantine/core";
import { Navbar } from "./Navbar";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
export default function MyLikes() {
      const [isLoggedIn] = useAtom(isLoggedInAtom);
      const [loggedUser] = useAtom(loggedUserAtom);
      const [posts, setPosts] = useState([]);


      async function handlePosts() {
        console.log(loggedUser)
        try {
          const response = await axios.get(`http://localhost:3002/posts/postsby/${loggedUser?._id}`);
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
      <Grid.Col span="4">
                <Navbar />
              </Grid.Col>
       <Grid.Col span="4">
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
