import React, { Component } from 'react';
import {Button, Container, Row, Form, FormControl, Col, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'

const newEngine = require('@comunica/actor-init-sparql').newEngine;
const bindingsStreamToGraphQl = require('@comunica/actor-sparql-serialize-tree').bindingsStreamToGraphQl;
const myEngine = newEngine();

const qry = `PREFIX bot: <https://w3id.org/bot#>
SELECT  ?storey ?space
    WHERE {
    ?storey bot:hasSpace ?space
}
`

class SPARQLComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            table: {},
            queryPerformed: false
        };
    }

    query = async () => {
        let query = document.getElementById("SPARQLinput").value

        let endpoint = this.props.endpoint
        let type = this.props.endpointType
        let context = {sources: [{ type: type, value: endpoint }],};

        let myResults = []
        let myVariables = []
        let myColumns = []

        myEngine.query(query, context)
            .then(result => {
                return bindingsStreamToGraphQl(result.bindingsStream, context);
            })
            .then((res) => {
                var i = 0
                res.forEach((row) => {
                    for (var k in row) {
                        if (!myVariables.includes(k)) {
                            myColumns.push({'dataField': k, 'text': k})
                            myVariables.push(k)
                        }
                        if (row.hasOwnProperty(k)) {
                            row[k] = row[k][0].value;
                        }
                    }
                    row['id'] = i
                    i++
                    myResults.push(row)
                })
                console.log(myResults)

                let table = {}
                table['columns'] = myColumns
                table['products'] = myResults

                console.log(table)
                this.setState({table: table}, () => {
                    this.setState({queryPerformed: true})
                })
            });
    }


    render() {
        let table
        if (this.state.queryPerformed) {
            table = <BootstrapTable keyField='id' data={ this.state.table.products } columns={this.state.table.columns} />
        } else {
            table = <div></div>
        }

        return(
            <Container>
                <h3><a target="_blank" href="https://www.w3.org/TR/sparql11-query/">SPARQL</a></h3>
                <hr/>
                <Form>
                    <Form.Group className='query' as={Row}>
                        <Form.Label column sm={2}>SPARQL query</Form.Label>
                        <Col sm={10}><Form.Control defaultValue={qry} onChange={this.queryInput} id="SPARQLinput" as="textarea" rows="10" /></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick={this.query} variant="dark">Query</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <hr/>
                {table}
            </Container>
        )
    }
}

export default SPARQLComponent
