import React from "react";

const ProblematicComponent = ({ shouldThrowError }) => {
  if (shouldThrowError) {
    throw new Error("This is an intentional error for testing!"); //  Throw an error if the 'shouldThrowError' prop is true.
  }

  return <div>This component is working fine.</div>;
};

export default ProblematicComponent;
