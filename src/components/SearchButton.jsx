import React from "react";
import { Button, CircularProgress } from "@mui/material";

const SearchButton = ({ loading, selectedOption, buttonText }) => {
  return (
    <div className="submitcontainer">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || selectedOption === null}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{
          minWidth: "100px",
          borderRadius: "1.5em",
          fontWeight: "bold",
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default SearchButton;
