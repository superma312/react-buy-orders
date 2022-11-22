import React, {FC} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({children, title}) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={10}>
          {title && (
            <h1 className='text-center my-5'>{title}</h1>
          )}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
