import { useState, useRef, useEffect } from "react";
import { Button, Textarea, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import axios from "axios";

import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

function CreatePost() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const postCreationRef = useRef(null);

  const [communityClicked, setCommunityClicked] = useState(false);
  const communityRef = useRef(null);

  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [submittedPost, setSubmittedPost] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);

  const [uploading, setUploading] = useState(false);

  const [imageTabSelected,setImageTabSelected] = useState(false)

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

  const handleCloseCommunityChooser = (event) => {
    if (communityRef.current && !communityRef.current.contains(event.target)) {
      setCommunityClicked(false);
    }
  };

  useEffect(() => {
    if (communityClicked && community === "") {
      document.addEventListener("mousedown", handleCloseCommunityChooser);
    }
    return () => {
      document.removeEventListener("mousedown", handleCloseCommunityChooser);
    };
  }, [communityClicked, community]);

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

  const handleCloseNewPost = (event) => {
    if (
      postCreationRef.current &&
      !postCreationRef.current.contains(event.target)
    ) {
      setIsCreatingPost(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseNewPost);
    return () => {
      document.removeEventListener("mousedown", handleCloseNewPost);
    };
  }, []);
  async function handleImageUpload() {
    console.log(images)
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
  if (!title || !community || (!content && images.length === 0)) {
    alert("Please fill in all required fields (title, community, and either content or an image).");
    return;
  }
  

  
  try {
    // Step 1: Upload all images to Cloudinary
    const uploadedImageUrls = [];
    for (const image of images) {
      const url = await uploadToCloudinary(image);
      uploadedImageUrls.push(url);
    }

  
  

    const response = await axios.post("http://localhost:3002/posts", {
      title: title,
      community: community, 
      uid: loggedUser._id,
      uname: loggedUser.name,
      content: content || "",
      images: uploadedImageUrls
    });
    console.log("Created post:", response.data);
  } catch (error) {
    console.error("Post creation error:", error);
  }
  
}
  

  return (
    <>
      {(() => {
        if (isLoggedIn && isCreatingPost) {
          return (
            <div
              ref={postCreationRef}
              style={{
                maxWidth: "fitContent",
                minWidth: "5em",
                maxHeight: "45em",
                border: "0.1em solid #4dabf7",
                borderRadius: "0.5em",
                padding: "1em",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h1>Create Post</h1>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {communityClicked ? (
                  <input
                    className="Text-input"
                    ref={communityRef}
                    style={{ marginBottom: "1em" }}
                    placeholder="type community"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                  />
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#E5E4E2",
                      marginBottom: "1em",
                      width: "15em",
                      height: "4em",
                      borderRadius: "0.5em",
                      textAlign: "start"
                    }}
                    ref={communityRef}
                    onClick={handleCommunity}
                  >
                    Choose Community
                  </Button>
                )}
                <input
                  className="Text-input"
                  placeholder="type title"
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
                      style={{ height: "10em" }}
                      value={content}
                      onChange={contentHandler}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="images">
                    <div>
                      <Dropzone
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
                  {images.length > 0 ? <Button onClick={ submitPost}>Post</Button> : <Button disabled>Post</Button>}
                  
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
        }
      })()}
    </>
  );
}

export default CreatePost;
