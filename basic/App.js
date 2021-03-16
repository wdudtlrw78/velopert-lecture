/** @format */

import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

const App = () => {
  return (
    <Wrapper>
      <Hello name="react" color="blue" />
      <Hello color="pink" />
    </Wrapper>
  );
};

export default App;
