// import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import { Grid,Button } from "@mantine/core";
// import  Navbar  from "../NavBar/Navbar";
import { Navbar } from "../Navbar";
import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
// import PostCard from "../PostPage/PostCard";
import PostCard from "../../PostPage/PostCard";
import axios from "axios";
// import { post } from "../../backend/ServersAndSchemas/PostServer";
import { useParams } from "react-router-dom";
import CommunityPreview from "../../LoggedInfo/CommunityPreview";
import CommunityInfo from "../../LoggedInfo/CommunityInfo";
import config from "../../config";

export default function SelectedCommunity() {
  // const [isLoggedIn] = useAtom(isLoggedInAtom);
  // const [loggedUser] = useAtom(loggedUserAtom);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [community, setCommunity] = useState(null);
  const { communityid } = useParams();
  

  useEffect(() => {
    console.log(communityid + "id");
  }, [communityid]);
  async function handleCommunity() {
    try {
      console.log("🔍 Fetching community from port 3003, id=", communityid);
      const response = await axios.get(
        `http://localhost:3003/communities/${communityid}`
      );
      console.log("✅ Response.data:", response.data);
      setCommunity(response.data);
    } catch (error) {
      console.error("🔥 Error getting community:", error);
    }
  }

  // και ρόφησε κι αυτό:
  useEffect(() => {
    console.log("🔁 community state changed:", community);
  }, [community]);
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
    handleCommunity();
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
          
          {community && (
            <CommunityInfo
              communityId={community._id}
              communityName={community.communityName}
              communityDescription={community.description}
              communityIconImage={community.iconImage}
              communityBannerImage={community.bannerImage}
              communityFlags={community.flags}
              communityRules={community.rules}
            />
          )}

          {communityPosts.length > 0 ? (
            communityPosts.map((post, index) => (
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
            ))
          ) : (
            <div>No Posts Yet In This Community</div>
          )}
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
        <Grid.Col span={"auto"} />
      </Grid>
    </div>
  );
}
