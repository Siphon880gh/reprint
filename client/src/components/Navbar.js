import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Form, FormControl, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SearchButton from '../assets/searchIconBox.png';
import AddPostIcon from '../assets/addIcon.png';
import FaveBoxIcon from '../assets/heartBoxIcon.png'
import NoftLogo from '../assets/noftFULL2.png';
import Auth from '../utils/auth';


const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <img
              src={NoftLogo}
              width="120"
              height="50"
              className="d-inline-block align-top"
              alt="Noft Custom Logo"
            />
          </Navbar.Brand>
          <Form inline>
            <FormControl type="text" placeholder="Search NoFT..." className="mr-sm-2" />
            <Button >
              <img
                src={SearchButton}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Search Button"
              />
            </Button>
          </Form>
          <Navbar.Toggle aria-controls='navbar-main' />
          <Navbar.Collapse id='navbar-main'>
            <Nav className='ml-auto'>
              {/* if user is logged in, show Add Post and Favorites link. Otherwise show Login/Sign up */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/post/new'>
                    <img
                      src={AddPostIcon}
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                      alt="Add New NoFT"
                    />
                  </Nav.Link>
                  <Nav.Link as={Link} to='/favorites'>
                    <img
                      src={FaveBoxIcon}
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                      alt="Favorite NoFTs Icon"
                    />
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile/me'>Profile</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
