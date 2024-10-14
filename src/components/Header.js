import React from "react";
import Button from "./Button";
// import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  // const onClick = () => {
  //   console.log("clicked");
  // };
  return (
    <header className="header">
      {/*  this is  the example of  inline style */}
      {/* <h1 style={{ color: "pink", backgroundColor: "yellow" }}>Task Tracker</h1>

         ------This is object style with single curly braces
      <h1 style={styleobject}>Task Tracker</h1> */}
      <h1>{title}</h1>
      {/* you can reusable component with different props */}
      {/* <Button text="Add" color="green" /> */}
      {location.pathname === "/" && (
        <Button
          text={showAdd ? "close" : "Add"}
          color={showAdd ? "red" : "green"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

//  this is use for set the default props
Header.defaultProps = {
  title: "Task Tracker",
};

//  this is set for the props types you can set string , or number
// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };

//  you can also create style object

// const styleobject = {
//   color: "green",
//   backgroundColor: "yellow",
// };

export default Header;
