import React, { Component } from 'react';
import {Button, Container, Row, Form, FormControl, Col, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap'
import Iframe from 'react-iframe'
import TreeComponent from "./graphQLComponent";

const config = {
    "name": "hgql",
    "schema": "QCompareSchema",
    "server": {
        "port": 8080,
        "graphql": "/graphql",
        "graphiql": "/graphiql"
    },
    "services": [
        {
            "id": "QCompare",
            "type": "%%type%%",
            "url": "%%endpoint%%",
            "graph": "",
            "user": "",
            "password": ""
        }
    ]
}

var $ = require('jquery')

class HyperGraphQLcomponent extends Component {
    constructor(props) {
        super();
        this.state = {
            queryPerformed: true
        };
    }

    setupHGQL = (HGQLconfig, schema) => {
        console.log(typeof HGQLconfig)
        $.get('http://localhost:5000/hgql', {schema:schema, config: JSON.stringify(HGQLconfig)}, (data) => {
            // var ProjectArray = JSON.parse(data)
            // this.setState({myProjects: ProjectArray})
            console.log(data)
        })
    }

    setup = () => {
        let endpoint = this.props.endpoint
        let type = this.props.endpointType
        if (type === 'sparql') {
            type = 'SPARQLEndpointService'

            let customConfig = config
            customConfig.services[0]['type'] = type
            customConfig.services[0]['url'] = endpoint

            let schema = 'testschema'

            this.setupHGQL(customConfig, schema)

        } else {
            alert('no support for non-sparql endpoints provided')
        }



    }

    test = () => {
        this.setState({queryPerformed:!this.state.queryPerformed})
    }

    render() {
        return(
            <Container>
                <h3><a target="_blank" href="https://www.hypergraphql.org/">HyperGraphQL</a></h3>
                <hr/>
                <p>Integration TBD, please setup a local HyperGraphQL instance at port 8082</p>
                <hr/>
                <Iframe
                    url="http://localhost:8082/graphiql"
                    width="100%"
                    height="700px"
                    id="graphiql"
                    className="graphiql"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
            </Container>
        )
    }
}

export default HyperGraphQLcomponent
