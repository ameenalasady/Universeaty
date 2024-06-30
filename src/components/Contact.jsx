import React from "react";
import ContactMethodSelect from "./ContactMethodSelect";
import ContactForm from "./ContactForm";

const Contact = ({
  showContact,
  contactMethod,
  setContactMethod,
  handleContactInfoChange,
  error,
  inputRef,
  buttonLoading,
  selectedRows,
  handleButtonClick,
  open,
  handleClose,
  reason,
}) => (
  <div className="bottomright">
    {showContact && (
      <>
        <div className="howcontact">How would you like to be contacted?</div>

        <ContactMethodSelect
          contactMethod={contactMethod}
          setContactMethod={setContactMethod}
        />

        <ContactForm
          contactMethod={contactMethod}
          handleContactInfoChange={handleContactInfoChange}
          error={error}
          inputRef={inputRef}
          buttonLoading={buttonLoading}
          selectedRows={selectedRows}
          handleButtonClick={handleButtonClick}
          open={open}
          handleClose={handleClose}
          reason={reason}
        />
      </>
    )}
  </div>
);

export default Contact;
