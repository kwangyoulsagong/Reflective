import React from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  placeholder: '이름을 입력하세요',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  placeholder: '이메일을 입력하세요',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: '비밀번호를 입력하세요',
};
