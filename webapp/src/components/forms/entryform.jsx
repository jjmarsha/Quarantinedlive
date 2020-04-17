import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Tooltip,
  Input,
  Button,
  Col,
  Row,
} from "reactstrap";
import Topics from "../../lists/topics";
import Language from "../../lists/languages";
import CustomDropdown from "../filter/dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ParseUTCToBackend } from "../../lists/daterefs";
import axios from "axios";
import "../../styles/common.css";

/*
    I made the horrible mistake of writing this as a functional component
    Whoever sees this in the future, please change it to a class component
    This thing hurts my ass.
    Also, if you have the time, please change this to typescript.
    Interfaces would save hella time
    Also there should be a way to just get form data 
    just by doing formDate = new FormData(document.getElementId("form") as HTMLFormElement)
*/

const EntryForm = (props) => {
  const [title, setTitle] = useState("");
  const [hostname, setHostName] = useState("");
  const [topic1, setTopic1] = useState(undefined);
  const [topic2, setTopic2] = useState(undefined);
  const [topic3, setTopic3] = useState(undefined);
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [language, setLanguage] = useState("English");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(undefined);

  const [addImageToggle, setAddImageToggle] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [hostnameError, setHostNameError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const submitForm = () => {
    if (!validateForm()) return;
    const parsedDate = ParseUTCToBackend(date.toString(), time.toString());
    const Topics = [];
    if (topic1) Topics.push(topic1);
    if (topic2) Topics.push(topic2);
    if (topic3) Topics.push(topic3);
    const entry = {
      title: title,
      nameofhost: hostname,
      email_of_host: email,
      topics: Topics,
      link: link,
      language: language,
      time: parsedDate,
      description: description,
      image_url: image,
      type: type,
    };
    axios
      .post("https://quarantined.azurewebsites.net/api/Event/", entry, {})
      .then((resp) => {
        props.modalToggle();
        window.location.reload();
      });
  };

  const validateForm = () => {
    let errors = false;
    if (!title) {
      setTitleError(true);
      errors = true;
    } else setTitleError(false);
    if (!hostname) {
      setHostNameError(true);
      errors = true;
    } else setHostNameError(false);
    if (!link) {
      setLinkError(true);
      errors = true;
    } else setLinkError(false);
    if (!language) {
      setLanguageError(true);
      errors = true;
    } else setLanguageError(false);
    if (!date) {
      setDateError(true);
      errors = true;
    } else setDateError(false);
    if (!description) {
      setDescriptionError(true);
      errors = true;
    } else setDescriptionError(false);
    if (
      !email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setEmailError(true);
      errors = true;
    } else setEmailError(false);
    return !errors;
  };

  return (
    <Form className="mt-3 ml-1 mr-1 mb-2" id="entry-submission-form">
      <FormGroup>
        <Input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          invalid={titleError}
        />
        <FormFeedback>Please enter a title for your event</FormFeedback>
      </FormGroup>
      <Row>
        <Col md="6">
          <FormGroup>
            <Input
              placeholder="Name of Host"
              onChange={(e) => setHostName(e.target.value)}
              value={hostname}
              invalid={hostnameError}
            />
            <FormFeedback>Please enter the name of the host</FormFeedback>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Input
              type="email"
              className="text-muted"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              invalid={emailError}
            />
            <FormFeedback>Please enter a valid email</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <FormGroup>
            <CustomDropdown
              list={Topics}
              placeholder="Topic"
              onChange={(e) => setTopic1(e.target.value)}
              value={topic1}
            />
          </FormGroup>
        </Col>
        {/* <Col md="4">
          <FormGroup>
            <CustomDropdown
              list={Topics}
              placeholder="Topics..."
              onChange={(e) => setTopic2(e.target.value)}
              value={topic2}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <CustomDropdown
              list={Topics}
              placeholder="Topics..."
              onChange={(e) => setTopic3(e.target.value)}
              value={topic3}
            />
          </FormGroup>
        </Col> */}
      </Row>
      {/* <FormGroup>
        <Input
          placeholder="Type of Event"
          className=""
          onChange={(e) => setType(e.target.value)}
          value={type}
        />
      </FormGroup> */}
      <Row>
        <Col md="12">
          <FormGroup>
            <Input
              placeholder="Link to the event"
              className="text-muted"
              onChange={(e) => setLink(e.target.value)}
              value={link}
              invalid={linkError}
            />
            <FormFeedback>Please provide a link to the event</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="6" md="4">
          <FormGroup>
            <DatePicker
              id="date-picker"
              className={
                "w-100 rounded pl-2 text-muted input-field-height input-field-grey-border " +
                (dateError ? "border-danger" : "input-field-grey-border")
              }
              wrapperClassName="w-100"
              autoComplete="off"
              placeholderText="Select date"
              selected={date}
              onChange={(date) => setDate(date)}
            />
            <Input hidden invalid={dateError} autocomplete="off" />
            <FormFeedback>Select a date</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="6" md="4">
          <FormGroup>
            <Input
              type="time"
              placeholder="Time"
              className="text-muted"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup>
            <CustomDropdown
              list={Language}
              placeholder="Language"
              invalid={languageError}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <Input hidden invalid={languageError} />
            <FormFeedback>Select a language</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Input
          type="textarea"
          rows={4}
          placeholder="Description"
          invalid={descriptionError}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <FormFeedback>Please provide a short description</FormFeedback>
      </FormGroup>

      <Row>
        <Col sm="4" className="pt-2 h-100">
          <div
            className="mb-auto mt-auto hover-pointer"
            onClick={() => setAddImageToggle(!addImageToggle)}
          >
            <i
              className={
                "fa text-primary " +
                (addImageToggle ? "fa-minus-circle " : "fa-plus-circle")
              }
              style={{ fontSize: "15px" }}
            />
            &nbsp;&nbsp;Add Image
          </div>
        </Col>
        {addImageToggle ? (
          <Col md="8" className="h-100">
            <Input
              type="text"
              placeholder="Link to an image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </Col>
        ) : null}
      </Row>
      <div className="float-right pt-3">
        <Button className="mr-1" onClick={props.modalToggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={submitForm}>
          Qioo it!
        </Button>
      </div>
    </Form>
  );
};

export default EntryForm;
