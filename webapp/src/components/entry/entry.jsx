import React from "react";
import "./entry.css";

const Entry = ({entry, className}) => {
    return(
        <div className={"entry " + className}>
            <p className="entry-text">{entry.title}</p>
            <p className="entry-text">{entry.hostName}</p>
        </div>
    );
}

export default Entry;