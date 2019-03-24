import React, { Component } from 'react';
import {Container, Tabs, Tab} from 'react-bootstrap'
import NavbarComponent from './NavbarComponent'
import GraphQLComponent from './graphQLComponent'
import SPARQLComponent from './SPARQLComponent'
import EndpointSelector from './endpointSelector'
import '../styles/styles.css'

class SinglePage extends Component {

    render() {
        return (
            <div>
                <NavbarComponent/>
                <Container>
                    <GraphQLComponent/>
                    <SPARQLComponent/>
                </Container>
            </div>
        );
    }
}

export default SinglePage;
