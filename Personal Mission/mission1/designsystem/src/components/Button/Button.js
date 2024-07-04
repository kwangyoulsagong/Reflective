import React from 'react';
import './Button.css';

const Button = ({ children, variant}) => {
  // variant를 통해 버튼의 스타일을 정하고, 모든 다른 props를 버튼에 전달
  const className = `button button-${variant}`;
  return (
    <button className={className}>
    {/* 텍스트 렌더링 */}
      {children} 
    </button>
  );
};

export default Button;