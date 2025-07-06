import React from "react";
import { useEffect, useState, useRef } from "react";
import MyLikes from "./LoggedInfo/MyLikes";
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
import { Navbar } from "./NavBar/Navbar";
import SearchBar from "./Header/Searchbar";
import CreatePost from "./Post Creation/CreatePost";
import { isLoggedInAtom, loggedUserAtom } from "./Header/isLoggedIn";
import { useAtom } from "jotai";
import "@mantine/tiptap/styles.css";
import PostCard from "./PostPage/PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router";
import PostPage from "./PostPage/SelectedPostPage";
import SearchDemo from "./SearchDemo";
import MyPosts from "./LoggedInfo/MyPosts";
import MyComments from "./LoggedInfo/MyComments";
import "@mantine/dates/styles.css";
import MyDatetimes from "./MyDatetimes";
import About from "./NavBar/About";
import ChangeUserImage from "./ChangeUserImage";
import Communities from "./NavBar/NavbarCommunities/Communities";
import CommunityCreator from "./LoggedInfo/CommunityCreator";
import GearSpinner from "../src/images/gear-spinner.svg";
import config from "./config";
import SelectedCommunity from "./NavBar/NavbarCommunities/SelectedCommunity";
import SearchedTermInSearchbar from "./SearchTermInSearchbar";
import speech from "./images/speech.svg";
import WrotRobot from "./images/wrot-logo-Photoroom.png-Photoroom.png";
import wrot from "./images/wrot-logo-Photoroom.png-Photoroom.png";

function App() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser] = useAtom(loggedUserAtom);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const dark = colorScheme === "dark";
  const [postsDirection, setPostsDirection] = useState("newest");
  const [isFetching, setIsFetching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loaderMessageAppeared = useRef("");
  const [, forceRender] = useState(0);

  const loaderMessage =
    "Hang tight, human! It's not my fault — Render is just being a bit slow today...Drink some water while waiting!";
  const loaderMessageArray = loaderMessage.split("");
  console.log("LOADER MESSAGE ARRAY" + loaderMessageArray);
  console.log("LOADER MESSAGE ARRAY" + loaderMessage);
  function RenderLoader() {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < loaderMessageArray.length) {
        loaderMessageAppeared.current += loaderMessageArray[index];
        forceRender((prev) => prev + 1);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 10); // ms delay per character
  }
  useEffect(() => {
    if (isFetching) {
      RenderLoader();
    }
  }, [isFetching]);
  function postsDirectionHandler(direction) {
    setPostsDirection(direction);

    if (direction === "newest") {
      setSortedPosts([...posts]); // Reset to original order
    } else if (direction === "mostLikes") {
      setSortedPosts([...posts].sort((a, b) => b.upvotes - a.upvotes));
    } else if (direction === "mostComments") {
      setSortedPosts(
        [...posts].sort((a, b) => b.comments.length - a.comments.length)
      );
    }
  }

  async function handlePosts() {
    setIsFetching(true);
    try {
      // https://wrottit-yovc.onrender.com/
      // const response = await axios.get(""https://wrottit-servers.onrender.com/communities"");
      const response = await axios.get(`${config.POSTS_API}/posts`);
      console.log("Posts fetched:", response.data);
      setPosts(response.data);
      setSortedPosts(response.data); // Keep a copy for sorting
      setIsFetching(false);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  }

  useEffect(() => {
    handlePosts();
  }, []);

  function handleResize() {
    {
      window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <Router>
      <div className="App">
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 9,
            background: "#282c34",
          }}
        >
          {/* <Routes>
            <Route
              path="/"
              element={ */}
          <div className="header-parent">
            <NavLink to="/">
              <img src={wrottit} className="App-logo" alt="logo" />
            </NavLink>

            {/* <SearchDemo /> */}
          </div>
          {/* } />
       
          </Routes> */}

          <Grid>
            <Grid.Col
              span="auto"
              style={{
                margin: "1em 0 1em 1em",
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
                  <Grid.Col span="auto">
                    <Navbar style={{ position: "sticky" }} />
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <CreatePost />
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Button style={{ marginTop: "1em" }}>Sort By</Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Sort By</Menu.Label>
                          <Menu.Item
                            onClick={() => postsDirectionHandler("mostLikes")}
                          >
                            Most likes
                          </Menu.Item>

                          <Menu.Item
                            onClick={() =>
                              postsDirectionHandler("mostComments")
                            }
                          >
                            Most Comments
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => postsDirectionHandler("newest")}
                          >
                            Newest
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                    {isFetching && (
                      <div>
                        {" "}
                        <img
                          src={GearSpinner}
                          style={{
                            height: "10em",
                            width: "10em",
                            margin: "auto",
                          }}
                        ></img>
                        <img src={wrot} />
                        <img
                          src={speech}
                          style={{
                            height: "10em",
                            width: "10em",
                            margin: "auto",
                          }}
                        />
                      </div>
                    )}
                    {/* <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={speech}
                        style={{
                          height: "14em",
                          width: "14em",
                          margin: "auto",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: "20%",
                          left: "18%",
                          color: "black",
                          textShadow:
                            "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                          padding: "0.5em 1em",
                          borderRadius: "8px",
                          fontSize: "12px",
                          width: "12em",
                          height: "5em",
                        }}
                      >
                        {loaderMessageAppeared.current}
                      </div>
                      <img
                        style={{
                          marginTop: "10em",
                          width: "10em",
                          height: "10em",
                        }}
                        src={wrot}
                      />
                    </div> */}

                    {postsDirection === "newest" && sortedPosts.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                        }}
                      >
                        {sortedPosts.map((post, index) => (
                          <PostCard
                            postid={post._id}
                            key={index}
                            communityName={post.communityName}
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
                    )}
                    {postsDirection === "mostLikes" &&
                      sortedPosts.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          {sortedPosts
                            .sort((a, b) => a.upvotes - b.upvotes)
                            .map((post, index) => (
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
                      )}

                    {postsDirection === "mostComments" &&
                      sortedPosts.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
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
                          {sortedPosts.map((post, index) =>
                            console.log(post.comments.length + ":" + index)
                          )}
                        </div>
                      )}
                  </Grid.Col>
                  <Grid.Col span="auto" />
                </Grid>
              }
            ></Route>
            <Route
              path="/SearchedTermInSearchbar/:searchIn/:searchedTerm"
              element={<SearchedTermInSearchbar />}
            />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/:id/myLikes" element={<MyLikes />} />
            <Route
              path="/:communityid/SelectedCommunity"
              element={<SelectedCommunity />}
            />
            <Route path="/:id/myPosts" element={<MyPosts />} />
            <Route path="/:id/myComments" element={<MyComments />} />
            <Route path="/:id/ChangeUserImage" element={<ChangeUserImage />} />
            <Route path="/myDatetimes" element={<MyDatetimes />} />
            <Route path="/About" element={<About />} />
            <Route path="/Communities" element={<Communities />} />
            <Route
              path="/:id/CommunityCreator"
              element={<CommunityCreator />}
            />
            {/* <Route path="/MetallicaCommunity" element={<MetallicaCommunity />} /> */}
            <Route path="/" element={<App />} />
            <Route path="/MainMenu" element={<App />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
