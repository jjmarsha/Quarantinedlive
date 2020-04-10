import React from "react";
import { InputGroup, InputGroupAddon, Button, Input} from "reactstrap";
import "../../styles/formfields.css";


const SearchBar = (props) => {
    return(
        <div>
            <InputGroup>
                <Input placeholder=" Search"/>
                <InputGroupAddon addonType="append">
                    <Button>
                        <i className="fa fa-search"/>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default SearchBar;
