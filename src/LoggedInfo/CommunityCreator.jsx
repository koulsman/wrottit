import { TextInput, Textarea, Button, Tooltip } from "@mantine/core";
import { useReducer, useState } from "react";
import { Card, Image, Text } from "@mantine/core";

import { Grid } from "@mantine/core";
import { Navbar } from "../NavBar/Navbar";
import NextCard from "../images/next.svg";
import PreviousCard from "../images/previous.svg";
import DefaultImage from "../images/imageDefault.svg";
import { FileInput } from "@mantine/core";
import CommunityPreview from "./CommunityPreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Blocks } from "react-loader-spinner";

export default function CommunityCreator() {
  const initialState = { page: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityRules, setCommunityRules] = useState("");
  const [communityBannerImage, setCommunityBannerImage] = useState(null);
  const [communityIconImage, setCommunityIconImage] = useState(null);
  const [createdCommunity, setCreatedCommunity] = useState(false);
  const [iconForCloudinary, setIconForCloudinary] = useState("");
  const [bannerForCloudinary, setBannerForCloudinary] = useState("");
  const [isPostingCommunity, setIsPostingCommunity] = useState(false);
  const navigate = useNavigate();

  const ImageIcon = <img src={DefaultImage} size={18} stroke={1.5} />;

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        console.log("increment");
        return { page: state.page + 1 };
      case "decrement":
        console.log("decrement");
        return { page: state.page - 1 };
    }
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wrottit"); // replace with your actual upload preset name

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddakpw9jf/image/upload", // use your actual Cloudinary cloud name here
      formData
    );
    return res.data.secure_url; // this is what you want to store in MongoDB
  };
  async function communityCreatorHandler() {
    try {
      let bannerUrl = "";
      let iconUrl = "";

      if (communityBannerImage) {
        bannerUrl = await uploadToCloudinary(bannerForCloudinary);
      }

      if (communityIconImage) {
        iconUrl = await uploadToCloudinary(iconForCloudinary);
      }
      const response = await axios.post("http://localhost:3003/communities", {
        name: communityName,
        description: communityDescription,
        iconImage: iconUrl,
        bannerImage: bannerUrl,
      });
      console.log("Created community:", response.data);
      setIsPostingCommunity(true);
      if (response.ok) {
        setCreatedCommunity(true);
        navigate(`/Communities`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }
  function succesfulCommunityCreation() {}
  return (
    <div>
      <Grid>
        <Grid.Col span={3}>
          <Navbar />
        </Grid.Col>
        <Grid.Col span={window.innerWidth < 720 ? "7" : "auto"}>
          <div>
            {state.page === 1 && (
              <div id="firstPage">
                <h1>Welcome to Community Creator</h1>

                <p>
                  Tell us about your community. A name and description help
                  people understand what your community is all about.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{ maxWidth: "20em", marginTop: "1em" }}
                    label="Community Name"
                    placeholder="example: Rock Music"
                    description="Add a name for your community"
                    value={communityName}
                    onChange={(event) =>
                      setCommunityName(event.currentTarget.value)
                    }
                    withAsterisk
                  />
                  <Textarea
                    style={{
                      maxWidth: "20em",
                      height: "14em",
                      marginTop: "1em",
                    }}
                    label="Community Description"
                    placeholder="example: This community is about Rock Music, where we share are favorite rock tracks and artists"
                    description="Add a description for your community"
                    value={communityDescription}
                    onChange={(event) =>
                      setCommunityDescription(event.currentTarget.value)
                    }
                    autosize
                    minRows={2}
                    withAsterisk
                  />
                </div>
              </div>
            )}
            {state.page === 2 && (
              <div id="SecondPage">
                <h1>Style your community</h1>
                <p>
                  Adding visual flair will catch new members attention and help
                  establish your community’s culture! You can update this at any
                  time.
                </p>

                <FileInput
                  style={{ width: "10em", margin: "auto" }}
                  leftSection={
                    <img
                      src={DefaultImage}
                      style={{ width: "2em", height: "1em" }}
                      stroke={1.5}
                    />
                  }
                  label="Banner"
                  description="Add a Banner for your community"
                  placeholder="Your Banner"
                  leftSectionPointerEvents="none"
                  onChange={(file) => {
                    if (file) {
                      setCommunityBannerImage(URL.createObjectURL(file));
                      setBannerForCloudinary(file);
                    }
                  }}
                />

                <FileInput
                  style={{ width: "10em", margin: "auto" }}
                  leftSection={
                    <img
                      src={DefaultImage}
                      style={{ width: "2em", height: "1em" }}
                      stroke={1.5}
                    />
                  }
                  label="Icon"
                  description="Add an Icon  for your community"
                  placeholder="Your Icon"
                  leftSectionPointerEvents="none"
                  onChange={(file) => {
                    if (file) {
                      setCommunityIconImage(URL.createObjectURL(file));
                      setIconForCloudinary(file);
                    }
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2em",
                  }}
                >
                  <CommunityPreview
                    communityDescription={communityDescription}
                    communityName={communityName}
                    communityIconImage={communityIconImage}
                    communityBannerImage={communityBannerImage}
                  />
                </div>
              </div>
            )}
            {state.page === 3 && (
              <div id="ThirdPage">
                <h1>Add Rules</h1>
                <p>
                  Adding rules to your community will help co-ordinate the
                  community and have a shared spirit across it's members!
                </p>
                <Textarea
                  style={{ maxWidth: "20em", height: "14em", margin: "auto" }}
                  label="Rules"
                  placeholder="example: No other music other than rock music"
                  description="Add your community rules"
                  value={communityRules}
                  onChange={(event) =>
                    setCommunityRules(event.currentTarget.value)
                  }
                  autosize
                  minRows={5}
                  withAsterisk
                />
              </div>
            )}
            <div
              id="Navigation"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
                width: "100%",
              }}
            >
              <Button
                style={{ visibility: state.page === 1 ? "hidden" : "visible" }}
                onClick={() => dispatch({ type: "decrement" })}
              >
                <img
                  src={PreviousCard}
                  alt="Previous"
                  style={{ width: "3em" }}
                />
              </Button>

              {(() => {
                if (state.page !== 3) {
                  return (
                    <Button onClick={() => dispatch({ type: "increment" })}>
                      <img src={NextCard} alt="Next" style={{ width: "3em" }} />
                    </Button>
                  );
                } else if (state.page === 3 && !isPostingCommunity) {
                  return communityName && communityDescription ? (
                    <Button
                      onClick={(communityName, communityDescription) =>
                        communityCreatorHandler()
                      }
                    >
                      Create Community!
                    </Button>
                  ) : (
                    <Tooltip label="Please fill community name and community description to create your community!">
                      <Button disabled>Create!</Button>
                    </Tooltip>
                  );
                } else if (state.page === 3 && isPostingCommunity) {
                  return (
                    <Blocks
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
  />
                  );
                }
              })()}
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </div>
  );
}
