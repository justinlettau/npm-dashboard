import React from 'react';
import ReactDOM from 'react-dom';

import Package from './Package';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Package />, div);
  ReactDOM.unmountComponentAtNode(div);
});
