import React from "react";
import { Button, CircularProgress } from "@mui/material";

const TrackButton = ({
  handleButtonClick,
  buttonLoading,
  error,
  selectedRows,
  inputRef,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: "2em",
        width: "100px",
        maxWidth: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "1.5em",
        fontWeight: "bold",
      }}
      onClick={handleButtonClick}
      disabled={
        buttonLoading ||
        error ||
        Object.values(selectedRows).every((arr) => arr.length === 0) ||
        (inputRef.current && inputRef.current.value === "")
      }
    >
      {buttonLoading ? <CircularProgress size={20} /> : "Track"}
    </Button>
  );
};

export default TrackButton;
