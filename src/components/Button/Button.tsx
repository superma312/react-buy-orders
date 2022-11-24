import React, { FC } from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IButtonProps {
  type?: 'button' | 'submit';
  loading: boolean;
  name: string;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ type, loading, name, onClick }) => {
  return (
    <BootstrapButton
      type={type ?? 'button'}
      variant="secondary"
      onClick={onClick ? onClick : () => {}}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </>
      ) : (
        name
      )}
    </BootstrapButton>
  );
};

export default Button;
