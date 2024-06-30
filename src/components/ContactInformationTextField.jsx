import React from "react";
import { TextField } from "@mui/material";

const ContactInformationTextField = ({
  contactMethod,
  handleContactInfoChange,
  error,
  handleButtonClick,
  inputRef,
}) => {
  return (
    <TextField
      label={contactMethod === "email" ? "Email" : "Phone"}
      onChange={handleContactInfoChange}
      placeholder={
        contactMethod === "email" ? "example@example.com" : "1234567890"
      }
      sx={{
        width: "80%",
        maxWidth: "400px",
      }}
      InputProps={{ sx: { borderRadius: "1.5em" } }}
      error={error}
      helperText={error && `Invalid ${contactMethod}`}
      inputRef={inputRef}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleButtonClick();
        }
      }}
    />
  );
};

export default ContactInformationTextField;
