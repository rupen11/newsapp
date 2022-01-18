import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div>
        {console.log(this.apiKey)}
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} />} />
            <Route exact path="/business" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/sports" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/entertainment" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/technology" component={() => <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="technology" />} />
            <Route exact path="/about" component={() => <About />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
