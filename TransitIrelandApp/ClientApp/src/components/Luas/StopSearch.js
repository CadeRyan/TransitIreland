import { Button } from 'bootstrap';
import React, { Component } from 'react';
import './StopSearch.css';
export class LuasStopSearch extends Component {
    static displayName = LuasStopSearch.name;

    constructor(props) {
        super(props);
        this.state = {
            list: [], search: true, selectedStop: "", transportType: "Bus"
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);



    }

    changeTab(tab) {
        this.setState({ transportType:tab })
    }
//    
    stopClicked(stop) {
        this.getTimesFromBackend(stop);
        this.setState({ search: false, selectedStop: stop });

    }

    handleClick() {
        console.log('Click happened');
    }

    handleChange(event) {
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

    renderBottomNav() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col" onClick={() => this.changeTab("Bus")}>
                            <h3>Bus</h3>
                        </div>
                        <div className="col" onClick={() => this.changeTab("Train")}>
                            <h3>Train</h3>
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
            
        }
        else {
            if (this.state.transportType === "Train") {
                table = this.renderTrainTimes(this.state.list);
            }
            else if (this.state.transportType === "Luas") {
                table = this.renderLuasTimes(this.state.list);
            }
        }
     

        let bottomNav = this.renderBottomNav()


        return (
            <div className="page-container">
                <div className="content-wrap">
                
                {title}
                {this.state.search && <form>
                    <input
                        type="text"
                        onChange={this.handleChange}
                    />
                </form>}
                {table}

                </div>
                {bottomNav}
            </div>
        );
    }

    async getStopsFromBackend(input) {
        var response;
        if (this.state.transportType === "Train") {
            response = await fetch('api/trainsearch/' + input);
        }
        else if (this.state.transportType === "Luas") {
            response = await fetch('api/luassearch/' + input);
        }
        else {
            response = await fetch('api/bussearch/' + input);
        }
        

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data)

        this.setState({ list: data, loading: false });
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
            const response = await fetch('api/busRTI/' + input);
            const data = await response.json();
            console.log("DATA", data.Trams)
            this.setState({ list: data.Trams });
        }

        
    }
}
