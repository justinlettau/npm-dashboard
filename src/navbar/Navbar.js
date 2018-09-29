import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

export default class Navbar extends Component {

  /**
   * Render.
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={['fab', 'npm']} />
        </a>
      </nav>
    );
  }
}
