import { Card, Image, Text} from '@mantine/core';


export default function CommunityPreview({communityName, communityDescription}) {
return (
    <Card
    style={{width: "25em"}}
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          h={160}
          alt="No way!"
        />
      </Card.Section>
      <div id="IconTitleAndDescription" style={{display: "flex"}}>
<div style={{margin: "auto",width: "25%"}}>
    <div id="Icon" style={{display: "flex", alignItems: "center",justifyContent: "center",width: "5em", height: "5em",borderRadius: "50%", background: "blue"}}>
aaa
    </div>

 
</div>
<div style={{width: "75%"}}>
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