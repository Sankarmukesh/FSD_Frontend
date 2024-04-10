import React from "react";
import { useSelector } from "react-redux";
import Projects from "../Projects/Project/Projects";
import UserStories from "../Projects/UserStories/UserStories";
const Home = () => {
  const { role, userName } = useSelector((store) => store.auth.loginDetails);
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Projects />
      <UserStories />
    </div>
  );
};

export default Home;
