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
import { useState } from "react";
import Likes from "./Likes";
import Comments from "./Comments";
import Share from "./Share";
import { useNavigate } from "react-router-dom";
import { connectFirestoreEmulator } from "firebase/firestore";
import Saved from "../images/savedpost.svg";
import Unsaved from "../images/unsavedpost.svg";

export default function PostCard({
  postid,
  community,
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

  console.log(typeof comments);
  const commentsCounter = Array.isArray(comments) ? comments.length : 0;

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
              <Text fw={300}>
                {community}&nbsp; &#183; &nbsp;{username}{" "}
              </Text>
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

        <Card.Section mt="sm" onClick={handleClick}>
          {/* {Array.isArray(images) &&
            images.map((image) => (
              <div>
              <Image
                src={`http://localhost:3000/${image.replace(/\\/g, '/')}`}
                key={image}
                radius="sm"
                onClick={() => handleImageModal(image)}
              />
              {images.length}
              </div>
            ))} */}

          {Array.isArray(images) && images.length === 1 && (
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                width: "100%",
                height: "15em",
                border: "0.5em solid",
              }}
            >
              <Image
                src={`http://localhost:3000/${images[0].replace(/\\/g, "/")}`}
                key={images[0]}
                radius="sm"
                onClick={() => handleImageModal(images[0])}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </div>
          )}

          {Array.isArray(images) && images.length === 2 && (
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",

                height: "15em",
                border: "0.5em solid",
                display: "flex",
                flexDirection: "row",

                borderColor: "blue",
              }}
            >
              <Image
                src={`http://localhost:3000/${images[0].replace(/\\/g, "/")}`}
                key={images[0]}
                radius="sm"
                onClick={() => handleImageModal(images[0])}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  width: "50%",
                  border: "0.5em solid",
                  borderColor: "black",
                }}
              />
              <Image
                src={`http://localhost:3000/${images[1].replace(/\\/g, "/")}`}
                key={images[1]}
                radius="sm"
                onClick={() => handleImageModal(images[1])}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  width: "50%",
                  border: "0.5em solid",
                  borderColor: "black",
                }}
              />
            </div>
          )}
          {Array.isArray(images) && images.length === 3 && (
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",

                height: "15em",
                border: "0.5em solid",
                display: "flex",
                flexDirection: "row",
                borderColor: "blue",
              }}
            >
              <Image
                src={`http://localhost:3000/${images[0].replace(/\\/g, "/")}`}
                key={images[0]}
                radius="sm"
                onClick={() => handleImageModal(images[0])}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  width: "50%",
                  border: "0.5em solid",
                  borderColor: "black",
                }}
              />
              <div>
                <Image
                  src={`http://localhost:3000/${images[1].replace(/\\/g, "/")}`}
                  key={images[1]}
                  radius="sm"
                  onClick={() => handleImageModal(images[1])}
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    width: "50%",
                    border: "0.5em solid",
                    borderColor: "black",
                  }}
                />
                <Image
                  src={`http://localhost:3000/${images[2].replace(/\\/g, "/")}`}
                  key={images[2]}
                  radius="sm"
                  onClick={() => handleImageModal(images[2])}
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    width: "50%",
                    border: "0.5em solid",
                    borderColor: "black",
                  }}
                />
              </div>
            </div>
          )}

          {Array.isArray(images) && images.length > 3 && (
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",

                height: "15em",
                border: "0.5em solid",
                display: "flex",
                flexDirection: "row",
                borderColor: "blue",
              }}
            >
              <Image
                src={`http://localhost:3000/${images[0].replace(/\\/g, "/")}`}
                key={images[0]}
                radius="sm"
                onClick={() => handleImageModal(images[0])}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  width: "50%",
                  border: "0.5em solid",
                  borderColor: "black",
                }}
              />
              <div>
                <Image
                  src={`http://localhost:3000/${images[1].replace(/\\/g, "/")}`}
                  key={images[1]}
                  radius="sm"
                  onClick={() => handleImageModal(images[1])}
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    width: "50%",
                    border: "0.5em solid",
                    borderColor: "black",
                  }}
                />
                <div>
                  +{images.length - 2}
                </div>
              </div>
            </div>
          )}
        </Card.Section>

        <Card.Section inheritPadding mt="sm" pb="md">
          <SimpleGrid cols={3}>
            <Text mt="m" fw={500} size="l" style={{ textAlign: "left" }}>
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
