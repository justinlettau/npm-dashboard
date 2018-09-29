import React, { Component } from 'react';

export default class Package extends Component {
  constructor (props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  /**
   * On remove.
   */
  onRemove() {
    const name = this.props.value.package;

    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      this.props.onRemove(name);
    }
  }

  /**
   * Render.
   */
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <button type="button" onClick={this.onRemove} className="close">&times;</button>
          <h5 className="card-title">
            <a href={'https://www.npmjs.com/package/' + this.props.value.package} className="text-body" target="_blank">{this.props.value.package}</a>
          </h5>
          <div className="text-center">
            <span className="display-4 text-success">{this.props.value.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
}
