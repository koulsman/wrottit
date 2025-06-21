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
import { useState, useRef } from "react";
import Likes from "./Likes";
import Comments from "./Comments";
import Share from "./Share";
import { useNavigate } from "react-router-dom";
import { connectFirestoreEmulator } from "firebase/firestore";
import Saved from "../images/savedpost.svg";
import Unsaved from "../images/unsavedpost.svg";
import { Carousel } from "@mantine/carousel";
import ImageCarousel from "./ImageCarousel";
import {Pill} from "@mantine/core";

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
 
  const communityRef = useRef()
  console.log(typeof comments);
  const commentsCounter = Array.isArray(comments) ? comments.length : 0;
  
  function showCommunityHandler() {

  }

  function navigateToCommunityHandler() {

  }
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

  function handlePostImages(event) {
    event.stopPropagation()
  }

  function nextSlideHandler() {
    console.log("next slide")
  }

  const demoimages = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
  ];

  function imageClickHandler() {

  }


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
              <div style={{display: "flex",padding: 0, margin: 0}} >
              
              <Text fw={300} ref={communityRef} onMouseOver={() => showCommunityHandler()} onClick={() => navigateToCommunityHandler()}>
                {communityName}
              </Text>
              
              <Text>
              &nbsp; &#183; &nbsp;{username}{" "}
              </Text>
              </div>
              
              <Text fw={200}></Text>
              <Text fw={500}>{title}</Text>
            </div>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconFileZip style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Download zip
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <img
                      src={savedPost ? Saved : Unsaved}
                      alt="Save Icon"
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        color: "white",
                      }}
                    />
                  }
                  onClick={saveHandler}
                >
                  Save
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  color="red"
                >
                  Delete all
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>

        <Card.Section  style={{display: "flex", justifyContent: "center",margin: "1em auto"}} mt="sm" onClick={handlePostImages}>
          
         
            {Array.isArray(images) && images.length > 0 && (
              <ImageCarousel  images={images} onClick={imageClickHandler}
              // slidesInView={() => nextSlideHandler()}
              />
            )}
        </Card.Section>
        <Card.Section inheritPadding mt="sm" pb="md">
          <SimpleGrid cols={3}>
            <Text mt="m" fw={500} size="l" style={{ textAlign: "left", width: "20em" }}>
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
