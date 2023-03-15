// ------------------- ORIGINAL CODE ---------------------
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VolunteerSignup from "./pages/VolunteerSignup";
import CharitySignup from "./pages/CharitySignup";

import Navbar from "./components/Navbar";

import Discover from "./pages/Discover";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";

import Footer from "./components/Footer";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import GoogleSignUp from "./pages/volunteers/signup";
import LoginVolunteer from "./pages/LoginVolunteer";
import LoginCharity from "./pages/LoginCharity";
import EventForm from "./pages/EventForm";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginVolunteer" element={<LoginVolunteer />} />
            <Route path="/LoginCharity" element={<LoginCharity />} />
            <Route path="/Signup" element={<Signup />} />

            <Route path="/volunteers/signup" element={<GoogleSignUp />} />
            <Route path="/VolunteerSignup" element={<VolunteerSignup />} />
            <Route path="/charitySignup" element={<CharitySignup />} />

            <Route path="/EventForm" element={<EventForm />} />
            <Route path="/Event/:id">
                <EventPage />
            </Route>

            {/* <Route
                path="/success"
                element={<Success />}
              /> */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route
                path="/VolunteerProfile/:id"
                element={<VolunteerProfile />}
              />
              <Route
                path="/CharityProfile/:id"
                element={<CharityProfile />}
              /> */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
