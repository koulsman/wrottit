import { useState, useRef, useEffect } from "react";
import { NativeSelect, Grid } from "@mantine/core";
import axios from "axios";
import { Navbar } from "./NavBar/Navbar";
import SearchCommunities from "./NavBar/NavbarCommunities/SearchCommunities";
import PostCard from "./PostPage/PostCard";
import CommunityPreview from "./LoggedInfo/CommunityPreview";
import config from "./config";
import { IconReload } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
export default function SearchedTermInSearchbar() {
  const [nativeSelectValue, setNativeSelectValue] = useState("All time");
  const [searchedWord, setSearchedWord] = useState("");
  const communitySearchRef = useRef(false);
  const postSearchRef = useRef(false);
  const [selectedPill, setSelectedPill] = useState("");
  const location = useLocation()
  const {pathname} = useLocation();
  const [results, setResults] = useState([]);
  //    const searchedWordRef = useRef("")
const searchUrl = pathname;
  async function searchInPosts(searchedWord) {
    try {
      const response = await axios.get(`${config.POSTS_API}/posts/searchedPosts/${searchedWord}`);
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function searchInCommunities(searchedWord) {
    try {
      const response = await axios.get(`${config.COMMUNITIES_API}/communities/searchedCommunities/${searchedWord}`);
      setResults(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, [results]);
  useEffect(() => {
    
    handleSearchedTerm()
  },[searchUrl])

  function handleSearchedTerm() {
    console.log(pathname + "PATHNAME")
    
    
   
    const temporarySearchedWord = pathname.trim().split("/").pop();
    setSearchedWord(temporarySearchedWord)
   
    // searchedWordRef.current = searchUrl.split("");
    if (searchUrl.includes("P:")) {
      console.log("searched in posts");
      postSearchRef.current = true;
      //Βάζω και το communitySearch σαν false για safety reasons
      communitySearchRef.current = false;
      setSelectedPill("Posts");
      console.log("postSearchRef == " + postSearchRef.current);
      searchInPosts(temporarySearchedWord);
    } else if (searchUrl.includes("C:")) {
      console.log("searchged in communities");
      communitySearchRef.current = true;
      //Βάζω και το ποστSearch σαν false για safety reasons
      postSearchRef.current = false;
      setSelectedPill("Communities");
      console.log("communitySearchRef == " + communitySearchRef.current);
      searchInCommunities(temporarySearchedWord);
    }
  }

  useEffect(() => {
    handleSearchedTerm();
  }, [window.location.href]);
  return (
    <>
     <Grid>
        <Grid.Col span={3} >
            <Navbar />
        </Grid.Col>
        <Grid.Col span={"auto"} >
      <NativeSelect
        value={nativeSelectValue}
        onChange={(event) => setNativeSelectValue(event.currentTarget.value)}
        data={["All time", "Past Year", "Past Month", "Today"]}
      />
      <h1>
        Searched:
        {searchedWord} in {selectedPill}
      </h1>
      <div>
        {/* {results && results.length >= 1 && results.map((element,index) => (
            <div key={index}>{element}</div>
        ))} */}
        {results && results.length >= 1
          ? selectedPill === "Posts"
            ? results.map((post, index) => (
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
              ))
            : results.map((community, index) => (
                <CommunityPreview
                  style={{ width: "5em!important" }}
                  // onClick={navigateToSelectedCommunityHandler(community._id)}
                  key={community._id}
                  communityId={community._id}
                  communityName={community.name}
                  communityDescription={community.description}
                  communityIconImage={community.iconImage}
                  communityBannerImage={community.bannerImage}
                />
              ))
          : "no posts"}
      </div>
      </Grid.Col>
      <Grid.Col span={3} >
           
        </Grid.Col>
      </Grid>
    </>
  );
}
