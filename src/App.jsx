import React from "react";
import { useEffect, useState } from "react";
import MyLikes from "./MyLikes";
import "./App.css";
import {
  Divider,
  Grid,
  useMantineColorScheme,
  Menu,
  Button,
} from "@mantine/core";
import lightSwitchOff from "./images/light-switch-off-svgrepo-com.svg";
import lightSwitchOn from "./images/light-switch-on-svgrepo-com.svg";
import Wrot from "./Header/Wrot";
import wrottit from "./images/wrottit-logo.PNG";
import { Login } from "./Header/Login";
import { Navbar } from "./Navbar";
import SearchBar from "./Header/Searchbar";
import CreatePost from "./CreatePost";
import { isLoggedInAtom, loggedUserAtom } from "./Header/isLoggedIn";
import { useAtom } from "jotai";
import "@mantine/tiptap/styles.css";
import PostCard from "./PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router";
import PostPage from "./SelectedPostPage";
import SearchDemo from "./SearchDemo";
import MyPosts from "./MyPosts";
import MyComments from "./MyComments";
import '@mantine/dates/styles.css';
import MyDatetimes from "./MyDatetimes";
import About from "./Header/About";
import ChangeUserImage from "./ChangeUserImage";
import {CommunityCreator} from "./CommunityCreator";
import GearSpinner from "../src/images/gear-spinner.svg"

function App() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser] = useAtom(loggedUserAtom);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [posts, setPosts] = useState([]);
const [sortedPosts, setSortedPosts] = useState([]);
  const dark = colorScheme === "dark";
  const [postsDirection,setPostsDirection] = useState("newest");
  const [isFetching,setIsFetching] = useState(false);
  const [isMobile,setIsMobile] = useState(false)

  function postsDirectionHandler(direction) {
    setPostsDirection(direction);
  
    if (direction === "newest") {
      setSortedPosts([...posts]); // Reset to original order
    } else if (direction === "mostLikes") {
      setSortedPosts([...posts].sort((a, b) => b.upvotes - a.upvotes));
    } else if (direction === "mostComments") {
      setSortedPosts([...posts].sort((a, b) => b.comments.length - a.comments.length));
    }
  }

  async function handlePosts() {
    setIsFetching(true)
    try {
      const response = await axios.get("http://localhost:3002/posts");
      console.log("Posts fetched:", response.data);
      setPosts(response.data);
      setSortedPosts(response.data); // Keep a copy for sorting
      setIsFetching(false)
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  }

  useEffect(() => {
    handlePosts();
  }, []);
  
   function handleResize() {
    {window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false)}
   }

   useEffect(() => {
    window.addEventListener("resize", handleResize)
   })
  return (
    <Router>
      <div className="App">
        <header style={{    position: "sticky",
    top: 0,
    zIndex: 9,
    background: "#282c34"}}>
          {/* <Routes>
            <Route
              path="/"
              element={ */}
          <div className="header-parent">
            <NavLink to="/">
              <img src={wrottit} className="App-logo" alt="logo" />
            </NavLink>
            <Wrot />
            {/* <SearchDemo /> */}
          </div>
          {/* } />
       
          </Routes> */}

          <Grid >
            <Grid.Col
              span="auto"
              style={{
                margin: "1em",
                display: "flex",
                width: "2em",
                height: "4em",
                alignItems: "center",
                justifyContent: "flex-start",
                
              }}
            >
              <button
                onClick={toggleColorScheme}
                title="Toggle color scheme"
                style={{
                  width: "3em",
                  height: "3em",
                  display: "flex",
                  
                  alignItems: "center",
                  justifyContent: "center",
                  border: dark ? "0.1em solid white" : "0.1em solid black",
                  borderRadius: "0.5em",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {dark ? (
                  <img
                    src={lightSwitchOff}
                    alt="Light Switch Off"
                    style={{ width: "3em" }}
                  />
                ) : (
                  <img
                    src={lightSwitchOn}
                    alt="Light Switch On"
                    style={{ width: "3em" }}
                  />
                )}
              </button>
            </Grid.Col>
            <Grid.Col span={6} className="searchBar">
              <SearchBar />
            </Grid.Col>
            <Grid.Col span="auto" className="login">
              <Login />
            </Grid.Col>
          </Grid>

          <Divider my="sm" />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Grid>
                  <Grid.Col span= "auto" >
                    <Navbar style={{position: "sticky"}} />
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <CreatePost />
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <Button style= {{marginTop: "1em"}}>Sort By</Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>Sort By</Menu.Label>
                        <Menu.Item onClick={() => postsDirectionHandler("mostLikes")}>
                          Most likes
                        </Menu.Item>

                        <Menu.Item
                          onClick={() => postsDirectionHandler("mostComments")}
                        >
                          Most Comments
                        </Menu.Item>
                        <Menu.Item onClick={() => postsDirectionHandler("newest")}>
                          Newest
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                    </div>
                    {isFetching  &&  <img src={GearSpinner} style={{height: "10em", width: "10em", margin: "auto"}}></img>}
                    {postsDirection === "newest" &&
  sortedPosts.length > 0 && 
  <div style={{ display: "flex", flexDirection: "column-reverse" }}>
    {sortedPosts.map((post, index) => (
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
    ))}
  </div>
}
                    {postsDirection === "mostLikes" &&
                      sortedPosts.length > 0 && 
                      <div style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                      }}>
                         
                      {sortedPosts
                      .sort((a, b) => (a.upvotes - b.upvotes))
                      .map((post,index) => (
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
                      ))}
                      </div>
                    }

                    {postsDirection === 'mostComments' && sortedPosts.length > 0 && 
                       <div style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                      }}>
                        {/* {posts.sort((a,b) => (a.comments.length - b.comments.length)).map((index, post) => 
                        <PostCard
                        postid={post._id}
                        key={index}
                        community={post.community}
                        username={post.uname}
                        userid={post.uid}
                        title={post.title}
                        content={post.content}
                        images={post.images}
                        commentsNumber={post.commentsNumber}
                        comments={post.comments}
                        upvotes={post.upvotes}
                      />
                        )}
                         */}
                         {sortedPosts.map((post,index) => console.log((post.comments.length) + ':' + index))}
                     
                        
                      

                      </div>
                      
                    }

                    
                  </Grid.Col>
                  <Grid.Col span="auto" />
                </Grid>
              }
            ></Route>
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/:id/myLikes" element={<MyLikes />} />
            <Route path="/:id/myPosts" element={<MyPosts />} />
            <Route path="/:id/myComments" element={<MyComments />} />
            <Route path="/:id/ChangeUserImage" element={<ChangeUserImage />} />
            <Route path="/myDatetimes" element={<MyDatetimes />} />
            <Route path="/About" element={<About />} />
            <Route path="/:id/CommunityCreator" element={<CommunityCreator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
