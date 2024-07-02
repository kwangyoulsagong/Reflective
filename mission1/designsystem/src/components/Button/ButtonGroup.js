import React from 'react';
import Button from './Button';
function ButtonGroup(){

  return (
    <>
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="success">Success Button</Button>
    <Button variant="error">Error Button</Button>
    <Button variant="warning">Warning Button</Button>
    </>
  );
};

export default ButtonGroup;