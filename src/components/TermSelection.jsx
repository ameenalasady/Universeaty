// TermSelection.jsx

import React from "react";
import { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

const TermSelection = ({
  term,
  setTerm,
  setSelectedOption,
  setData,
  setShowContact,
}) => {
  return (
    <FormControl component="fieldset">
      <Box>
        <RadioGroup
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setSelectedOption(null);
            setData(null); // Clear the data state here
            setShowContact(false);
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <FormControlLabel
            value="3202430"
            control={<Radio />}
            label="Fall 2024"
          />

          <FormControlLabel
            value="3202510"
            control={<Radio />}
            label="Winter 2025"
          />

          <FormControlLabel
            value="3202450"
            control={<Radio />}
            label="Spring/Summer 2024"
          />
        </RadioGroup>
      </Box>
    </FormControl>
  );
};

export default TermSelection;
