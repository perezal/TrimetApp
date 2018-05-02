import React from 'react';
import LineMenu from './LineMenu';

it('renders a LineMenu', () => {
  const props = {
    lines: [{
      name: '75 to London',
      value: 75
    }],
    dirs: [],
    onStopSelect: ()=>{},
    onLineSelect: ()=>{}
  }
  const component = new LineMenu(props).render();
});