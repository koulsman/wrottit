import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

export default function DatePicker() {
  const [value, setValue] = useState();
  console.log(value)
  const startingDate = value[0].toLocaleDateString('gr-GR');;
  const finishedDate = value[1].toLocaleDateString('gr-GR');

  if(startingDate && finishedDate) {
    console.log("startingDate: " + startingDate + "finishedDate: " + finishedDate)
  }
  return (
    <DatePickerInput
      type="range"
      label="Pick dates range"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
    />
  );
}