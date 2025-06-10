// import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import { Grid } from "@mantine/core";
// import  Navbar  from "../NavBar/Navbar";
import { Navbar } from "../Navbar";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
// import PostCard from "../PostPage/PostCard";
import PostCard from "../../PostPage/PostCard";
import axios from "axios";
// import { post } from "../../backend/ServersAndSchemas/PostServer";
import { useParams } from "react-router-dom";

export default function SelectedCommunity() {
  // const [isLoggedIn] = useAtom(isLoggedInAtom);
  // const [loggedUser] = useAtom(loggedUserAtom);
  const [communityPosts, setCommunityPosts] = useState([]);

  const { communityid } = useParams();

  useEffect(() => {
    console.log(communityid + "id");
  }, [communityid]);
  //εδω θα φερω τα info για το community
  // async function handleCommunity() {
  //   console.log(loggedUser);
  //   console.log(window.location.href);
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3002/communities/${community?._id}`
  //     );
  //     console.log("Posts fetched:", response.data); // Debugging για τα δεδομένα
  //     setCommunity(response.data);
  //   } catch (error) {
  //     console.error("Error getting posts:", error);
  //   }
  // }
  // εδω θα φερω ΄ολα τα post που ΄εχουν για community id το idd του community
  async function handlePosts() {
    try {
      const response = await axios.get(
        `http://localhost:3002/posts/communityPosts/${communityid}`
      );
      console.log(response.data);
      setCommunityPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // handleCommunity();
    handlePosts();
  }, [communityid]);

  //episgw prepei na ferw ta rules
  return (
    <div>
      <Grid>
        <Grid.Col span="4">
          <Navbar />
        </Grid.Col>
        <Grid.Col span={window.innerWidth < 720 ? "7" : "auto"}>
          {communityPosts.map((post, index) => (
            <PostCard
              key={post._id}
              postid={post._id}
              communityName={post.communityName}
              communityId={post.communityId}
              title={post.title}
              username={post.uname}
              userid={post.uid}
              content={post.content}
              images={post.images}
              upvotes={post.upvotes}
              comments={post.comments}
            />
          ))}
          {/* {posts.map((post, index) => (
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
      ))} */}
        </Grid.Col>
      </Grid>
    </div>
  );
}
