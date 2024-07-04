import React from 'react';
import Input from './Input';
function InputGroup(){

  return (
    <>
      <Input type="text" placeholder="이름을 입력하세요" />
      <Input type="email" placeholder="이메일을 입력하세요" />
      <Input type="password" placeholder="비밀번호를 입력하세요" />
    </>
  );
};

export default InputGroup;