import React from "react";
import "./tag.css";

const Tag = ({ placename, className, onClick }) => {
  return (
    <div onClick={onClick} title={placename} className={"tag " + className}>
      {placename}
    </div>
  );
};

export default Tag;
