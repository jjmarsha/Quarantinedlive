import React, { useState } from "react";
import { Form, InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import "../../styles/formfields.css";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    let url = "";
    const keywords = search.split(" ");
    for (const keyword of keywords) {
      url += keyword + ",";
    }
    const newURL = url.slice(0, -1);
    props.history.push(`/?keywords=${newURL}`);
  };
  return (
    <div>
      <Form onSubmit={submitSearch}>
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
      </Form>
    </div>
  );
};

export default withRouter(SearchBar);
