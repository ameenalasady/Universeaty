import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Modal,
  Box,
  Typography,
} from "@mui/material";

const ContactForm = ({
  contactMethod,
  handleContactInfoChange,
  error,
  inputRef,
  buttonLoading,
  selectedRows,
  handleButtonClick,
  open,
  handleClose,
  reason,
}) => {
  return (
    contactMethod && (
      <>
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

        <Modal open={open} onClose={handleClose}>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {reason ? "Error" : "Success!"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
      </>
    )
  );
};

export default ContactForm;
