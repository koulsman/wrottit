import { Autocomplete, rem } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

export default function SearchCommunities({
  communities,
  searchbarValue,
  setSearchbarValue,
  setCommunitiesShown
}) {
  const icon = <IconComponents style={{ width: rem(16), height: rem(16) }} />;

  function searchHandler(value) {
    setSearchbarValue(value);

    const filtered = communities.filter((community) =>
      community.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setCommunitiesShown(filtered);
  }

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Autocomplete
        value={searchbarValue}
        onChange={searchHandler}
        mt="md"
        data={communities.map((c) => c.name)}
        rightSectionPointerEvents="none"
        rightSection={icon}
        placeholder="Search..."
      />
    </section>
  );
}
