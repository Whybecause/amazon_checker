import React from "react";
import { Container } from "react-bootstrap";

function Nav() {
  return (
    <Container>
      <h1 className="text-center jumbotron">Amazon Checker</h1>
      {/* <a href="/campaigns/all">All Campaigns</a>
      <a href="/campaigns/problem">Problematic Campaigns</a> */}
      <a href="/">Home</a>
    </Container>
  );
}

export default Nav;
