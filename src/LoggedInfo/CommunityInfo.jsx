import { Card, Image, Text, Pill, Group, Button } from "@mantine/core";
import NoBanner from "../images/NoBanner.png";
import NoIcon from "../images/NoIcon.png";
import { useNavigate } from "react-router-dom";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconTextGrammar, IconFlag } from '@tabler/icons-react';
import { useRef } from "react";
export default function CommunityInfo({
  communityName,
  communityDescription,
  communityIconImage,
  communityBannerImage,
  communityRules,
  communityId,communityFlags
}) {
const joinButtonRef = useRef(null)
console.log(communityFlags + "communityFlags")
 function joinCommunityHandler() {
     console.log("press to join")
     if (joinButtonRef.current) {
       joinButtonRef.current.style.background = "purple";
       joinButtonRef.current.style.color = "white";
       joinButtonRef.current.innerText = "Joined";
     }
   }
  return (
    <>
    <Card
      
      style={{
        width: "25em",
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
        {/* Icon */}
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

        {/* Name + Description */}
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
    <div id="Join" style={{margin: "1em"}} >
            <Button  ref= {joinButtonRef} onClick={joinCommunityHandler}>
                  Join
                </Button>
    </div>
    
     <Tabs color="grape" variant="pills" radius="lg" defaultValue="gallery">
      <Tabs.List>
        {/* <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Gallery
        </Tabs.Tab> */}
        <Tabs.Tab value="Rules" leftSection={<IconTextGrammar size={12} />}>
          Rules of this Community
        </Tabs.Tab>
        <Tabs.Tab value="Flags" leftSection={<IconFlag size={12} />}>
          Community Flags
        </Tabs.Tab>
      </Tabs.List>
      

      {/* <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel> */}

        <Tabs.Panel value="Rules" pt="md">
          {communityRules
            ? communityRules
                .split(/\r?\n/)               
                .filter((r) => r.trim() !== "")
                .map((rule, i) => (
                  <Text key={i} mb="xs">
                    {i + 1}. {rule}
                  </Text>
                ))
            : <Text italic>No rules set for this community.</Text>}
        </Tabs.Panel>

      <Tabs.Panel value="Flags">
  {communityFlags?.length ? (
    <Group gap="xs">
      {communityFlags.map((flagObj, index) =>
        Object.entries(flagObj).map(([name, color]) => (
          <Pill
            key={`${name}-${index}`}
            variant="filled"
            radius="lg"
            style={{ backgroundColor: color, color: "black" }}
          >
            {name}
          </Pill>
        ))
      )}
    </Group>
  ) : (
    <Text c="dimmed">No flags set for this community</Text>
  )}
</Tabs.Panel>
    </Tabs>
    </>
  );
}