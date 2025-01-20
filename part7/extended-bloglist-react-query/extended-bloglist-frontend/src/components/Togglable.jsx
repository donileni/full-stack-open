import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{padding: 5}}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>
          {props.buttonLable}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
