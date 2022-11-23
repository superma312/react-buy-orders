import React, { FC } from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IButtonProps {
  type?: 'button' | 'submit';
  label: string;
  isSubmiting: boolean;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ type, label, isSubmiting, onClick }) => {
  return (
    <BootstrapButton
      type={type ?? 'button'}
      variant='secondary'
      onClick={onClick ? onClick : () => {}}
      disabled={isSubmiting}
    >
      {isSubmiting ? (
        <>
          <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          Loading...
        </>
      ) : (
        label
      )}
    </BootstrapButton>
  );
};

export default Button;
