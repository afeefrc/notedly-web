import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import Layout from "../components/Layout";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

import { IS_LOGGED_IN } from "../gql/query";

const Pages = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mynotes" element={<PrivateRoute />}>
          <Route path="/mynotes" element={<MyNotes />} />
        </Route>
        <Route path="/favorites" element={<PrivateRoute />}>
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/new" element={<PrivateRoute />}>
          <Route path="/new" element={<NewNote />} />
        </Route>
        <Route path="/edit/:id" element={<PrivateRoute />}>
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Layout>
  );
};

//add private components
const PrivateRoute = () => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  //if Loading
  if (loading) return <p>Loading...</p>;
  //if errors
  if (error) return <p>Error!</p>;
  //if user logged in, route to requested component
  //else redirect to sign-in page
  return data.isLoggedIn === true ? <Outlet /> : <Navigate to="/signin" />;
};

export default Pages;
