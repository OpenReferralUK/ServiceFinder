import { css } from '@emotion/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import AboutComponent from './components/sections/About/About';
import Body from './components/sections/Body/Body';
import Navbar from './components/sections/Navbar';
import ServiceListComponent from './components/sections/ServiceList/ServiceListComponent';
import InfoService from './components/sections/Services/General-InfoService';
import initial_data from './config';
import { getDataFromAPI, refreshData } from './functions/APIFunctions';
import ResultModal from './components/shared/Elements/ResultModal/ResultModal';


export default class App extends React.Component {
  interval;
  state = {
    time: initial_data.general.dataRefreshTime,
    isLoaded: false
  }

  override = css`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 100vw;
    margin: 50px auto;
`;

  async componentDidMount() {
    await getDataFromAPI();
    this.interval = setInterval(async () => {
      await refreshData();
    }, 1000 * ((60 * 60) * this.state.time));
    this.setState({
      isLoaded: true
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    return (
      <Router>
        <ResultModal />
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <div className="App" >
              {this.state.isLoaded ?
                <>
                  <Body />
                </> : <BeatLoader
                  css={this.override}
                  sizeUnit={"px"}
                  size={50}
                  color={'#C70039 '}
                  loading={this.state.loading}
                />
              } </div>
          </Route>
          <Route path="/about" exact component={() => (<AboutComponent />)} />
          <Route path="/service/:id" exact component={() => (<InfoService />)} />
          <Route path="/service-list/:list" exact component={() => (<ServiceListComponent />)} />
          <Route path="*">
            Page not found
          </Route>
        </Switch>
      </Router>
    );
  }
}