import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};
export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Success Button',
};
export const Error=Template.bind({})
Error.args={
    variant: 'error',
    children:'Error Button'
}
export const Warning=Template.bind({})
Warning.args={
    variant:'warning',
    children:'Warning Button'
}
