import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//local query
import { IS_LOGGED_IN } from "../gql/query";

import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
  mutation signin($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = (props) => {
  useEffect(() => {
    //update document title
    document.title = "Sign In - Notedly";
  });

  const navigate = useNavigate();
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      //store local token
      localStorage.setItem("token", data.signIn);
      //update local cache
      // update local cache
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      //redirect user to homepage
      navigate("/");
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {/* if loading */}
      {loading && <p>Loading...</p>}
      {/* if error */}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
