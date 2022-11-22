import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IButtonWithLoadingProps {
  label: string;
  isSubmiting: boolean;
  onClick: () => void;
}

const ButtonWithLoading: FC<IButtonWithLoadingProps> = ({label, isSubmiting, onClick}) => {
  return (
    <Button
      variant='secondary'
      onClick={onClick}
      disabled={isSubmiting}
    >
      {isSubmiting ? (
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
      ) : label}
    </Button>
  );
};

export default ButtonWithLoading;
