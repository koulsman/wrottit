import blackUserImage from "./images/UserImage/black.svg";
import blueUserImage from "./images/UserImage/blue.svg";
import burgundyUserImage from "./images/UserImage/burgundy.svg";
import limeUserImage from "./images/UserImage/lime.svg";
import orangeUserImage from "./images/UserImage/orange.svg";
import pinkUserImage from "./images/UserImage/pink.svg";
import spiralUserImage from "./images/UserImage/spiral.svg";
import { Avatar } from "@mantine/core";
import { Navbar } from "./Navbar";
import { Grid, GridCol } from "@mantine/core";
export default function ChangeUserImage() {
  const userImagesArray = [
    blackUserImage,
    blueUserImage,
    burgundyUserImage,
    limeUserImage,
    orangeUserImage,
    pinkUserImage,
    spiralUserImage,
  ];
  return (
    <>
      <Grid>
        <Grid.Col span="4">
          <Navbar />
        </Grid.Col>

        <Grid.Col span="4">
          <h1>Change User Image</h1>
          <div style={{ display: "flex" }}>
            {userImagesArray.map((element, key) => (
              <Avatar
                style={{ margin: "1em" }}
                variant="light"
                radius="lg"
                size="lg"
                color="blue"
                src={element}
                key={key}
              />
            ))}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}
