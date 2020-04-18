import React, { useEffect, useState } from "react";
import "./tag.css";

const Tag = ({ placename, className, onClick, isMobile }) => {
  const [tagstick, setTagstick] = useState(false);

  const handleOnClick = (event) => {
    setTagstick(!tagstick);
    onClick && onClick(event);
  };
  return (
    <div
      onClick={handleOnClick}
      title={placename}
      className={"tag " + (isMobile ? (tagstick ? className : "") : className)}
    >
      {placename}
    </div>
  );
};

export default Tag;
