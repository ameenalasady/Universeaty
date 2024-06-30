import React from "react";
import { Select, MenuItem, Tooltip } from "@mui/material";

const ContactMethodSelect = ({ contactMethod, setContactMethod }) => {
  return (
    <Select
      value={contactMethod}
      onChange={(event) => setContactMethod(event.target.value)}
      sx={{
        width: "50%",
        maxWidth: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "1em",
        borderRadius: "1.5em",
      }}
    >
      <MenuItem value="email">Email</MenuItem>
      <Tooltip title="Coming Soon">
        <span>
          <MenuItem value="phone" disabled>
            Phone
          </MenuItem>
        </span>
      </Tooltip>
    </Select>
  );
};

export default ContactMethodSelect;
