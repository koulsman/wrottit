import { useState, useRef, useEffect } from "react";
import { Button, Textarea, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import axios from "axios";
import { Autocomplete } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useClickOutside } from "@mantine/hooks";
import {Hourglass } from 'react-loader-spinner'
import config from "../config";

function CreatePost() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const postCreationRef = useRef(null);

  const [communityClicked, setCommunityClicked] = useState(false);
  const communityRef = useRef(null);

  const [communityName, setCommunityName] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [submittedPost, setSubmittedPost] = useState("");
  const [communities, setCommunities] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [communityChoises, setCommunityChoises] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState("");

  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [imageTabSelected, setImageTabSelected] = useState(false);

  function handleImageDrop(files) {
    console.log("Dropped Files:", files);

    files.forEach((file) => {
      if (!(file instanceof File)) {
        console.error("Invalid file type detected:", file);
      }
    });

    setImages((prev) => [...prev, ...files]);
  }
  function contentHandler(e) {
    setContent(e.target.value);
  }

  const handleCommunity = () => {
    setCommunityClicked(true);
  };

  const postStyle = {
    width: "fitContent",
    maxHeight: "5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0.1em solid #4dabf7",
    borderRadius: "0.5em",
  };

  function handleNewPost() {
    setIsCreatingPost(true);
  }

  function handleCloseNewPost() {
    setIsCreatingPost(false);
  }

  function communitySubmittedHandler(community) {
    console.log(community);
    const chosenCommunityNameAndId = communityChoises.find((element) =>
      element[0].startsWith(community)
    );
    if (chosenCommunityNameAndId) {
      setChosenCommunity(chosenCommunityNameAndId);
      setCommunityName(chosenCommunityNameAndId[0]);
      setCommunityId(chosenCommunityNameAndId[1]);
    }

    console.log(chosenCommunityNameAndId);
  }

  useEffect(() => {}, []);

  async function communityChooserHandler() {
    try {
      const response = await axios.get(`${config.COMMUNITIES_API}/communities`);
      setCommunities(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(communities + "communities");
    const communitiesFull = communities.map((community) => [
      community.name,
      community._id,
    ]);
    console.log(communitiesFull);
    const totalCommunities = communities.map((community) => community.name);
    console.log(totalCommunities);
    // setCommunityChoises(totalCommunities);
    setCommunityChoises(communitiesFull);
  }, [communities, setCommunityChoises]);

  async function handleImageUpload() {
    console.log(images);
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
  async function submitPost() {
    if (!title || !communityName || (!content && images.length === 0)) {
      alert(
        "Please fill in all required fields (title, community, and either content or an image)."
      );
      return;
    }

    try {
      // Step 1: Upload all images to Cloudinary
      const uploadedImageUrls = [];
      for (const image of images) {
        const url = await uploadToCloudinary(image);
        uploadedImageUrls.push(url);
      }

      const response = await axios.post(`${config.POSTS_API}/posts`, {
        title: title,
        communityName: communityName,
        communityId: communityId,
        uid: loggedUser._id,
        uname: loggedUser.name,
        content: content || "",
        images: uploadedImageUrls,
      });
      console.log("Created post:", response.data);
      setIsSubmittingPost(true)
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Post creation error:", error);
    }
  }

  return (
    <>
      {(() => {
        if (isLoggedIn && isCreatingPost && !isSubmittingPost) {
          return (
            <div
              style={{
                maxWidth: "fitContent",
                width: "100%",
                minWidth: "15em",
                maxWidth: "40em",
                height: "100%",
                minHeight: "5em",
                maxHeight: "45em",
                border: "0.1em solid #4dabf7",
                borderRadius: "0.5em",
                padding: "1em",
              }}
            >
              <div
                id="TitleAndCloseButton"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1em",
                }}
              >
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h1 style={{ margin: 0 }}>Create Post</h1>
                </div>
                <div>
                  <ActionIcon
                    size={42}
                    variant="default"
                    aria-label="Close Post Creation"
                    onClick={() => setIsCreatingPost(false)}
                  >
                    <IconX size={24} />
                  </ActionIcon>
                </div>
              </div>

              <div
                id="PostInfo"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* {communityClicked ? 
                (
                  <input
                    className="Text-input"
                    ref={communityRef}
                    style={{ marginBottom: "1em" }}
                    placeholder="type community"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                  />
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#E5E4E2",
                      marginBottom: "1em",
                      width: "15em",
                      height: "4em",
                      borderRadius: "0.5em",
                      textAlign: "start",
                    }}
                    ref={communityRef}
                    onClick={handleCommunity}
                  >
                    Choose Community
                  </Button>
                )} */}
                <Autocomplete
                style={{margin: "auto", width: "100%",minWidth: "10em",maxWidth: "30em", backgroundColor: "white", borderRadius: "0.5em",padding: "1em black",
                  backgroundClip: "content-box",
  boxShadow: "inset 0 0 0 10px black"
                }}
                  onChange={communityChooserHandler}
                  withinPortal={false}
                  placeholder="Choose community"
                  data={communityChoises.map((community) => community[0])}
                  // value={community}
                  limit={3}
                  // onOptionSubmit={(community) => setCommunity(community)}
                  onOptionSubmit={(community) =>
                    communitySubmittedHandler(community)
                  }
                />

                <input
                  className="Text-input"
                  placeholder="type title"
                  style={{margin: "1em auto 1em auto", width: "100%",minWidth: "10em",maxWidth: "30em"}}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Tabs defaultValue="text">
                  <Tabs.List>
                    <Tabs.Tab value="text">Text</Tabs.Tab>
                    <Tabs.Tab value="images">Image</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="text">
                    <Textarea
                      // style={{ height: "10em" }}
                      value={content}
                      onChange={contentHandler}
                      minRows={15}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="images">
                    <div>
                      <Dropzone style={{height: "100%", minHeight: "5em", maxHeight: "30em"}}
                        onDrop={handleImageDrop}
                        onReject={(files) =>
                          console.log("Rejected files:", files)
                        }
                        maxSize={5 * 1024 ** 2}
                        
                        accept={IMAGE_MIME_TYPE}
                      >
                        <Group
                          justify="center"
                          gap="xl"
                          mih={220}
                          style={{ pointerEvents: "none" }}
                        >
                          <Dropzone.Accept>
                            <IconUpload
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-blue-6)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Accept>
                          <Dropzone.Reject>
                            <IconX
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Reject>
                          <Dropzone.Idle>
                            <IconPhoto
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-dimmed)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Idle>

                          <div>
                            <Text size="xl" inline>
                              Drag images here or click to select files
                            </Text>
                            {images.map((file, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                height="100em"
                                width="100em"
                                style={{ margin: "1em" }}
                                alt="preview"
                              />
                            ))}
                          </div>
                        </Group>
                      </Dropzone>
                    </div>
                  </Tabs.Panel>
                </Tabs>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flexEnd",
                  }}
                >
                  {communityName !== "" && (images.length > 0  || content) ? (
                    <Button onClick={submitPost}>Post</Button>
                  ) : (
                    <Button disabled>Post</Button>
                  )}
                </div>
              </div>
            </div>
          );
        } else if (isLoggedIn && !isCreatingPost) {
          return (
            <div
              onClick={() => setIsCreatingPost(true)}
              style={postStyle}
              ta="center"
            >
              Create a new post
            </div>
          );
        } else if (!isLoggedIn) {
          return <div style={postStyle}>Login to post</div>;
        } else if (isLoggedIn && isCreatingPost && isSubmittingPost) {
          return (
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          );
        }
      })()}
    </>
  );
}

export default CreatePost;
