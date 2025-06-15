import { Autocomplete, rem } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import {useState, useEffect, useRef} from "react"
import { Pill, Button } from '@mantine/core';
import search from '../images/search.svg'

export default function Searchbar()
 {
  

  const [searchbarValue,setSearchbarValue] = useState("");
  const [clicked,setClicked] = useState(false)
  
  const {communitiesPillRef} = useRef(null)
  const {postsPillRef} = useRef(null)
  const [communitiesPillSelected,setCommunitiesPillSelected] = useState(false)
  const [postsPillSelected,setPostsPillSelected] = useState(false)

  const searchbarRef = useRef()
  function autocompleteHandler() {
     setClicked(true)
  }
  function searchHandler() {
    // setSearchbarValue(value);
    console.log("search")
    // const filtered = communities.filter((community) =>
    //   community.name.toLowerCase().startsWith(value.toLowerCase())
    // );

    // setCommunitiesShown(filtered);
  }
   
  function handleCloseSearch(event) {
     if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
      setClicked(false);
    }
  }

  function handleSearchCommunities() {
    setCommunitiesPillSelected(!communitiesPillSelected)
    if (postsPillSelected === true) {
      setPostsPillSelected(false)
    }
  }

  function handleSearchPosts() {
    setPostsPillSelected(!postsPillSelected)
    if (communitiesPillSelected === true) {
      setCommunitiesPillSelected(false)
    }
  }

   useEffect(() => {
    document.addEventListener("mousedown", handleCloseSearch);
    return () => {
      document.removeEventListener("mousedown", handleCloseSearch);
    };
  }, []);

  useEffect(() => {

  },[communitiesPillSelected,postsPillSelected])

   const leftSection = communitiesPillSelected ? (
    <Pill ref={communitiesPillRef} style={{ background: 'green' }}>
      C/
    </Pill>
  ) : postsPillSelected ? (
    <Pill ref={postsPillRef} style={{ background: 'green' }}>
      P/
    </Pill>
  ) : null;

  return (
    <section ref={searchbarRef}>
      <div className="searchbarAndButton" style={{ display: "flex" }}>
        
      <Autocomplete onClick={() => autocompleteHandler()}
        
        value={searchbarValue}
        onChange={(searchbarValue) => setSearchbarValue(searchbarValue)}
        mt="md"
        // data={communities.map((c) => c.name)}
        rightSectionPointerEvents="none"
        leftSection = {leftSection}
        placeholder="Search..."
      />
      
        <Button style={{marginTop: "1.1em"}} onClick={searchHandler}>
          <img src={search} style={{width: "3em", height: "2em"}}/>
        </Button>
        </div>
       
        {clicked && <>
        <Pill ref={communitiesPillRef} onClick={handleSearchCommunities} style={communitiesPillSelected ? {background: "green" } : {background: "black"}}>only Communities</Pill>
        <Pill ref={postsPillRef} onClick={handleSearchPosts} style={postsPillSelected ? {background: "green"} : {background: "black"}}>only Posts</Pill></>}
        
    </section>
  );
}
