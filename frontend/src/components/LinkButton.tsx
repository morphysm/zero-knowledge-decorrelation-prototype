import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';

interface ILinkButtonProps {
  to: string
}
const LinkButton: React.FC<ILinkButtonProps> = ({ to, children }) => {

  let navigate = useNavigate();
  const routeChange = () => {
    navigate(to);
  }
  return (
      <Container className='d-flex align-items-center justify-content-center mt-5'>
        <Button className="px-4 border border-dark bg-dark" onClick={routeChange}>
          {children}
        </Button>
      </Container>
  );
}


export { LinkButton }