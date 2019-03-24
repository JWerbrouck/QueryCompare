import React, { Component } from 'react';
import './App.css';
import SinglePage from './components/SinglePage'
import Routes from './routes'
import NavbarComponent from './components/NavbarComponent'

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            endpoint: 'http://lbd.arch.rwth-aachen.de/fuseki/myBuildingProject1/query',
            endpointType: 'sparql'
        };
    }

    componentDidMount(){
        document.title = "QCompare"
    }

    render() {
        return (
          <div className="App">
              <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                  integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                  crossOrigin="anonymous"
              />
              <div>
                  {this.props.children}
              </div>
          </div>
    );
  }
}

export default App;
