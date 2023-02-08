import React from "react";
import Helmet from "react-helmet";

// basically whichever page we import this component in, it'll have access to the page title that we pass to the component
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;