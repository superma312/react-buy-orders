import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center h-100 p-4'>
      <Spinner animation='border' />
    </div>
  );
};

export default Loader;
