import React from 'react';
import ReactDOM from 'react-dom';

import Packages from './Packages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Packages />, div);
  ReactDOM.unmountComponentAtNode(div);
});
