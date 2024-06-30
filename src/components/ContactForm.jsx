import React from "react";

import ContactInformationTextField from "./ContactInformationTextField";
import TrackButton from "./TrackButton";
import TrackStatusPopup from "./TrackStatusPopup";

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
        <ContactInformationTextField
          contactMethod={contactMethod}
          handleContactInfoChange={handleContactInfoChange}
          error={error}
          handleButtonClick={handleButtonClick}
          inputRef={inputRef}
        />

        <TrackButton
          handleButtonClick={handleButtonClick}
          buttonLoading={buttonLoading}
          error={error}
          selectedRows={selectedRows}
          inputRef={inputRef}
        />

        <TrackStatusPopup
          open={open}
          handleClose={handleClose}
          reason={reason}
        />
      </>
    )
  );
};

export default ContactForm;
