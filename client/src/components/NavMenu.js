import axios from "axios";
import React from "react";
import { Nav } from "react-bootstrap";

function NavMenu() {
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const logout = async () => {
    await axios.get("/api/logout");
  };

  const getCurrentUser = async () => {
    const result = await axios.get("/api/user");
    if (result.data !== undefined) {
      setCurrentUser(result.data.id);
    } else {
      setCurrentUser(undefined);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
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
