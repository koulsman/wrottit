import { useEffect, useRef, useState } from "react";
import { loggedUser, loggedUserAtom } from "../Header/isLoggedIn";
import config from "../config";
import { Navbar } from "../NavBar/Navbar";
import { Grid } from "@mantine/core";
import { atom, useAtom } from "jotai";
import axios from "axios";
import PostCard from "../PostPage/PostCard";

export default function MySavedPosts() {
  const [loggedUser] = useAtom(loggedUserAtom);
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    console.log(loggedUser?._id);
    async function fetchMySavedPosts() {
      try {
        const response = await axios.get(
          `${config.USERS_API}/users/${loggedUser._id}/saved`
        );
        const savedIds = response.data.saved;
        console.log(savedIds);
        setSavedPosts(savedIds);

        const postsData = await Promise.all(
          savedIds.map(async (element) => {
            const savedPost = Object.values(element).toString(); // You may want to access the correct key directly
            const res = await axios.get(
              `${config.POSTS_API}/posts/${savedPost}`
            );
            return res.data;
          })
        );
        setSavedPosts(postsData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchMySavedPosts();
  }, []);
  return (
    <>
      <Grid>
        <Grid.Col span={"3"}>
          <Navbar />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          {savedPosts.map((element, index) => (
  <PostCard key={index} postid={element.postid}
  communityName = {element.communityName}
  communityId = {element.communityId}
  title = {element.title}
  username = {element.uname}
  content = {element.content}
  images = {element.images}
  upvotes = {element.upvotes}
  comments = {element.comments}
  savedBy={element.savedBy}
//   savedBy
  />
))}
        </Grid.Col>
        <Grid.Col span={"3"}>
          
        </Grid.Col>
      </Grid>
    </>
  );
}
