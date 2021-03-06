﻿import { Button } from 'bootstrap';
import React, { Component } from 'react';
import './StopSearch.css';
import { ScrollView } from "@cantonjs/react-scroll-view";

export class LuasStopSearch extends Component {
    static displayName = LuasStopSearch.name;

    constructor(props) {
        super(props);
        this.state = {
            list: [], search: true, selectedStop: "", transportType: "Bus",searchResults:[],prevSearch:""
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);



    }


    backClick() {
        this.setState({ search: true, selectedStop: "", list: this.state.searchResults })
    }

    changeTab(tab) {

        this.setState({ transportType: tab, list: [], search: true, selectedStop: "", prevSearch:"" })

        this.refs.searchInput.value = '';
    }
//    
    stopClicked(stop) {
        this.setState({ searchResults: this.state.list });
        this.setState({ search: false, selectedStop: stop });
        this.getTimesFromBackend(stop);

    }

    handleClick() {
        console.log('Click happened');
    }

    handleChange(event) {
        this.setState({ prevSearch: event.target.value })
        this.getStopsFromBackend(event.target.value);
    }

    //componentdidmount() {
    //    this.getdatafrombackend();
    //}

    renderLuasStops(stops) {

        console.log("COUNT", stops)
        return (



      <table className='table table-striped' aria-labelledby="tabellabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Line</th>
           
          </tr>
        </thead>
        <tbody>
          {stops.map(stop =>
              <tr key={stop.Text} onClick={() => this.stopClicked(stop.Text)}>
                  <td >{stop.Text}</td>
                  <td>{stop.Line===1?"Red":"Green"}</td>
                 
            </tr>
          )}
        </tbody>
      </table>   

        );
    }

    renderTrainStops(stops) {

        console.log("COUNT", stops)
        return (

            <ul>
                {stops.map(stop =>
                    <li onClick={() => this.stopClicked(stop.Name)}> {stop.Name} </li>
                )}
            </ul>


        );
    }

    renderBusStops(stops) {

        console.log("COUNT", stops)
        return (



            <table className='table table-striped' aria-labelledby="tabellabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Address</th>

                    </tr>
                </thead>
                <tbody>
                    {stops.map(stop =>
                        <tr key={stop.Id} onClick={() => this.stopClicked(stop)}>
                            <td >{stop.Id}</td>
                            <td>{stop.Address}</td>

                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    renderLuasTimes(trips) {

        console.log("COUNT", trips)
        return (



            <table className='table table-striped' aria-labelledby="tabellabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Due</th>

                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip =>
                        <tr key={trip.Destination}>
                            <td >{trip.Destination}</td>
                            <td>{trip.DueMins === "DUE" ? "Due" : trip.DueMins+" Min"}</td>

                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    renderTrainTimes(trips) {

        console.log("COUNT", trips)
        return (



            <table className='table table-striped' aria-labelledby="tabellabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Due</th>

                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip =>
                        <tr key={trip.Destination}>
                            <td >{trip.Destination}</td>
                            <td>{trip.Duein === "DUE" ? "Due" : trip.Duein + " Min"}</td>

                        </tr>
                    )}
                </tbody>
            </table>

        );
    }


    renderBusTimes(trips) {

        console.log("COUNT", trips)
        return (



            <table className='table table-striped' aria-labelledby="tabellabel">
                <thead>
                    <tr>
                        <th>Agency</th>
                        <th>Route</th>
                        <th>Destination</th>
                        <th>Due</th>

                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip =>
                        <tr key={trip.DueAt}>
                            <td >{trip.Agency}</td>
                            <td >{trip.RouteId}</td>
                            <td >{trip.Destination}</td>
                            <td >{trip.DueAt}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    renderBottomNav() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col" onClick={() => this.changeTab("Bus")}>
                            <h3>Bus RT</h3>
                        </div>
                        <div className="col" onClick={() => this.changeTab("Train")}>
                            <h3>Train</h3>
                        </div>
                        <div className="col" onClick={() => this.changeTab("Luas")}>
                            <h3>Luas</h3>
                        </div>
                        <div className="col" onClick={() => this.changeTab("Luas")}>
                            <h3>Luas</h3>
                        </div>
                    </div>

                </div>

            </div>

            );
    }




    render() {
        let title = this.state.search
            ? <h1 id="tabelLabel" >{this.state.transportType} Search</h1>
            : <h1 id="tabelLabel" >Real Time For {this.state.selectedStop}</h1>;

        var table;
        

        if (this.state.search) {
            if (this.state.transportType === "Train") {
                table = this.renderTrainStops(this.state.list);
            }
            else if (this.state.transportType === "Luas") {
                table = this.renderLuasStops(this.state.list);
            }
            else if (this.state.transportType === "Bus") {
                table = this.renderBusStops(this.state.list);
            }

            
        }
        else {
            if (this.state.transportType === "Train") {
                table = this.renderTrainTimes(this.state.list);
            }
            else if (this.state.transportType === "Luas") {
                table = this.renderLuasTimes(this.state.list);
            }
            else if (this.state.transportType === "Bus") {
                table = this.renderBusTimes(this.state.list);
            }
        }
     

        let bottomNav = this.renderBottomNav()


        return (
            <div className="page-container">
                <div className="content-wrap" style={{ height: '90vh', overflowY: 'scroll' }}>
                    <div className="indent">
                {title}
                {this.state.search && <form>
                    <input
                        type="text"
                        ref="searchInput"
                        value={this.state.prevSearch}
                        onChange={this.handleChange}
                    />
                    </form>}
                    {!this.state.search && <button
                        onClick={() => this.backClick()}
                    >
                            Back
                        </button>
                    }
                    <ScrollView style={{ height: '70vh' }}>
                        {table}
                    </ScrollView>
                    </div>
                </div>
                {bottomNav}
            </div>
        );
    }

    async getStopsFromBackend(input) {
        if (input === "") {
            this.setState({ list: [], loading: false });
        }
        else {

            var response;
            if (this.state.transportType === "Train") {
                response = await fetch('api/trainsearch/' + input);
            }
            else if (this.state.transportType === "Luas") {
                response = await fetch('api/luassearch/' + input);
            }
            else {
                response = await fetch('GetRealTimeJSON');
                let stop = response.input
                if (stop !== undefined) { console.log("StOP", stop.id)}
                
            }


            console.log("RESPONSE", response)
            const data = await response.json();
            console.log("DATA", data)

            if (this.state.transportType === "Bus") {

                let stops = []
                let inputStr = input+""
                let stop = data[inputStr]
                console.log("Stop ", stop)
                console.log("Input ", input)
                console.log("InputSTR ", inputStr)
                if (stop !== undefined) { stops.push(stop) }
                this.setState({ list: stops, loading: false });
            }
            else {
                this.setState({ list: data, loading: false });
            }

            
        }
        
    }

    async getTimesFromBackend(input) {

        if (this.state.transportType === "Train") {
            const response = await fetch('api/trainRTI/' + input);
            const data = await response.json();
            console.log("DATA Train", data)
            this.setState({ list: data.Results });
        }
        else if (this.state.transportType === "Luas") {
            const response = await fetch('api/luasRTI/' + input);
            const data = await response.json();
            console.log("DATA", data.Trams)
            this.setState({ list: data.Trams });
        }
        else {
            let realtime = input.RealtimeResults
            this.setState({ list: realtime, selectedStop: input.Id });
        }

        
    }
}
