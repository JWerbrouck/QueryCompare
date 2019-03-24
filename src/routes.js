import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import App from './App';
import SinglePage from './components/SinglePage'
import NavbarComponent from './components/NavbarComponent'
import GraphQLComponent from './components/graphQLComponent'
import SPARQLComponent from './components/SPARQLComponent'
import HyperGraphQLComponet from './components/HyperGraphQLcomponent'

class Routes extends React.Component {
    constructor(props) {
        super();
        this.state = {
            endpoint: 'http://lbd.arch.rwth-aachen.de/fuseki/myBuildingProject1/query',
            endpointType: 'sparql'
        };
    }

    setEndpointType = (EPType) => {
        this.setState({endpointType: EPType})
        console.log(this.state.endpointType)
    }

    setEndpoint = (EP) => {
        this.setState({endpoint: EP}, () => {
            console.log(this.state.endpoint)
        })

    }

    render() {
        return (
            <App>
                <NavbarComponent endpoint={this.setEndpoint} endpointType={this.setEndpointType}/>
                <Switch>
                    <Redirect from="/" to="/graphql-ld" exact/>
                    <Route exact path="/graphql-ld" render={(props) => <GraphQLComponent {...props} endpoint={this.state.endpoint} endpointType={this.state.endpointType}/>}/>
                    <Route exact path="/sparql" render={(props) => <SPARQLComponent {...props} endpoint={this.state.endpoint} endpointType={this.state.endpointType}/>}/>
                    <Route exact path="/hypergraphql" render={(props) => <HyperGraphQLComponet {...props} endpoint={this.state.endpoint} endpointType={this.state.endpointType}/>}/>
                </Switch>
            </App>
        )
    }
}

export default Routes
