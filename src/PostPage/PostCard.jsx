import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import ImageModal from "../Post Creation/ImageModal";
import { useDisclosure } from "@mantine/hooks";
import { useState, useRef, usePortal } from "react";
import Likes from "./Likes";
import Comments from "./Comments";
import Share from "./Share";
import { useNavigate } from "react-router-dom";
import { connectFirestoreEmulator } from "firebase/firestore";

import { Carousel } from "@mantine/carousel";
import ImageCarousel from "./ImageCarousel";
import { Pill } from "@mantine/core";
import SavedPostSVG from "../images/savedpost.svg"
import UnsavedPostSVG from "../images/unsavedpost.svg"
import { createPortal } from "react-dom";

export default function PostCard({
  postid,
  communityName,
  communityId,
  title,
  username,
  content,
  images,
  upvotes,
  comments,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [imageSelected, setImageSelected] = useState("");
  const navigate = useNavigate("");
  const [savedPost, setSavedPost] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);

  const communityRef = useRef();
  console.log(typeof comments);
  const commentsCounter = Array.isArray(comments) ? comments.length : 0;

  function showCommunityHandler() {}

  function navigateToCommunityHandler() {}
  async function saveHandler() {
    setSavedPost(!savedPost);
  }

  function handleImageModal(image) {
    setImageSelected(image);
    open();
  }
  console.log(title + comments);

  const handleClick = () => {
    navigate(`/post/${postid}`);
  };

  function nextSlideHandler() {
    console.log("next slide");
  }

  const demoimages = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
  ];

  return (
    <>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        style={{ margin: "2em 0 2em 0" }}
      >
        <Card.Section onClick={handleClick} withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", padding: 0, margin: 0 }}>
                <Pill
                  fw={700}
                  ref={communityRef}
                  style={{
                    marginTop: "0.2em",
                    ...(communityHovered && {
                      background: "purple",
                      color: "white",
                    }),
                  }}
                  onMouseOver={() => setCommunityHovered(true)}
                  onMouseLeave={() => {
                    communityHovered === true && setCommunityHovered(false);
                  }}
                  onClick={() => navigateToCommunityHandler()}
                >
                  {communityName}
                </Pill>

                <Text>&nbsp; &#183; &nbsp; {username} </Text>
              </div>
              <Text fw={200}></Text>
              <Text fw={500}> &nbsp; {title}</Text>
            </div>
            <div withinPortal position="bottom-end" shadow="sm">
              <div style={{background: "purple", borderRadius: "0.5"}}>
                  <img onClick={saveHandler}
                    src={savedPost ? SavedPostSVG : UnsavedPostSVG}
                    alt="Save Icon"
                    style={{
                     
                      width: "1.5em",
                      height: "1.5em",
                     
    cursor: "pointer",
   
                    
                    }}
                  />
                
              </div>
            </div>
          </Group>
        </Card.Section>

        <Card.Section
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1em auto",
          }}
          mt="sm"
        >
          {Array.isArray(images) && images.length > 0 && (
            <ImageCarousel
              images={images}
              // slidesInView={() => nextSlideHandler()}
            />
          )}
        </Card.Section>

        <Card.Section inheritPadding mt="sm" pb="md">
          <SimpleGrid cols={3}>
            <Text
              mt="m"
              fw={500}
              size="l"
              style={{ textAlign: "left", width: "20em" }}
            >
              {content}
            </Text>
          </SimpleGrid>
        </Card.Section>

        <Card.Section>
          <SimpleGrid
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "1em",
            }}
          >
            <Likes postid={postid} votes={upvotes} />
            <div onClick={handleClick}>
              <Comments commentsCounter={commentsCounter} />
            </div>
            <Share postid={postid} />
          </SimpleGrid>
        </Card.Section>
      </Card>

      <ImageModal
        opened={opened}
        onClose={close}
        image={`http://localhost:3000/${imageSelected.replace(/\\/g, "/")}`}
      />
    </>
  );
}
