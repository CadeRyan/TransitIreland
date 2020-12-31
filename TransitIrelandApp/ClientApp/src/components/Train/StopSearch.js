import React, { Component } from 'react';

export class TrainStopSearch extends Component {
    static displayName = TrainStopSearch.name;

    constructor(props) {
        super(props);
        this.state = { stops: [], loading: true };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.getDataFromBackend(event.target.value);
    }

    //componentdidmount() {
    //    this.getdatafrombackend();
    //}

    static renderResponse(stops) {

        console.log("COUNT", stops)
        return (

            <ul>
              {stops.map(stop =>
                  <li> {stop.Name} </li>
                )}
            </ul>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TrainStopSearch.renderResponse(this.state.stops);



        return (
            <div>
                <h1 id="tabelLabel" >Train Search</h1>
                <p>This is a train search</p>
                <form>
                    <input
                        type="text"
                        onChange={this.handleChange}
                    />
                </form>
                {contents}
            </div>
        );
    }

    async getDataFromBackend(input) {
        const response = await fetch('api/trainsearch/' + input);

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data)

        this.setState({ stops: data, loading: false });
    }
}
