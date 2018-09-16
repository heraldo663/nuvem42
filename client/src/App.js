import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
