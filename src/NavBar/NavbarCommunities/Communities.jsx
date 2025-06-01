import SearchCommunities from './SearchCommunities'
import CommunityPreview from "../../LoggedInfo/CommunityPreview";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Communities() {
    const [communities,setCommunities] = useState([])
    const navigate = useNavigate();
    async function handleCommunities() {
    
    try {
      const response = await axios.get("http://localhost:3003/communities");
      console.log("Communities fetched:", response.data);
      setCommunities(response.data);
      console.group(communities)
      communities.forEach((community) => {
        console.log(community.iconImage)
      })
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  }

 
// communityName, communityDescription, communityIconImage, communityBannerImage


  useEffect(() => {
    handleCommunities();
  }, []);
    return (
        <div>
            <h1>Browse or Search Communities</h1>
            <SearchCommunities communities = {communities}/>
            {communities.map((community,index) => {
                return (<CommunityPreview  key={community._id} communityId = {community._id}  communityName={community.name} communityDescription={community.description}
                     communityIconImage={community.iconImage} communityBannerImage={community.bannerImage} />)
                    
            })}
        </div>
    )
}