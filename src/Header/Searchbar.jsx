import { Autocomplete, Pill, Button } from '@mantine/core';
import { useState, useEffect, useRef, useMemo } from 'react';
import search from '../images/search.svg';
import {useNavigate} from 'react-router-dom';

export default function Searchbar() {
  const [searchbarValue, setSearchbarValue] = useState('');
  const [clicked, setClicked] = useState(false);
  const [communitiesPillSelected, setCommunitiesPillSelected] = useState(false);
  const [postsPillSelected, setPostsPillSelected] = useState(false);

  const searchbarRef = useRef(null);
  const communitiesPillRef = useRef(null);
  const postsPillRef = useRef(null);

  const navigate = useNavigate();


  const pillLabel = useMemo(() => {
    if (communitiesPillSelected) return 'C:';
    if (postsPillSelected) return 'P:';
    return 'A:';
  }, [communitiesPillSelected, postsPillSelected]);

  const leftSection = useMemo(
    () => (
      <Pill
        key={pillLabel}
        style={{ background: 'purple' }}
      >
        {pillLabel}
      </Pill>
    ),
    [pillLabel]
  );

  
  const autocompleteHandler = () => setClicked(true);

  const searchHandler = () => {
    console.log('search');
    console.log('searchbarValue:', searchbarValue);
    console.log('Search in:', pillLabel);
    navigate(`/SearchedTermInSearchbar/${pillLabel}/${searchbarValue}`)
  };

  const handleCloseSearch = (event) => {
    if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
      setClicked(false);
    }
  };

  const handleSearchCommunities = () => {
    setCommunitiesPillSelected((prev) => !prev);
    setPostsPillSelected(false);
  };

  const handleSearchPosts = () => {
    setPostsPillSelected((prev) => !prev);
    setCommunitiesPillSelected(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseSearch);
    return () => document.removeEventListener('mousedown', handleCloseSearch);
  }, []);

 
  return (
    <section ref={searchbarRef}>
      <div className="searchbarAndButton" style={{ display: 'flex' }}>
        <Autocomplete
          onClick={autocompleteHandler}
          value={searchbarValue}
          onChange={setSearchbarValue}
          
          mt="md"
          placeholder="Search..."
          leftSection={leftSection}
          rightSectionPointerEvents="none"
          // data={communities.map((c) => c.name)}
        />

        <Button style={{ marginTop: '1.1em'}} onClick={searchHandler}>
          <img src={search} alt="search" style={{ width: '3em', height: '2em' }} />
        </Button>
      </div>

      {clicked && (
        <>
          <Pill
            ref={communitiesPillRef}
            onClick={handleSearchCommunities}
            style={{
              background: communitiesPillSelected ? 'purple' : 'black',
              color: 'white',
              cursor: 'pointer',
              marginRight: '0.5em',
            }}
          >
            Only Communities
          </Pill>
          <Pill
            ref={postsPillRef}
            onClick={handleSearchPosts}
            style={{
              background: postsPillSelected ? 'purple' : 'black',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Only Posts
          </Pill>
        </>
      )}
    </section>
  );
}
