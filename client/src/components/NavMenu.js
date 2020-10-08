import React from "react";
import { Nav } from "react-bootstrap";
import { getCurrentUser, logout }  from '../services/authService';

function NavMenu() {
  const [currentUser, setCurrentUser] = React.useState(undefined);
  React.useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/campaigns">Campaigns</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" href="/buybox">
            Check Buybox
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {currentUser && (
            <Nav.Link eventKey="link-2" href="/" onClick={logout}>
              Logout
            </Nav.Link>
          )}
          {!currentUser && (
            <Nav.Link eventKey="link-3" href="/login">
              Login
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
      <h1 className="text-center jumbotron">Amazon Checker</h1>
    </div>
  );
}

export default NavMenu;
