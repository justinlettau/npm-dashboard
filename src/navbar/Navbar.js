import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

export default class Navbar extends Component {

  /**
   * Render.
   */
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">NPM Dashboard</span>
        <ul className="navbar-nav d-flex flex-row ml-auto">
          <li className="nav-item">
            <a className="nav-link px-2" href="https://github.com/justinlettau/npm-dashboard" title="GitHub">
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
