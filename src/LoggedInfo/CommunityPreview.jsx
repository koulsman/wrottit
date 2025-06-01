import { Card, Image, Text } from "@mantine/core";
import NoBanner from "../images/NoBanner.png";
import NoIcon from "../images/NoIcon.png";
import { useNavigate } from "react-router-dom";

export default function CommunityPreview({
  communityName,
  communityDescription,
  communityIconImage,
  communityBannerImage,
  communityId
}) {
const navigate = useNavigate()

function navigateToSelectedCommunity(communityId) {
 console.log(communityId)
    navigate(`/${communityId}/SelectedCommunity`)
}


  return (
    <Card onClick={(communityId) => navigateToSelectedCommunity(communityId)}
      style={{ width: "25em", margin: "1em", padding: "1em"}}
      shadow="sm"
      padding="xl"
      component="a"
      target="_blank"
    >
      <Card.Section>
        {!communityBannerImage ? (
          <Image src={NoBanner} h={160} alt="No way!" />
        ) : (
          <Image src={communityBannerImage} h={160} alt="No way!" />
        )}
      </Card.Section>
      <div id="IconTitleAndDescription" style={{ display: "flex" }}>
        {communityId}
        <div style={{ width: "4em" }}>
          <div
            id="Icon"
            style={{
              marginTop: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              width: "4em",
              height: "4em",
              borderRadius: "50%",
              background: "blue",
              overflow: "hidden", // Make sure image doesn't overflow the circle
            }}
          >
            {!communityIconImage ? (
              <Image src={NoIcon} h={160} alt="No way!" />
            ) : (
              <Image
                src={communityIconImage}
                alt="Icon"
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
        <div style={{ width: "6em" }}>
          <Text fw={500} size="lg" mt="md">
            {communityName}
          </Text>

          <Text mt="xs" c="dimmed" size="sm">
            {communityDescription}
          </Text>
        </div>
      </div>
    </Card>
  );
}
