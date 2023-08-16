import React, { useState } from "react";
import "./App.css";
import courses3202330 from "./3202330.json";
import courses3202340 from "./3202340.json";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Autocomplete,
  MenuItem,
  Select,
  Modal,
  Box,
  Typography,
  createFilterOptions,
  Tooltip,
} from "@mui/material";

document.title = "Universeaty";

const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

function App() {
  const [courseCode, setCourseCode] = useState("");
  const [term, setTerm] = useState("3202330");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSelectedSection(null);

    // Send a request to the Flask API
    const response = await fetch(
      `https://redirect-to-raspberry-pi.vercel.app/open_seats?course_code=${courseCode}&term=${term}`
    );
    const json = await response.json();

    // Update the data state variable with the result
    setData(json);
    setLoading(false);
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleContactInfoChange = (event) => {
    setContactInfo(event.target.value);
    if (contactMethod === "email") {
      setError(!isValidEmail(event.target.value));
    } else if (contactMethod === "phone") {
      setError(!isValidPhone(event.target.value));
    }
  };

  const handleButtonClick = async () => {
    setButtonLoading(true);
    if (!error) {
      const response = await fetch(
        `https://redirect-to-raspberry-pi.vercel.app/notify_open_seats?course_code=${courseCode}&term=${term}&section=${selectedSection}&contact_method=${contactMethod}&contact_info=${contactInfo}`
      );
      if (response.status === 200) {
        setOpen(true);
      } else if (response.status === 400) {
        const reason = await response.text();
        setReason(reason);
        setOpen(true);
      }
    }
    setButtonLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setReason(null);
  };

  const OPTIONS_LIMIT = 30;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
    matchFrom: "any",
    stringify: (option) =>
      option.Text + " " + option.Text.replace("-", " ") + " " + option.Info,
  });

  return (
    <div className="maincontainer">
      <div className="titlecontainer">
        <div className="titletext">
          <p className="welcometo">Welcome To</p>
          <p className="universeaty" style={{ color: "black" }}>
            UNIVER<span style={{ color: "maroon" }}>SEAT</span>Y
          </p>
        </div>
      </div>
      <div className="startby">Start By Searching Your Course:</div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit} className="mainForm">
          <FormControl component="fieldset">
            <Box>
              <RadioGroup
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="3202330"
                  control={<Radio />}
                  label="Fall 2023"
                  sx={{ margin: "0" }}
                />

                <FormControlLabel
                  value="3202340"
                  control={<Radio />}
                  label="Winter 2024"
                  sx={{ margin: "0" }}
                />
              </RadioGroup>
            </Box>
          </FormControl>

          <Autocomplete
            filterOptions={filterOptions}
            options={term === "3202330" ? courses3202330 : courses3202340}
            getOptionLabel={(option) => option.Text}
            renderOption={(props, option) => (
              <li {...props}>
                {option.Text} - {option.Info}
              </li>
            )}
            value={selectedOption}
            onChange={(event, newValue) => {
              setSelectedOption(newValue);
              setCourseCode(newValue ? newValue.Text : "");
            }}
            inputValue={courseCode}
            onInputChange={(event, newInputValue) => {
              setCourseCode(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Course Code" />
            )}
            sx={{ marginBottom: "1em", marginTop: "1em" }}
          />

          <div className="submitcontainer">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ minWidth: "30%" }}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="tablecontainer">
        {data && (
          <>
            <div className="explain">
              Now Pick Which Section You Want To Track:
            </div>
            <div className="bottomleft">
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontSize: "1.2em" }}>
                      Lectures
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "1.2em" }}>
                      Labs
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "1.2em" }}>
                      Tutorials
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {data.LEC.sort((a, b) =>
                        a.section.localeCompare(b.section)
                      ).map((lec) => (
                        <div key={lec.key}>
                          <Button
                            style={{ fontSize: "1.5em" }}
                            disabled={lec.open_seats !== 0}
                            onClick={() => {
                              setSelectedSection(lec.section);
                              setTimeout(() => {
                                scrollToBottom();
                              }, 200);
                            }}
                          >
                            {lec.section}
                          </Button>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell>
                      {data.LAB.sort((a, b) =>
                        a.section.localeCompare(b.section)
                      ).map((lab) => (
                        <div key={lab.key}>
                          <Button
                            style={{ fontSize: "1.5em" }}
                            disabled={lab.open_seats !== 0}
                            onClick={() => {
                              setSelectedSection(lab.section);
                              setTimeout(() => {
                                scrollToBottom();
                              }, 200);
                            }}
                          >
                            {lab.section}
                          </Button>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {data.TUT.sort((a, b) =>
                        a.section.localeCompare(b.section)
                      ).map((tut) => (
                        <div key={tut.key}>
                          <Button
                            style={{ fontSize: "1.5em" }}
                            disabled={tut.open_seats !== 0}
                            onClick={() => {
                              setSelectedSection(tut.section);
                              setTimeout(() => {
                                scrollToBottom();
                              }, 200);
                            }}
                          >
                            {tut.section}
                          </Button>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>

      <div className="bottomright">
        {selectedSection && (
          <>
            <div className="howcontact">
              How Would You Like To Be Contacted?
            </div>

            <h2>Track Section: {selectedSection}</h2>
            <Select
              value={contactMethod}
              onChange={(event) => setContactMethod(event.target.value)}
              sx={{
                width: "50%",
                maxWidth: "200px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "1em",
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
            {contactMethod && (
              <>
                <TextField
                  label={contactMethod === "email" ? "Email" : "Phone"}
                  value={contactInfo}
                  onChange={handleContactInfoChange}
                  placeholder={
                    contactMethod === "email"
                      ? "example@example.com"
                      : "1234567890"
                  }
                  sx={{ width: "80%", maxWidth: "400px" }}
                  error={error}
                  helperText={error && `Invalid ${contactMethod}`}
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "2em",
                    width: "30%",
                    maxWidth: "100px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={handleButtonClick}
                  disabled={buttonLoading}
                >
                  {buttonLoading ? <CircularProgress size={24} /> : "Track"}
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
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {reason ? "Error" : "Success!"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {reason ? reason : "Your request was made successfully."}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </Box>
                </Modal>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
