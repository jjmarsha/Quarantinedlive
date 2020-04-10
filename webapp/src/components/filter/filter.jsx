import React from "react";
import { Row, Col, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { Date, ChosenFilters } from "./filtersExamples";
import Language from "../../lists/languages";
import Topics from "../../lists/topics";
import Tag from "../tag/tag";
import "./filter.css";

const modifiers = {
    setMaxHeight: {
        enabled: true,
        order: 890,
        fn: (data) => {
        return {
            ...data,
            styles: {
            ...data.styles,
            overflow: 'auto',
            maxHeight: '200px',
            },
        };
        },
    },
}

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicIsOpen: false,
            dateIsOpen: false,
            languageIsOpen: false,
            tags: []
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <Row className="mt-2 text-left">
                <Col md="12">
                    <Row>
                        <Col md="12">
                            <div style={{fontSize: "20px", fontWeight: 300}}>Filters</div>
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-4">
                        <Col md="12">
                            <Dropdown isOpen={this.state.topicIsOpen} toggle={this.toggleTopics} direction="down">
                                <DropdownToggle className="topic w-100 d-flex justify-content-between m-auto align-items-center" caret>
                                    Topics
                                </DropdownToggle>
                                <DropdownMenu
                                    className="w-100"
                                    modifiers={modifiers}>
                                    {Topics.map((topic, key) =>{
                                        return <DropdownItem title={topic} onClick={this.addFilter} key={key}>{topic}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col md="12">
                            <Dropdown isOpen={this.state.dateIsOpen} toggle={this.toggleDate} direction="down">
                                <DropdownToggle className="topic w-100 d-flex justify-content-between m-auto align-items-center" caret>
                                    Date
                                </DropdownToggle>
                                <DropdownMenu
                                    className="w-100"
                                    modifiers={modifiers}>
                                    {Date.map((date, key) =>{
                                        return <DropdownItem title={date} onClick={this.addFilter} key={key}>{date}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col md="12">
                            <Dropdown isOpen={this.state.languageIsOpen} toggle={this.toggleLanguage} direction="down">
                                <DropdownToggle className="topic w-100 d-flex justify-content-between m-auto align-items-center" caret>
                                    Language
                                </DropdownToggle>
                                <DropdownMenu
                                    className="w-100"
                                    modifiers={modifiers}>
                                    {Language.map((language, key) =>{
                                        return <DropdownItem title={language} onClick={this.addFilter} key={key}>{language}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="d-flex justify-content-start flex-wrap">
                            {
                                this.state.tags.map((filters, key) => {

                                    return(
                                        <div key={key} title={filters} onClick={this.removeFilter} className="mt-auto mb-auto p-1">
                                            <Tag placename={filters} className="tag-normal"/>
                                        </div>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    toggleTopics = () => {
        this.setState(prevState => {
            return {
                topicIsOpen: !prevState.topicIsOpen
            }
        });
    }

    toggleDate = () => {
        this.setState(prevState => {
            return {
                dateIsOpen: !prevState.dateIsOpen
            }
        });
    }

    toggleLanguage = () => {
        this.setState(prevState => {
            return {
                languageIsOpen: !prevState.languageIsOpen
            }
        });
    }

    addFilter = (event) => {
        const filterName = event.currentTarget.title;
        this.setState(prevState => {
            const filtersList = prevState.tags;
            if(!filtersList.includes(filterName))
                filtersList.push(filterName);
            return {
                tags: filtersList,
            }
        })
    }

    removeFilter = (event) => {
        const filterName = event.currentTarget.title;
        this.setState(prevState => {
            const filtersList = prevState.tags;
            for(let i = 0; i < filtersList.length; ++i) {
                if(filtersList[i] === filterName) {
                    filtersList[i] = filtersList[filtersList.length - 1];
                    filtersList.pop();
                }
            }
            return {
                tags: filtersList,
            }
        })
    }
}