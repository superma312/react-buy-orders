import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

const Header = () => {
  let location = useLocation();

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Nav className='me-auto' activeKey={location.pathname}>
          <Nav.Link href='/buy-orders'>Buy Orders</Nav.Link>
          <Nav.Link href='/datasets'>Datasets</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
