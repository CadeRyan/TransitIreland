import React, { Component } from 'react';

export class InstanceTest extends Component {
    static displayName = InstanceTest.name;

    constructor(props) {
        super(props);
        this.state = { count: "", loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderResponse(count) {

        console.log("COUNT", count)
        return (

            <h1>{count}</h1>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : InstanceTest.renderResponse(this.state.count);

        return (
            <div>
                <h1 id="tabelLabel" >InstanceTest</h1>
                <p>This is the amount of entities remaining for today</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('instancetest');

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data)

        this.setState({ count: data, loading: false });
    }
}
