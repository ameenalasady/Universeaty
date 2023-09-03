import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import courses3202330 from "./3202330.json";
import courses3202340 from "./3202340.json";
import { ReactComponent as Logo } from "./logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TextField,
  Button,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b8004d",
    },
  },
});

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
  const [selectedSections, setSelectedSections] = useState(null);
  const [contactMethod, setContactMethod] = useState("email");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Search");
  const [selectedRows, setSelectedRows] = useState({});
  const [showContact, setShowContact] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const allSelectedRows = Object.values(selectedRows).flat();
    setSelectedSections(allSelectedRows);
  }, [selectedRows]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSelectedSections(null);
    setSelectedRows({}); // Add this line to reset the selected rows

    // Send a request to the Flask API
    const response = await fetch(
      `https://redirect-to-raspberry-pi.vercel.app/open_seats?course_code=${courseCode}&term=${term}`
    );
    if (response.status === 400) {
      setLoading(false);
      setButtonText("Bad Response");
      return;
    }
    if (response.status === 429) {
      setLoading(false);
      setButtonText("Too Many Requests");
      return;
    }

    // Reset the button text to normal if status is not 400 or 429
    setButtonText("Search");

    const json = await response.json();

    // Update the data state variable with the result
    setData(json);
    setLoading(false);
    setSelectedSections(true);
    setShowContact(true);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setButtonText("Timeout");
        setLoading(false);
      }
    }, 6000);
    return () => clearTimeout(timeout);
  }, [loading]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleContactInfoChange = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (contactMethod === "email") {
        setError(!isValidEmail(value));
      } else if (contactMethod === "phone") {
        setError(!isValidPhone(value));
      }
    }
  };

  const handleButtonClick = async () => {
    setButtonLoading(true);
    if (!error) {
      const selectedSectionsString = encodeURIComponent(
        JSON.stringify(selectedSections)
      );
      const response = await fetch(
        `https://redirect-to-raspberry-pi.vercel.app/notify_open_seats?course_code=${courseCode}&term=${term}&section=${selectedSectionsString}&contact_method=${contactMethod}&contact_info=${inputRef.current.value}`
      );
      if (response.status === 200) {
        setOpen(true);
      } else if (response.status === 400) {
        const reason = await response.text();
        setReason(reason);
        setOpen(true);
      } else if (response.status === 429) {
        setReason("Too many requests. Current limit is 10 requests per hour.");
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

  const columns = React.useMemo(
    () => [
      {
        field: "section",
        headerName: "Section",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "key",
        headerName: "Key",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "open_seats",
        headerName: "Open Seats",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="maincontainer">
        <div className="titlecontainer">
          <div className="titletext">
            <a href="https://www.universeaty.ca/" className="logolink">
              <Logo className="logosvg" />
            </a>
          </div>
        </div>
        <div className="modivcontainer">
          <div className="modiv">
            <div className="moimgcontainer">
              <img className="moimg" src="template.png" alt="templateimg" />
            </div>

            <div className="motext">
              <h1 class="heading">
                Get instant notifications when a seat opens in full classes,{" "}
                <span class="highlighted_word">for free</span>
              </h1>
              <p class="paragraph">
                Receive instant notifications in your email whenever a seat is
                available in your classes.
              </p>
            </div>
          </div>
        </div>

        <div class="getstartedcontainer">
          <h className="getstarted">Get Started</h>
          <img
            class="startedarrow"
            src="/arrow-sm-right-svgrepo-com.svg"
            alt="alternative_text"
          ></img>
        </div>

        <div className="formcontainer">
          <form onSubmit={handleSubmit} className="mainForm">
            <FormControl component="fieldset">
              <Box>
                <RadioGroup
                  value={term}
                  onChange={(event) => {
                    setTerm(event.target.value);
                    setSelectedOption(null);
                    setData(null); // Clear the data state here
                    setShowContact(false);
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  <FormControlLabel
                    value="3202330"
                    control={<Radio />}
                    label="Fall 2023"
                  />

                  <FormControlLabel
                    value="3202340"
                    control={<Radio />}
                    label="Winter 2024"
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
                <TextField
                  {...params}
                  label="Course Code"
                  InputProps={{
                    ...params.InputProps,
                    sx: { borderRadius: "1.5em" },
                  }}
                />
              )}
              sx={{ marginBottom: "1em", marginTop: "1em" }}
            />

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
          </form>
        </div>

        <div className="tablecontainer">
          {data && (
            <>
              <div className="explain">
                Pick which sections you want to track:
              </div>
              <>
                {Object.keys(data).map((key) => {
                  if (data[key].length > 0) {
                    return (
                      <Accordion key={key}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{key}</Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{ height: "auto" }}>
                          <div style={{ height: "auto", width: "100%" }}>
                            <DataGrid
                              state={{
                                keyboard: {
                                  cell: null,
                                  columnHeader: null,
                                  isMultipleKeyPressed: false,
                                },
                              }}
                              // autoHeight
                              disableColumnMenu={true}
                              sx={{
                                width: "100%",
                                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                                  {
                                    display: "none",
                                  },
                              }}
                              rows={data[key]}
                              columns={columns}
                              checkboxSelection
                              getRowId={(row) => row.key}
                              isRowSelectable={(params) =>
                                params.row.open_seats < 1
                              } // changed from params.row.open_seats === 0
                              headerSelection={false}
                              getCellClassName={
                                (params) =>
                                  params.row.open_seats > 0
                                    ? "unselectable"
                                    : "" // changed from params.row.open_seats !== 0
                              }
                              sortModel={[
                                {
                                  field: "section",
                                  sort: "asc",
                                },
                              ]}
                              onRowSelectionModelChange={(newSelection) => {
                                const selectedRowsForKey = newSelection.map(
                                  (rowId) => {
                                    // Find the row data for the selected row ID
                                    const rowData = data[key].find(
                                      (row) => row.key === rowId
                                    );
                                    // Return an array containing the type, section, and key of the selected row
                                    return [key, rowData.section, rowData.key];
                                  }
                                );
                                setSelectedRows((prevSelectedRows) => {
                                  const updatedSelectedRows = {
                                    ...prevSelectedRows,
                                    [key]: selectedRowsForKey,
                                  };
                                  // console.log(updatedSelectedRows); // Added line to print the updated selectedRows object
                                  return updatedSelectedRows;
                                });
                              }}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return null;
                })}
              </>
            </>
          )}
        </div>

        <div className="bottomright">
          {showContact && (
            <>
              <div className="howcontact">
                How would you like to be contacted?
              </div>

              {/* <h2>Track Section: {selectedSections}</h2> */}
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
              {contactMethod && (
                <>
                  <TextField
                    label={contactMethod === "email" ? "Email" : "Phone"}
                    onChange={handleContactInfoChange}
                    placeholder={
                      contactMethod === "email"
                        ? "example@example.com"
                        : "1234567890"
                    }
                    sx={{
                      width: "80%",
                      maxWidth: "400px",
                    }}
                    InputProps={{ sx: { borderRadius: "1.5em" } }}
                    error={error}
                    helperText={error && `Invalid ${contactMethod}`}
                    inputRef={inputRef}
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
                      Object.values(selectedRows).every(
                        (arr) => arr.length === 0
                      ) ||
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
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {reason ? "Error" : "Success!"}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {reason
                          ? reason
                          : "Your request was made successfully."}
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
              )}
            </>
          )}
        </div>
      </div>

      <footer className={`footer ${!data ? "fixed-footer" : ""}`}>
        <div className="footercontainer">
          <p className="footer-paragraph2">This tool is fully open source.</p>
          <p className="footer-paragraph3">
            Check out the{" "}
            <a
              href="https://github.com/ameenalasady/Universeaty"
              target="_blank"
            >
              GitHub repository
            </a>{" "}
            for more information.
          </p>

          <p className="footer-paragraph1">© 2023 universeaty.ca</p>
        </div>
      </footer>

      {/* <div className="backgroundblob">
        <img src="/blob.png" alt="background" />
      </div> */}
    </ThemeProvider>
  );
}

export default App;
