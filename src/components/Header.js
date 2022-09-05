import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

//local query
import { IS_LOGGED_IN } from "../gql/query";

import ButtonAsLink from "./ButtonAsLink";

// import logo from "../img/logo.svg";

const UserState = styled.div`
  margin-left: auto;
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = (props) => {
  const navigate = useNavigate();
  //query hook for suer logged in state
  const { data, client } = useQuery(IS_LOGGED_IN);
  return (
    <HeaderBar>
      <img
        src={
          "https://png.pngtree.com/png-vector/20190324/ourmid/pngtree-vector-notes-icon-png-image_862518.jpg"
        }
        alt="Notedly Logo"
        height="40"
      />
      <LogoText>Notedly</LogoText>
      {/* if logged in display a logout link, else display sign in option */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              //remove the token
              localStorage.removeItem("token");
              //clear app cache
              client.resetStore();
              //update local state
              // client.writeQuery({
              //   query: IS_LOGGED_IN,
              //   data: { isLoggedIn: false },
              // });
              //redirect to home page
              navigate("/");
            }}
          >
            Logout
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={"/signin"}>Sign In</Link> or{""}
            <Link to={"/signup"}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default Header;
