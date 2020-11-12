import React from 'react';
import { Container } from './styles';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <>
      <Container type="button" {...rest}>
        {children}
      </Container>
    </>
  );
};
