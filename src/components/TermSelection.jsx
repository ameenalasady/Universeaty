// TermSelection.jsx

import React from "react";
import { FormControl, Select, MenuItem, Box } from "@mui/material";

const TermSelection = ({
  term,
  setTerm,
  setSelectedOption,
  setData,
  setShowContact,
}) => {
  return (
    <FormControl fullWidth>
      <Box>
        <Select
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setSelectedOption(null);
            setData(null);
            setShowContact(false);
          }}
          sx={{
            borderRadius: "1.5em",
            width: "250px",
          }}
        >
          <MenuItem value="3202430">Fall 2024</MenuItem>
          <MenuItem value="3202510">Winter 2025</MenuItem>
          <MenuItem value="3202450">Spring/Summer 2024</MenuItem>
        </Select>
      </Box>
    </FormControl>
  );
};

export default TermSelection;
