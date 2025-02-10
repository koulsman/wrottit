import { Autocomplete, rem } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import { FloatingIndicator } from '@mantine/core';
import { useState, useEffect } from 'react';


export default function SearchBar() {
  // const [searchbarRef] = useRef()
  const [searchbarClicked,setSearchbarClicked] = useState(false)
  
  function searchbarClickedHandler() {
        console.log("greia souy" )
        setSearchbarClicked(true)
  }

  function searchbarUnclickedHandler() {
    setSearchbarClicked(false)
  }

useEffect(() => {
  
},[searchbarClicked,searchbarClickedHandler,searchbarUnclickedHandler])

  
  const icon = <IconComponents style={{ width: rem(6), height: rem(6) }} />;
  return (
    <>
      <section style={{display: "flex",flexDirection: "column",padding: "2em"}} >
      {/* {searchbarClicked === true ?
      <div>
      <SearchbarIndicator/>
      </div> : <br/>} */}
      <Autocomplete onFocus={searchbarClickedHandler} onBlur={searchbarUnclickedHandler}
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