import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;

const Navlist = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Navlist>
        <li className="">
          <Link to="/">Home</Link>
        </li>
        <li className="">
          <Link to="/mynotes">My Notes</Link>
        </li>
        <li>
          <Link to="/new">New Note</Link>
        </li>
        <li className="">
          <Link to="/favorites">Favorites</Link>
        </li>
      </Navlist>
    </Nav>
  );
};

export default Navigation;
