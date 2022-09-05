import React, { useEffect } from "react";

import { useMutation, useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

//local query
import { IS_LOGGED_IN } from "../gql/query";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = (props) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      //console.log the JSON web token when the mutation is complete
      //console.log(data.signUp);
      //store the JWT in local storage
      localStorage.setItem("token", data.signUp);
      // update local cache
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      //redirect user to homepage
      navigate("/");
    },
  });

  useEffect(() => {
    //update document title
    document.title = "SignUp - Notedly";
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* if the data is lodding, display loading msg */}
      {loading && <p>Loading...</p>}
      {/* if error, display err msg */}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
