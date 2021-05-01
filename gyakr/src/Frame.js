import React from "react";

const Frames = ({ color, text, children }) => {
  return (
    <div className={color}>
      <div>{text}</div>
      {children}
    </div>
  );
};
export default Frames;
