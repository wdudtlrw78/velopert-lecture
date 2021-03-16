import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px soild black',
    padding: 16,
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
