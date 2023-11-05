import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
const Autocomplete = ({ options, getOptions }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setActiveOption(0);
    setShowOptions(true);
    setFilteredOptions(options);
  }, [options]);

  const getVal = (e) => {
    setUserInput(() => e.target.value);
    getOptions(e.target.value);
  };

  let optionList = (
    <ul className="options">
      {filteredOptions?.map((option, index) => {
        let className;
        if (index === activeOption) {
          className = "option-active";
        }
        return (
          <li className={className} key={option.id}>
            {option.text}
          </li>
        );
      })}
    </ul>
  );

  let noOptions = (
    <div className="no-options">
      <em>No Option!</em>
    </div>
  );

  return (
    <>
      {" "}
      <div className="search">
        <input type="text" className="search-box" onChange={getVal} />
        <input type="submit" value="" className="search-btn" />
      </div>
      {showOptions &&
        userInput &&
        (filteredOptions && filteredOptions.length > 0
          ? optionList
          : noOptions)}
    </>
  );
};

// Autocomplete.propTypes = {
//   options: PropTypes.instanceOf(Array).isRequired,
// };

export default Autocomplete;
