import React from "react";
import { useSelector } from "react-redux";
import Projects from "../Projects/Project/Projects";
const Home = () => {
  const { role, userName } = useSelector((store) => store.auth.loginDetails);
  return (
    <div style={{ overflowX: 'hidden' }}>
     <Projects />
    </div>
  );
};

export default Home;
