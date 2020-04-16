import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import "../../styles/formfields.css";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const submitSearch = () => {
    let url = "?keywords=";
    // const keywords = search.split(" ");
    // for (const keyword of keywords) {
    //   url += keyword + ",";
    // }
    // const newURL = url.slice(0, -1);
    props.history.push(`/${search}`);
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder=" Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={submitSearch}>
            <i className="fa fa-search" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default withRouter(SearchBar);
