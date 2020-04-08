import React from "react";
import { InputGroup, InputGroupAddon, Button, Input} from "reactstrap";
import "../../styles/formfields.css";


const SearchBar = (props) => {
    return(
        <div>
            <InputGroup>
                <Input className="circular-input-field-left" placeholder=" Search"/>
                <InputGroupAddon addonType="append">
                    <Button className="circular-input-field-button-right">
                        <i className="fa fa-search"/>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default SearchBar;
