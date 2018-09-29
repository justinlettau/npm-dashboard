import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faNpm } from '@fortawesome/free-brands-svg-icons';
import { faSadCry } from '@fortawesome/free-regular-svg-icons';
import { faCog, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

import Navbar from './navbar/Navbar';
import Packages from './packages/Packages';

library.add(
  faCog,
  faSadCry,
  faNpm,
  faPlus,
  faTrashAlt
);

export default class App extends Component {

  /**
   * Render.
   */
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container my-4">
          <Packages />
        </div>
      </React.Fragment>
    );
  }
}
