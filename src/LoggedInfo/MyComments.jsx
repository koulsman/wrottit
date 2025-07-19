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

      // Step 1: Get all comment info
      const response = await axios.get(
        `${config.USERS_API}/users/${uid}/commented`
      );

      const postsIds = response.data.map((element) => element.id);
      setCommentsPosted(postsIds);

      // Step 2: Fetch post data for each ID
      const fetchedPosts = await Promise.all(
        postsIds.map((id) =>
          axios.get(`${config.POSTS_API}/posts/${id}`).then((res) => res.data)
        )
      );

      setCommentedPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch MyComments", error);
    } finally {
      setIsFetching(false);
    }
  }

  if (uid) {
    fetchCommentedPostsId();
  }
}, [uid]);

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
          {commentedPosts.map((post, index) => (
  <PostCard
    key={index}
    postid={post._id}
    communityName={post.communityName}
    username={post.uname}
    userid={post.uid}
    title={post.title}
    content={post.content}
    images={post.images}
    comments={post.comments}
    upvotes={post.upvotes}
    savedBy={post.savedBy}
  />
))}
        </Grid.Col>
        <Grid.Col span="3"></Grid.Col>
      </Grid>
    </>
  );
}
