import React, { Component } from 'react';

export class LuasStopSearch extends Component {
    static displayName = LuasStopSearch.name;

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


      


      <table classname='table table-striped' aria-labelledby="tabellabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Line</th>
            <th>Lat</th>
            <th>Long</th>
          </tr>
        </thead>
        <tbody>
          {stops.map(stop =>
              <tr key={stop.Text}>
                  <td>{stop.Text}</td>
                  <td>{stop.Line===1?"Red":"Green"}</td>
                  <td>{stop.Lat}</td>
                  <td>{stop.Long}</td>
            </tr>
          )}
        </tbody>
      </table>




        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LuasStopSearch.renderResponse(this.state.stops);



        return (
            <div>
                <h1 id="tabelLabel" >Luas Search</h1>
                <p>This is a luas search</p>
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
        const response = await fetch('api/luassearch/'+input);

        console.log("RESPONSE", response)
        const data = await response.json();
        console.log("DATA", data)

        this.setState({ stops: data, loading: false });
    }
}
