import React, { Component } from 'react';
import {Button, Container, Row, Form, FormControl, Col, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap'
import TreeComponent from './JSONtree'
import BootstrapTable from "./SPARQLComponent";

const newEngine = require('@comunica/actor-init-sparql').newEngine;
const bindingsStreamToGraphQl = require('@comunica/actor-sparql-serialize-tree').bindingsStreamToGraphQl;
const myEngine = newEngine();

// const fullcntxt = {
//     sources: [ { type: 'sparql', value: 'http://lbd.arch.rwth-aachen.de/fuseki/myBuildingProject1/query' } ],
//     queryFormat: 'graphql',
//     "@context": {
//         "@vocab": "https://w3id.org/bot#",
//         "Site": {"@id": "https://w3id.org/bot#Site"},
//         "hasBuilding": {"@id": "https://w3id.org/bot#hasBuilding"},
//         "hasSpace": {"@id": "https://w3id.org/bot#hasSpace"},
//         "hasStorey": {"@id": "https://w3id.org/bot#hasStorey"},
//         "id": {"@id": "https://www.w3.org/TR/rdf-concepts/#dfn-URI-reference"},
//     }
// };

const cntxt = {
    "Site": "https://w3id.org/bot#Site",
    "hasBuilding": "https://w3id.org/bot#hasBuilding",
    "hasStorey": "https://w3id.org/bot#hasStorey",
    "hasSpace": "https://w3id.org/bot#hasSpace"
}


const qry = `{
    hasStorey
    hasStorey {
        hasSpace
    }
}`

class GraphQLComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            myResults: {},
            queryPerformed: false
        };
    }

    queryInput = () => {
        return document.getElementById("queryInput").value
    }

    contextInput = () => {
        let endpoint = this.props.endpoint
        let type = this.props.endpointType
        let context = document.getElementById("JSONInput").value

        let finalContext = `{
"sources": [{"type": "%type%", "value": "%endpoint%"}],
"queryFormat": "graphql",
"@context": %context%
}`

        finalContext = finalContext.replace("%type%", type)
        finalContext = finalContext.replace("%endpoint%", endpoint)
        finalContext = finalContext.replace("%context%", context)

        return finalContext
    }

    query = async () => {
        let query = this.queryInput()
        let context = this.contextInput()
        context = JSON.parse(context)
        myEngine.query(query, context)
            .then(function (result) {
                return bindingsStreamToGraphQl(result.bindingsStream, context);
            })
            .then((row) => {
                console.log(row)
                this.setState({myResults: row},() => {
                    this.setState({queryPerformed: true})
                })
            });
    }

    test = () => {
        console.log(this.props)
    }

    render() {
        let tree
        if (this.state.queryPerformed) {
            tree = <TreeComponent jsonSource={this.state.myResults}/>
        } else {
            tree = <div></div>
        }

        return(
            <Container>
                <h3><a target="_blank" href="https://comunica.github.io/Article-ISWC2018-Demo-GraphQlLD/">GraphQL-LD</a></h3>
                <hr/>
                <Form>
                    <Form.Group className='context' as={Row}>
                        <Form.Label column sm={2}>@context</Form.Label>
                        <Col sm={10}><Form.Control defaultValue={JSON.stringify(cntxt, null, 2)} id="JSONInput" as="textarea" rows="7" /></Col>
                        {/*<Col sm={{ span: 10, offset: 2 }}><input id="input-b2" name="input-b2" type="file" className="file" data-show-preview="false"/></Col>*/}
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>GraphQL query</Form.Label>
                        <Col sm={10}><Form.Control defaultValue={qry} onChange={this.queryInput} id="queryInput" as="textarea" rows="5" /></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick={this.query} variant="dark">Query</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <hr/>
                {tree}
            </Container>
        )
    }
}

export default GraphQLComponent
