import React from "react"
import ReactJson from 'react-json-view';
import { Button, Grid, Row, Col } from "react-bootstrap";

class TreeComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {src: {}};
    }

    static defaultProps = {
        theme: "rjv-default",
        src: null,
        collapsed: false,
        collapseStringsAfter: 15,
        onAdd: true,
        onEdit: true,
        onDelete: true,
        displayObjectSize: false,
        enableClipboard: false,
        indentWidth: 4,
        displayDataTypes: false,
        iconStyle: "triangle"
    }

    render() {
        const {
            enableClipboard,
            theme,
            indentWidth,
            displayDataTypes
        } = this.props;
        const style = {
            padding: "20px",
            borderRadius: "5px",
            // margin: "80px 80px",
            textAlign: "left"
        }

        return (
            <div className="rjv-demo">
                <ReactJson
                    name={"Results"}
                    collapsed={true}
                    style={style}
                    theme={theme}
                    src={this.props.jsonSource}
                    collapseStringsAfterLength={false}
                    displayObjectSize={false}
                    enableClipboard={enableClipboard}
                    indentWidth={indentWidth}
                    displayDataTypes={displayDataTypes}
                    // iconStyle={iconStyle}
                />
            </div>
        )
    }

    set = (field, value) => {
        let state = {}
        state[field] = value.value
        this.setState(state)
    };
}

export default TreeComponent
