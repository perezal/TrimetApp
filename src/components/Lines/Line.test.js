import React from 'react';
import Line from './Line';

it('renders a Line', () => {
  const props = {name: '75 to London', value: 75}
  const component = new Line(props).render();
});