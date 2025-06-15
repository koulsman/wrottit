import {useState, useRef, useEffect} from 'react'
import { NativeSelect } from '@mantine/core';
export default function SearchedTermInSearchbar({searchedTerm}) {
   
   const [nativeSelectValue, setNativeSelectValue] = useState('All time');
    return (
        <>
         <NativeSelect
      value={nativeSelectValue}
      onChange={(event) => setNativeSelectValue(event.currentTarget.value)}
      data={['All time', 'Past Year', 'Past Month', 'Today']}
    />
        <h1>Searched: {searchedTerm}</h1>
        </>
    )
}