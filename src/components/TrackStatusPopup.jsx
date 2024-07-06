import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const TrackStatusPopup = ({ open, handleClose, reason }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} onKeyDown={handleKeyDown}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20%",
          minWidth: "250px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ color: "white" }}
        >
          {reason ? "Error" : "Success!"}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ color: "white" }}
        >
          {reason ? reason : "Your request was made successfully."}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{ borderRadius: "1.5em" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TrackStatusPopup;
