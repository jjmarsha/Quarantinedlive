import React from "react";
import "./tag.css";

const Tag = (props) => {
    return(
        <div className="tag">
            {props.placename}
        </div>
    )
}

export default Tag;