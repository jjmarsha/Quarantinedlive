import React from "react";
import "./tag.css";

const Tag = ({placename, className}) => {
    return(
        <div className={"tag " + className}>
            {placename}
        </div>
    )
}

export default Tag;