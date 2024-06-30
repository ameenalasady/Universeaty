import React from "react";
import TermSelection from "./TermSelection";
import CourseAutocomplete from "./CourseAutocomplete";
import SearchButton from "./SearchButton";

const CourseForm = ({
  term,
  setTerm,
  setSelectedOption,
  setData,
  setShowContact,
  selectedOption,
  courseCode,
  setCourseCode,
  loading,
  buttonText,
  handleSubmit,
}) => {
  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit} className="mainForm">
        <TermSelection
          term={term}
          setTerm={setTerm}
          setSelectedOption={setSelectedOption}
          setData={setData}
          setShowContact={setShowContact}
        />

        <CourseAutocomplete
          term={term}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          courseCode={courseCode}
          setCourseCode={setCourseCode}
        />

        <SearchButton
          loading={loading}
          selectedOption={selectedOption}
          buttonText={buttonText}
        />
      </form>
    </div>
  );
};

export default CourseForm;
