import React from "react";
import { Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap";

const EntryForm = (props) =>{
    return(
        <Form className="mt-3 ml-1 mr-1 mb-2">
            <FormGroup>
                <Input placeholder="Title" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Name of Host" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Topics" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Type of Event" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Link" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Language" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Date" className=""/>
            </FormGroup>
            <FormGroup>
                <Input placeholder="Time" className=""/>
            </FormGroup>
            <FormGroup>
                <Input type="textarea" rows={3} placeholder="Description" className=""/>
            </FormGroup>
            <div className="float-right">
                <Button className="mr-1" onClick={props.modalToggle}>Cancel</Button>
                <Button 
                    color="primary"
                    onClick={props.modalToggle}
                >
                    Submit Event
                </Button>
            </div>
        </Form>
    );
}

export default EntryForm;