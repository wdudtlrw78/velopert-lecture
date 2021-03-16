import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}모모 Hello {name}
    </div>
  );
}

Hello.defaultProps = {
  name: 'MOMO',
};

export default Hello;
