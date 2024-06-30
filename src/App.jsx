import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import ThemeProvider from "./components/ThemeProvider";
import Footer from "./components/Footer";
import CourseForm from "./components/CourseForm";
import TitleLogo from "./components/TitleLogo";
import UniverseatyInfo from "./components/UniverseatyInfo";
import GetStarted from "./components/GetStarted";
import Contact from "./components/Contact";
import CoursePicker from "./components/CoursePicker";

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
  const [term, setTerm] = useState("3202430");
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

    // Get the first returned object
    const firstObject = Object.values(json)[0];

    // Update the data state variable with the result
    setData(firstObject);
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
      const fetchWithTimeout = (url, options, timeout = 5000) => {
        return Promise.race([
          fetch(url, options),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), timeout)
          ),
        ]);
      };
      try {
        const response = await fetchWithTimeout(
          `https://redirect-to-raspberry-pi.vercel.app/notify_open_seats?course_code=${courseCode}&term=${term}&section=${selectedSectionsString}&contact_method=${contactMethod}&contact_info=${inputRef.current.value}`
        );
        if (response.status === 200) {
          setOpen(true);
          setButtonLoading(false);
        } else if (response.status === 400) {
          const reason = await response.text();
          setReason(reason);
          setOpen(true);
          setButtonLoading(false);
        } else if (response.status === 429) {
          setReason(
            "Too many requests. Current limit is 10 requests per hour."
          );
          setOpen(true);
          setButtonLoading(false);
        }
      } catch (error) {
        if (error.message === "timeout") {
          console.log("Fetch timed out. Retrying...");
          handleButtonClick();
        } else {
          throw error;
        }
      }
    } else {
      setButtonLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setReason(null);
  };

  return (
    <ThemeProvider>
      <TitleLogo />

      <UniverseatyInfo />

      <GetStarted />

      <CourseForm
        term={term}
        setTerm={setTerm}
        setSelectedOption={setSelectedOption}
        setData={setData}
        setShowContact={setShowContact}
        selectedOption={selectedOption}
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        loading={loading}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
      />

      <CoursePicker data={data} setSelectedRows={setSelectedRows} />

      <Contact
        showContact={showContact}
        contactMethod={contactMethod}
        setContactMethod={setContactMethod}
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
      <Footer />
    </ThemeProvider>
  );
}

export default App;
