import { useState } from "react";
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
} from "@mantine/core";

const categories = [
  { "Rock Music": "red" },
  { "Pop Music": "crimson" },
  { "House Music": "skyblue" },
  { "Rap Music": "forestgreen" },
  { NSFW: "coral" },
  { Places: "midnightblue" },
  { Tourism: "lavender" },
  { Documentary: "gold" },
  { Music: "teal" },
  { Politics: "indigo" },
  { Sports: "salmon" },
  { Cooking: "turquoise" },
  { Football: "plum" },
  { Basketball: "navy" },
  { Baseball: "maroon" },
  { Swimming: "mintgreen" },
  { Tennis: "peachpuff" },
  { Polo: "slategray" },
  { Animals: "rosybrown" },
  { Business: "aqua" },
  { Tech: "charcoal" },
  { Fun: "periwinkle" },
  { Celebs: "olive" },
  { Movies: "hotpink" },
  { Painting: "beige" },
  { Theater: "cyan" },
  { Animation: "amber" },
];

// helpers
const getLabel = (obj) => Object.keys(obj)[0];
const getColor = (obj) => obj[getLabel(obj)];
const colorByLabel = (label) =>
  getColor(categories.find((c) => getLabel(c) === label) || { [label]: "gray" });

export default function FlagPills({flags,setFlags}) {
     const [value, setValue] = useState([]);

  // ενημερώνει το flags ώστε να αντικατοπτρίζει τα τρέχοντα labels
  const updateFlags = (nextLabels) => {
    const nextFlags = nextLabels.map((lbl) =>
      categories.find((c) => getLabel(c) === lbl) ?? { [lbl]: "gray" }
    );
    setFlags(nextFlags);
    console.log(nextFlags)
  };

  const handleValueSelect = (label) =>
    setValue((current) => {
      const next = current.includes(label)
        ? current.filter((v) => v !== label)
        : [...current, label];
      updateFlags(next);
      return next;
    });

  const handleValueRemove = (label) =>
    setValue((current) => {
      const next = current.filter((v) => v !== label);
      updateFlags(next);
      return next;
    });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");

  // ----------- UI ------------
  const values = value.map((label) => (
    <Pill
      key={label}
      variant="filled"
      style={{ background: colorByLabel(label), color: "black" }}
      withRemoveButton
      onRemove={() => handleValueRemove(label)}
    >
      {label}
    </Pill>
  ));

  const options = categories
    .filter((item) =>
      getLabel(item).toLowerCase().includes(search.trim().toLowerCase())
    )
    .slice(0, 3)
    .map((item) => {
      const label = getLabel(item);
      return (
        <Combobox.Option
          value={label}
          key={label}
          active={value.includes(label)}
        >
          <Group gap="sm">
            {value.includes(label) ? <CheckIcon size={12} /> : null}
            <span>{label}</span>
          </Group>
        </Combobox.Option>
      );
    });

  return (
    <>
      <h1>Add Flags</h1>
      <p>
        Adding flags helps identify a community’s purpose and lets users explore
        subreddits with shared flags!
      </p>

      <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.DropdownTarget>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Search values"
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Backspace" &&
                      search.length === 0 &&
                      value.length > 0
                    ) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found...</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {/* ——— Μπορείς να δεις τι έχει μέσα το flags για έλεγχο  ——— */}
      {/* <pre>{JSON.stringify(flags, null, 2)}</pre> */}
    </>
  );
}
