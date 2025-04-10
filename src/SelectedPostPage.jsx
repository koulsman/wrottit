import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";
import {
  TextInput,
  Button,
  Grid,
  Card,
  Image,
  Text,
  Badge,
  Group,
  rem,
  Menu,
  Tooltip,
  Divider,
} from "@mantine/core";

import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "./Header/isLoggedIn";
import { Navbar } from "./Navbar";
import NoComments from "./NoComments";
import GearSpinner from "../src/images/gear-spinner.svg"

function SelectedPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loggedUser] = useAtom(loggedUserAtom);
  const [returnedComments, setReturnedComments] = useState([]);
  const [commentsDirection, setCommentsDirection] = useState("column");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [commentsNumber,setCommentsNumber] = useState(0);
  const [isFetching,setIsFetching] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      setIsFetching(true)
      try {
        const response = await axios.get(`http://localhost:3002/posts/${id}`);
        setPost(response.data);
        console.log(response.data)
        setReturnedComments(response.data.comments || []); // Set comments array or empty array if undefined
        console.log(JSON.stringify(response.data.comments) + "comments")
        setIsFetching(false)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      console.log(id + "id of post")
    console.log(post)
    }

    fetchPost();
  }, [id]);
  // function returnedCommentsHandler(rt) {
  //  console.log(rt)
  // }
  async function submitComment() {
    const uname = loggedUser.name;
    console.log(uname)
    const uid = loggedUser._id;
    console.log(comment)
    console.log(id + "id of post")
    console.log(post)
    try {
      const response = await axios.post(
        `http://localhost:3002/posts/${id}/comments`,
        { uid, uname, comment } // ✅ Send as an object
      );
      
      // Update local comments state with the new data
      setReturnedComments((prevComments) => [
        ...prevComments,
        response.data.newComment,
      ]);
      // setComment(""); // Clear input field


    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    try {
      const response = await axios.post(`http://localhost:3001/users/${uid}/commented`, {id})
      console.log(response + "done")
    }
    catch(error) {
      console.log(error)
    }
    window.location.reload();
  }

  return (
    <div>
      <Grid>
        <Grid.Col span= "auto" >
                            <Navbar style={{position: "sticky"}} />
                          </Grid.Col>
        <Grid.Col span="auto">
          {post ? (
            <PostCard
              postid={post._id}
              community={post.community}
              username={post.uname}
              userid={post.uid}
              title={post.title}
              content={post.content}
              images={post.images}
              comments={post.comments}
              upvotes={post.upvotes}
            />
          ) : (
            <p>Loading post...</p>
          )}
          <Divider my="md" />
      
          
            <Grid.Col span={9}>
              <TextInput
                radius="xl"
                placeholder="Add a comment"
                value={comment}
                onChange={(event) => setComment(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              {isLoggedIn ? (
                <Button onClick={submitComment}>Post comment</Button>
              ) : (
                <Tooltip label="Login to post comments!">
                  <Button disabled>Post comment</Button>
                </Tooltip>
              )}

              
            </Grid.Col>
         
          
            <Grid.Col span="auto">
            {returnedComments.length > 0 &&
            <Menu shadow="md" width={200}>
           
                <Menu.Target>
                  <Button>Sort By</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Sort By</Menu.Label>
                  <Menu.Item onClick={() => setCommentsDirection("column")}>
                    Oldest
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => setCommentsDirection("column-reverse")}
                  >
                    Newest
                  </Menu.Item>
                  
                </Menu.Dropdown>
              </Menu>
            }
            </Grid.Col>
          

          <div style={{ display: "flex", flexDirection: commentsDirection }}>
            {isFetching  &&  <img src={GearSpinner} style={{height: "10em", width: "10em", margin: "auto"}}></img>}
           {returnedComments.length > 0 ? 
           returnedComments.map(
            (returnedComment, index) =>
              returnedComment && (
                //  <Card shadow="sm" padding="lg" radius="md" withBorder key={index} style={{flexDirection: 'column'}}>
                //     {returnedComment.comment} (User: {returnedComment.uname})
                //   </Card>

                <CommentCard
                  username={returnedComment.uname}
                  comment={returnedComment?.comment}
                  date={returnedComment?.date}
                  style={{ flexDirection: "column" }}
                />
              )
          )
           :<NoComments /> }
             {/* <button onClick={(returnedComments) => returnedCommentsHandler(returnedComments)}>return</button> */}
          </div>
        </Grid.Col>
        <Grid.Col span="auto" />
      </Grid>
    </div>
  );
}

export default SelectedPostPage;
