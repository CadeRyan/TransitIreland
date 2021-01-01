import React, { Component } from 'react';

export class LuasStopRTI extends Component {
    static displayName = LuasStopRTI.name;

    constructor(props) {
        super(props);
        this.state = { trips: [], loading: false };
        //this.handleChange = this.handleChange.bind(this);
    }

    //handleChange(event) {
    //    this.getDataFromBackend(event.target.value);
    //}

    componentDidMount() {
        this.getDataFromBackend();
    }

    static renderResponse(trips) {

        console.log("COUNT", trips)
        return (

            <ul>
                {trips.map(trip =>
                    <li> {trip.Destination}  Due:  {trip.DueMins} </li>
                )}
            </ul>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LuasStopRTI.renderResponse(this.state.trips);



        return (
            <div>
                <h1 id="tabelLabel" >Live Times</h1>
                {contents}
            </div>
        );
    }

    async getDataFromBackend(input) {
        const response = await fetch('api/luasRTI/Rialto');

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data.Trams)

        this.setState({ trips: data.Trams, loading: false });
    }
}
