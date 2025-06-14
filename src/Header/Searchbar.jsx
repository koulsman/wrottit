import { Autocomplete, rem } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import {useState, useEffect, useRef} from "react"
import { Pill, Button } from '@mantine/core';
import search from '../images/search.svg'

export default function Searchbar()
 {
  const pillRef = useRef()

  const [searchbarValue,setSearchbarValue] = useState("");
  const [clicked,setClicked] = useState(false)
  
  const {communityPillRef} = useRef({})
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
   useEffect(() => {
    document.addEventListener("mousedown", handleCloseSearch);
    return () => {
      document.removeEventListener("mousedown", handleCloseSearch);
    };
  }, []);

  return (
    <section >
      <div className="searchbarAndButton" style={{ display: "flex" }}>
        
      <Autocomplete onClick={() => autocompleteHandler()}
        ref={searchbarRef}
        value={searchbarValue}
        onChange={(searchbarValue) => setSearchbarValue(searchbarValue)}
        mt="md"
        // data={communities.map((c) => c.name)}
        rightSectionPointerEvents="none"
      
        placeholder="Search..."
      />
      
        <Button style={{marginTop: "1.1em"}} onClick={searchHandler}>
          <img src={search} style={{width: "3em", height: "2em"}}/>
        </Button>
        </div>
       
        {clicked && <>
        <Pill ref={pillRef}>communities</Pill>
        <Pill>posts</Pill></>}
        
    </section>
  );
}
