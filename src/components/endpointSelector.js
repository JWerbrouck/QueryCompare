import React, { Component } from 'react';
import {Button, Container, Row, Form, FormControl, Col, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap'

class EndpointSelector extends Component {
    constructor(props) {
        super();
        this.state = {
            endpointType: 'sparql',
        };
    }

    setEndpointType = (e) => {
        this.setState({endpointType: e.target.text}, () => {
            console.log('endpointType', this.state.endpointType)
        })
    }

    render() {
        return(
            <Container className="endpointSelect">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Endpoint</Form.Label>
                        <Col sm={10}>
                            <InputGroup>
                                <FormControl defaultValue='http://lbd.arch.rwth-aachen.de/fuseki/myBuildingProject1/query' id="endpoint-url" placeholder="Endpoint URL" aria-label="Endpoint URL" aria-describedby="basic-addon2"/>
                                <DropdownButton as={InputGroup.Append} variant="dark" title={this.state.endpointType} id="input-group-dropdown-2">
                                    <Dropdown.Item onClick={this.setEndpointType}>sparql</Dropdown.Item>
                                    <Dropdown.Item onClick={this.setEndpointType}>file</Dropdown.Item>
                                    <Dropdown.Item onClick={this.setEndpointType}>hypermedia</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default EndpointSelector
