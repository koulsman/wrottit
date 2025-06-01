import { Autocomplete, rem } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import { FloatingIndicator } from '@mantine/core';
import { useState, useEffect } from 'react';
import Community from '../../backend/ServersAndSchemas/CommunitySchema';


export default function SearchCommunities({communities}) {
  // const [searchbarRef] = useRef()
  const [searchbarClicked,setSearchbarClicked] = useState(false)
  const [searchbarValue,setSearchbarValue] = useState('')
  
  const [communitiesShown,setCommunitiesShown] = useState('')
  function searchbarClickedHandler() {
        console.log("greia souy" )
        setSearchbarClicked(true)
  }

  function searchbarUnclickedHandler() {
    setSearchbarClicked(false)
  }

  function searchHandler(value) {
  setSearchbarValue(value)
}

useEffect(() => {
   
  console.log(searchbarValue)
  const filtered = communities.map((community) => community.name)
  .filter((communityName) => (
    communityName.toLowerCase().startsWith(searchbarValue.toLowerCase()) ))
      
   setCommunitiesShown(filtered);
  console.log(filtered)
 
    

},[searchbarValue,setCommunitiesShown])



  
  const icon = <IconComponents style={{ width: rem(6), height: rem(6) }} />;
  return (
    <>
    {/* <h1>{newArray}</h1> */}
      <section style={{display: "flex",flexDirection: "column"}} >
      {/* {searchbarClicked === true ?
      <div>
      <SearchbarIndicator/>
      </div> : <br/>} */}
      <Autocomplete onFocus={searchbarClickedHandler} value = {searchbarValue} onBlur={searchbarUnclickedHandler} onChange={searchHandler}
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        placeholder="Search..."
      />
      
      </section>
     
    </>
  );
}