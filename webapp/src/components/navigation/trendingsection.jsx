import React from "react";
import { Row , Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import {TrendingExamples} from "./trending"

class TrendingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        const isMobile = (this.state.width <= 700);
        if(isMobile) {
            return(
                <>
                    <Row>
                        <Col xs="12">
                            <Button 
                                onClick={this.props.modalToggle}
                                className="d-flex justify-content-between w-100 mt-4"
                            >
                                Add New
                                <i className="fa fa-plus mt-auto mb-auto"/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="d-flex justify-content-between mt-3">
                            <u>Trending Topics</u>
                            <u>Filters</u>
                        </Col>
                    </Row>
                </>
            );
        } else {
            return(
                <Row className="mt-3 border-bottom pb-3">
                    <Col xs="0" md="10" className="d-flex justify-content-left ">
                        <p className="font-weight-light ml-0 mr-2"
                            style={{
                                fontSize: "20px",
                                margin: "auto",
                                }}>
                                Trending Now
                        </p>
                        <div className="d-flex justify-content-space-between">
                            {
                                TrendingExamples.map((text, key) => {
                                    return (
                                        <div className="m-auto pl-1 pr-1">
                                            <Tag placename={text}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col xs="0" md="2">
                        <Button 
                            onClick={this.props.modalToggle}
                            className="float-right"
                        >
                            Add New	&nbsp;
                            <i className="fa fa-plus"/>
                        </Button>
                    </Col>
                </Row>
            )
        }
    }
}

export default TrendingSection;