import axios from 'axios';
import React, { Component } from 'react';

import Package from '../package/Package';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      period: 'last-week',
      packages: [],
      data: []
    };

    this.onClear = this.onClear.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPackageAdd = this.onPackageAdd.bind(this);
    this.onPackageRemove = this.onPackageRemove.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
  }

  /**
   * Component did mount.
   */
  componentDidMount() {
    const packages = this.getCache();
    this.setState({ packages }, () => this.load());
  }

  /**
   * On input add.
   *
   * @param {SyntheticEvent} event Event object.
   */
  onInputChange(event) {
    const value = event.target.value;
    this.setState({ value });
  }

  /**
   * On package add.
   *
   * @param {SyntheticEvent} event Event object.
   */
  onPackageAdd(event) {
    event.preventDefault();

    const name = this.state.value;
    const packages = [...this.state.packages];

    if (packages.includes(name)) {
      alert(`It looks like ${name} is already listed below.`);
      return;
    }

    packages.push(name);
    this.setCache(packages);
    this.setState({ value: '', packages }, () => this.load());
  }

  /**
   * On package remove.
   *
   * @param {string} name Package name to remove.
   */
  onPackageRemove(name) {
    const index = this.state.packages.findIndex(item => item === name);

    if (index !== -1) {
      const packages = [...this.state.packages];

      packages.splice(index, 1);
      this.setCache(packages);
      this.setState({ packages }, () => this.load());
    }
  }

  /**
   * On period change.
   *
   * @param {string} period Period to set.
   */
  onPeriodChange(period) {
    this.setState({ period }, () => this.load());
  }

  /**
   * Remove all packages and cache.
   */
  onClear() {
    if (window.confirm('Are you sure you want to remove all packages?')) {
      this.setState({ packages: [], data: [] });
      localStorage.removeItem('npm-dashboard:packages');
    }
  }

  /**
   * Get packages from storage.
   */
  getCache() {
    const value = localStorage.getItem('npm-dashboard:packages');
    return JSON.parse(value) || [];
  }

  /**
   * Set packages to storage.
   *
   * @param {string[]} packages Package names to set.
   */
  setCache(packages) {
    localStorage.setItem('npm-dashboard:packages', JSON.stringify(packages));
  }

  /**
   * Load package data.
   */
  load() {
    if (!this.state.packages.length) {
      return;
    }

    const period = this.state.period;
    const names = this.state.packages.join();

    axios.get(`https://api.npmjs.org/downloads/point/${period}/${names}`)
      .then(res => this.transform(res.data))
      .then(data => data.sort((a, b) => b.downloads - a.downloads))
      .then(data => this.setState({ data }));
  }

  /**
   * Transform API request data into array of objects.
   *
   * @param {object} data Data returned from API request.
   */
  transform(data) {
    if ('package' in data && 'downloads' in data) {
      return [data];
    }

    return Object.keys(data)
      .filter(key => !!data[key])
      .map(key => data[key]);
  }

  /**
   * Get active class for period.
   *
   * @param {string} period Period to compare.
   */
  periodCss(period) {
    return this.state.period === period ? ' active' : '';
  }

  /**
   * Render.
   */
  render() {
    const hasPackages = this.state.data.length;

    return (
      <React.Fragment>
        <div className="d-flex mb-4">
          <form onSubmit={this.onPackageAdd} className="flex-fill mr-2">
            <input type="text" className="form-control" placeholder="Enter package name ..." value={this.state.value} onChange={this.onInputChange} />
          </form>
          <div className="btn-group">
            <button type="button" className={'btn btn-secondary ' + this.periodCss('last-week')} onClick={() => this.onPeriodChange('last-week')}>
              Last Week
            </button>
            <button type="button" className={'btn btn-secondary ' + this.periodCss('last-month')} onClick={() => this.onPeriodChange('last-month')}>
              Last Month
            </button>
          </div>
        </div>
        {!!hasPackages &&
          <React.Fragment>
            <div className="row">
              {this.state.data.map(item =>
                <div className="col-4 mb-2" key={item.package}>
                  <Package value={item} onRemove={(evt) => this.onPackageRemove(item.package, evt)} />
                </div>
              )}
            </div>
            <div className="text-center mt-5">
              <button type="button" className="btn btn-link" onClick={this.onClear}>Remove All</button>
            </div>
          </React.Fragment>
        }
        {!hasPackages &&
          <div className="text-center mt-5">
            <FontAwesomeIcon icon={['far', 'sad-cry']} size="6x" />
            <p>No packages found.</p>
          </div>
        }
      </React.Fragment>
    );
  }
}
