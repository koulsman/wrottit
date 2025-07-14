import { Card, Group, Text, Section } from '@mantine/core';

export default function CommentCard({ comment, username, date }) {

  console.log(date + "date" + comment + username )
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flexDirection: 'column' }}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group >
          <Text c="blue" size="sm" fw={300}>{username}</Text>
          <Text c="blue" size="sm" fw={300}>{date}</Text>
        </Group>
        <Group>
          <Text>{comment}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
}
