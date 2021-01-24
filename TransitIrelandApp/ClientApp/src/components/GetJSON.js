import React, { Component } from 'react';

export class GetJSON extends Component {
    static displayName = GetJSON.name;

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
            : GetJSON.renderResponse(this.state.count);

        return (
            <div>
                <h1 id="tabelLabel" >GetJSON</h1>
                <p>This is the amount of entities remaining for today</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {


        let bodyVar = {
            title: "foo",
            body: "bar"
        }

        let JSONstring = JSON.stringify(bodyVar)
        console.log("JSON STIRNG", JSONstring)

        const response = await fetch('GetRealTimeJSON', {
            method: "POST",
            body: JSONstring,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data)

        this.setState({ count: data, loading: false });
    }
}
