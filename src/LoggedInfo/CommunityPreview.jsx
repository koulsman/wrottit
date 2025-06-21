import { Card, Image, Text } from "@mantine/core";
import NoBanner from "../images/NoBanner.png";
import NoIcon from "../images/NoIcon.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react";

export default function CommunityPreview({
  communityName,
  communityDescription,
  communityIconImage,
  communityBannerImage,
  communityId,
}) {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const previewWidth = location.pathname.includes("CommunityCreator")
    ? "25em"
    : "15em";

  function navigateToSelectedCommunity(communityId) {
    console.log(communityId);
    navigate(`/${communityId}/SelectedCommunity`);
  }

  return (
    <Card
      onClick={() => navigateToSelectedCommunity(communityId)}
      style={{
        width: previewWidth,
        margin: "1em auto",
        padding: "1em",
        cursor: "pointer",
      }}
      shadow="sm"
      padding="xl"
    >
      <Card.Section>
        <Image
          src={communityBannerImage || NoBanner}
          height={160}
          alt="Community banner"
          fit="cover"
        />
      </Card.Section>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          marginTop: "1em",
        }}
      >
        <div
          style={{
            width: "4em",
            height: "4em",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src={communityIconImage || NoIcon}
            alt="Community icon"
            width="100%"
            height="100%"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>

        <div style={{ flexGrow: 1 }}>
          <Text fw={600} size="lg">
            {communityName}
          </Text>
          <Text mt={4} c="dimmed" size="sm" lineClamp={3}>
            {communityDescription}
          </Text>
        </div>
      </div>
    </Card>
  );
}
