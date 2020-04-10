import React from "react";
import { Row , Col, Button } from "reactstrap";
import Tag from "../tag/tag";
import Topics from "../../lists/topics";

class TrendingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        }
    }

    render() {
        
        if(this.props.isMobile) {
            return(
                <Row className="mt-3">         
                    <Col xs="0" md="12" lg="2" className="d-flex justify-content-end">
                        <Button 
                            onClick={this.props.modalToggle}
                            className="mt-auto mb-auto w-100 d-flex justify-content-between"
                        >
                            Add New	&nbsp;
                            <i className="mt-auto mb-auto fa fa-plus"/>
                        </Button>
                    </Col>
                </Row>
            );
        } else {
            return(
                <Row className="mt-3 border-bottom pb-3">
                    <Col xs="0" md="12" lg="10" className="d-flex justify-content-left ">
                        <p className="font-weight-light ml-0 mr-2"
                            style={{
                                fontSize: "20px",
                                margin: "auto",
                                }}>
                                Trending Now
                        </p>
                        <div className="d-flex justify-content-start flex-wrap">
                            {
                                Topics.map((topics, key) => {
                                    return (
                                        <div className="mt-auto mb-auto p-1" key={key}>
                                            <Tag placename={topics} className="tag-normal"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col xs="0" md="12" lg="2" className="d-flex justify-content-end">
                        <Button 
                            onClick={this.props.modalToggle}
                            className="float-right mt-auto mb-auto"
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