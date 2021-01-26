import React from 'react';
import Routes from './routes';
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { GlobalStyles } from '../styles/GlobalStyles';

function Index() {
  return (
    <>
      <GlobalStyles />
      <Navbar bg="blue" expand="lg">
        <Navbar.Brand href="/">PokeTrader</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/trade">Nova troca</Nav.Link>
            <Nav.Link href="/">Ultimas trocas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </>
 );
}

export default Index;