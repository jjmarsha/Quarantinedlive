import React from "react";
import { Row , Col, Modal, ModalBody, Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap";
import Page from "./page";
import Navigation from "../components/navigation/navigation";
import {EntryExamples} from "../components/entry/entryexamples";
import Entry from "../components/entry/entry";
import "../styles/formfields.css";

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
                    </Col>
                    <Col xs="12" md="9">
                        {
                            EntryExamples.map((entry, key) => {
                                return (
                                    <Entry entry={entry} className="mt-3 mb-3"/>
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
                        <Form className="mt-3 ml-1 mr-1 mb-2">
                            <FormGroup>
                                <Input placeholder="Title" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Name of Host" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Topics" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Type of Event" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Link" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Language" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Date" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Time" className="circular-input-field"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" rows={3} placeholder="Description" className="circular-input-field"/>
                            </FormGroup>
                            <div className="float-right">
                                <Button className="mr-1" onClick={this.modalToggle}>Cancel</Button>
                                <Button 
                                    color="primary"
                                    onClick={this.modalToggle}
                                >
                                    Submit Event
                                </Button>
                            </div>
                        </Form>
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

export default Homepage;