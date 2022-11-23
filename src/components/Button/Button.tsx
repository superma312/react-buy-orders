import React, { FC } from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IButtonProps {
  label: string;
  isSubmiting: boolean;
  onClick: () => void;
}

const Button: FC<IButtonProps> = ({
  label,
  isSubmiting,
  onClick,
}) => {
  return (
    <BootstrapButton variant='secondary' onClick={onClick} disabled={isSubmiting}>
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
