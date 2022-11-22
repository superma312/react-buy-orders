import React, {FC} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC <LayoutProps>= ({children}) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={10}>{children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
