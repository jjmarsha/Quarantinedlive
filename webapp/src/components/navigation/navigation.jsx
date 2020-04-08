import React from "react";
import SearchBar from "../searchbar/searchbar";
import { Row , Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import TrendingSection from "./trendingsection"


class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <>
                <Row>
                    <Col xs="12" md="1">
                        <img 
                            alt="" 
                            src="https://previews.123rf.com/images/rainart123/rainart1231610/rainart123161000140/67579157-drone-logo-vector.jpg"
                            style={{height: "40px"}}/>
                    </Col>
                    <Col xs="12" md="11" lg="11">
                        <SearchBar/>
                    </Col>
                </Row>
                <TrendingSection modalToggle={this.props.modalToggle}/>
            </>
        );
    }
}

export default Navigation;