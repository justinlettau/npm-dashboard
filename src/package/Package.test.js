import React from 'react';
import ReactDOM from 'react-dom';

import Package from './Package';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Package value={{ package: 'example', downloads: 83 }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
