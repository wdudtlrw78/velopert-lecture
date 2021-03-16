import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>모모 Hello {name}</div>;
}

Hello.defaultProps = {
  name: 'MOMO',
};

export default Hello;
