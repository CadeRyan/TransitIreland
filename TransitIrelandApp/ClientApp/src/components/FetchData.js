import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

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
      : FetchData.renderResponse(this.state.count);

    return (
      <div>
        <h1 id="tabelLabel" >Entity Count</h1>
        <p>This is the amount of entities remaining for today:</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
      const response = await fetch('api/webrequest');

      console.log("RESPONSE", response)
      const data = await response.json();
      console.log("DATA", data)

    this.setState({ count: data, loading: false });
  }
}
