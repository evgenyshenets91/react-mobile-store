import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const Loader = () => {
  return (
    <div className="lds-css ng-scope ">
      <div className="lds-double-ring middle">
        <div />
        <div />
      </div>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
