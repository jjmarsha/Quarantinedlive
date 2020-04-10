import React from "react";
import { Row , Col, Modal, ModalBody } from "reactstrap";
import Page from "./page";
import Navigation from "../components/navigation/navigation";
import {EntryExamples} from "../components/entry/entryexamples";
import Entry from "../components/entry/entry";
import Filter from "../components/filter/filter"
import EntryForm from "../components/forms/entryform";
import "../styles/formfields.css";
import {withRouter} from "react-router-dom";

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <Page>
                <Navigation modalToggle={this.modalToggle}/>
                <Row>
                    <Col xs="0" md="3">
                        <Filter/>
                    </Col>
                    <Col xs="12" md="9">
                        {
                            EntryExamples.map((entry, key) => {
                                return (
                                    <Entry 
                                        className="mt-3 mb-3 entry-hover-cursor"
                                        entry={entry}
                                        key={key}
                                    />
                                );
                            })
                        }
                    </Col>
                </Row>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    toggle={this.modalToggle}
                >
                    <ModalBody>
                        <EntryForm modalToggle={this.modalToggle}/>
                    </ModalBody>
                </Modal>
            </Page>
        );
    }

    modalToggle = () => {
        this.setState((prevState) => {
            return {
                modalIsOpen: !prevState.modalIsOpen
            }
        });
    }
}

export default withRouter(Homepage);