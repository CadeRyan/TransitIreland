import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { LuasStopSearch } from './components/Luas/StopSearch';
import { TrainStopSearch } from './components/Train/StopSearch';
import { LuasStopRTI } from './components/Luas/StopRTI';
import { InstanceTest } from './components/InstanceTest';
import { GetJSON } from './components/GetJSON';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <div className="page-container">
              <div className="content-wrap">
                  <Route exact path='/' component={Home} />
                  <Route path='/counter' component={Counter} />
                  <Route path='/fetch-data' component={FetchData} />
                  <Route path='/luasSearch' component={LuasStopSearch} />
                  <Route path='/luasRTI' component={LuasStopRTI} />
                  <Route path='/trainSearch' component={TrainStopSearch} />
                  <Route path='/instance' component={InstanceTest} />
                  <Route path='/getJSON' component={GetJSON} />

              </div>
          </div>

      );

  }
}
