import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button, InputGroup, Col, DropdownButton, Dropdown} from 'react-bootstrap'

class NavbarComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            endpointType: 'sparql',
            endpoint: 'http://lbd.arch.rwth-aachen.de/fuseki/myBuildingProject1/query'
        };
    }

    setEndpointType = (e) => {
        this.setState({endpointType: e.target.text}, () => {
            this.props.endpointType(this.state.endpointType)
        })
    }

   setEndpoint = (e) => {
        this.setState({endpoint: e.target.value}, () => {
            this.props.endpoint(this.state.endpoint)
        })
   }

    render() {
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">QCompare</Navbar.Brand>
                    <Nav className="mr-0">
                        <Nav.Link href="graphql-ld">GraphQL-LD</Nav.Link>
                        {/*<Nav.Link href="sparql">SPARQL</Nav.Link>*/}
                    </Nav>
                    <Nav className="mr-0">
                        <Nav.Link href="sparql">SPARQL</Nav.Link>
                        {/*<Nav.Link href="sparql">SPARQL</Nav.Link>*/}
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link href="hypergraphql">HyperGraphQL</Nav.Link>
                        {/*<Nav.Link href="sparql">SPARQL</Nav.Link>*/}
                    </Nav>
                    <Col sm={7}>
                        <InputGroup className="mb-3 queryMethod">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" variant="outline-light">
                                    Endpoint
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Endpoint"
                                aria-label="endpoint"
                                aria-describedby="basic-addon2"
                                defaultValue={this.state.endpoint}
                                onChange={this.setEndpoint}
                            />
                            <DropdownButton alignRight as={InputGroup.Append} variant="outline-light" title={this.state.endpointType} id="input-group-dropdown-2">
                                <Dropdown.Item onClick={this.setEndpointType}>sparql</Dropdown.Item>
                                <Dropdown.Item onClick={this.setEndpointType}>file</Dropdown.Item>
                                <Dropdown.Item onClick={this.setEndpointType}>hypermedia</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                </Navbar>
            </div>
        )
    }
}

export default NavbarComponent
