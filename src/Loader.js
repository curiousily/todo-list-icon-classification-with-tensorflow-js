import React from "react";

import { Spinner } from "react-rainbow-components";

const Loader = ({ text }) => (
  <div className="rainbow-background-color_white rainbow-align-content_center rainbow-position_relative rainbow-p-vertical_xx-large">
    <Spinner size="large" />
    <h1 className="rainbow-color_brand rainbow-font-size-text_medium rainbow-p-top_xx-large rainbow-m-top_x-large">
      {text}
    </h1>
  </div>
);

export default Loader;
