import SearchCommunities from "./SearchCommunities";
import CommunityPreview from "../../LoggedInfo/CommunityPreview";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mantine/core";
import { Navbar } from "../Navbar";
import config from "../../config";


export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [communitiesShown, setCommunitiesShown] = useState([]);
  const [searchbarValue, setSearchbarValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCommunities() {
      try {
        const response = await axios.get("http://localhost:3003/communities");
        setCommunities(response.data);
      } catch (error) {
        console.error("Error getting communities:", error);
      }
    }

    handleCommunities();
  }, []);

  // function navigateToSelectedCommunityHandler(communityId) {
  //     navigate(`/:${communityId}/SelectedCommunity`);
  // }

  // Determine which list to render
  const displayedCommunities =
    searchbarValue.trim() !== "" ? communitiesShown : communities;

  return (
    <div>
      <Grid>
        <Grid.Col span={3}>
          <Navbar />
        </Grid.Col>
        <Grid.Col span={window.innerWidth < 720 ? "7" : "auto"}>
          <h1 style={{margin: "0.5em"}}>Browse or Search Communities</h1>
          <SearchCommunities
            communities={communities}
            searchbarValue={searchbarValue}
            setSearchbarValue={setSearchbarValue}
            setCommunitiesShown={setCommunitiesShown}
          />

          {displayedCommunities.map((community) => (
            <CommunityPreview style={{width: "5em!important"}}
            // onClick={navigateToSelectedCommunityHandler(community._id)}
              key={community._id}
              communityId={community._id}
              communityName={community.name}
              communityDescription={community.description}
              communityIconImage={community.iconImage}
              communityBannerImage={community.bannerImage}
            />
          ))}
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </div>
  );
}
