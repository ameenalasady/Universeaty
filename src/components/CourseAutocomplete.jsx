import React from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import courses3202450 from "../courseJSON/3202450.json";
import courses3202430 from "../courseJSON/3202430.json";
import courses3202510 from "../courseJSON/3202510.json";

const CourseAutocomplete = ({
  term,
  selectedOption,
  setSelectedOption,
  courseCode,
  setCourseCode,
}) => {
  const OPTIONS_LIMIT = 30;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
    matchFrom: "any",
    stringify: (option) =>
      option.Text + " " + option.Text.replace("-", " ") + " " + option.Info,
  });

  return (
    <Autocomplete
      filterOptions={filterOptions}
      options={
        term === "3202430"
          ? courses3202430
          : term === "3202510"
          ? courses3202510
          : term === "3202450"
          ? courses3202450
          : []
      }
      getOptionLabel={(option) => option.Text}
      renderOption={(props, option) => (
        <li {...props}>
          {option.Text} - {option.Info}
        </li>
      )}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
        setCourseCode(newValue ? newValue.Text : "");
      }}
      inputValue={courseCode}
      onInputChange={(event, newInputValue) => {
        setCourseCode(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Course Code"
          InputProps={{
            ...params.InputProps,
            sx: { borderRadius: "1.5em" },
          }}
        />
      )}
      sx={{ marginBottom: "1em", marginTop: "1em" }}
    />
  );
};

export default CourseAutocomplete;
