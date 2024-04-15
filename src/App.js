import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AuthHoc, { AdminDeciderHoc, LoginAuth } from "./AuthHoc";
import Toast from "./Components/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  apicallloginDetails,
  setOnlineUsers,
  setToast,
} from "./redux/AuthReducers/AuthReducer";
import { io } from "socket.io-client";

import LoadingData from "./Components/Toast/Loading";
import { socket_io } from "./Utils";
import UserProfiles from "./Components/UserProfiles/UserProfiles";
import EditUserStory from "./Components/Projects/UserStories/EditUserStory";
import EditTask from "./Components/Projects/Tasks/EditTask";
import { setProjectUsers } from "./redux/ProjectsReducers/ProjectReducer";
import { ApiServices } from "./Services/ApiServices";
import { ToastColors } from "./Components/Toast/ToastColors";


const SignUp = React.lazy(() => import("./Components/Signup/SignUp"));
const Login = React.lazy(() => import("./Components/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./Components/ForgotPassword/ForgotPassword")
);
const Navbar = React.lazy(() => import("./Components/Navbar/Navbar"));
const Home = React.lazy(() =>
  import("./Components/Home/Home")
);


const NoMatch = () => {
  return (
    <div className="noMatch">
      <div className="noRoute-image">
        <img src="https://tse2.mm.bing.net/th?id=OIP.Jb4XrrIxatYfB2DQxV0TngHaFs&pid=Api&P=0" style={{objectFit: 'contain', mixBlendMode: 'multiply'}} alt="gif" />
      </div>
    </div>
  );
};

const App = () => {



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apicallloginDetails());
  }, []);

  // intialize socket io
  const socket = useRef();
  const { email, user_id } = useSelector((store) => store.auth.loginDetails);

  useEffect(() => {
    socket.current = io(socket_io);
  }, []);

  // adding online users to socket io
  useEffect(() => {
    socket.current.emit("addUser", user_id);
    socket.current.on("getUsers", (users) => {
      dispatch(setOnlineUsers(users));
      // console.log(users);
    });
  }, [email]);
  const [allProjects, setAllProjects] = useState('')

  useEffect(() => {
    ApiServices.getProjects().then(res => {
      setAllProjects(res.data)
    }).catch(err => {
      dispatch(
        setToast({
          message: "Error occured !",
          bgColor: ToastColors.failure,
          visible: "yes",
        })
      );
    })
  }, [])
  useEffect(() => {
    if (localStorage.getItem('project') && allProjects.length > 0 && allProjects?.filter(f => f._id == JSON.parse(localStorage.getItem('project'))._id).length > 0) {
      dispatch(setProjectUsers(allProjects?.find(f => f?._id?.toString() == JSON.parse(localStorage.getItem('project'))?._id?.toString())?.teamMembers || []))

    } else {
      if (allProjects.length > 0) {
        localStorage.setItem('project', JSON.stringify(allProjects[0]))
        dispatch(setProjectUsers(allProjects[0]?.teamMembers || []))
      }
    }
  }, [allProjects])

  // live message updates
  useEffect(() => {
    socket.current.on("allDeviceLogout", () => {
      localStorage.removeItem("user");
      localStorage.clear();
      window.location.href = "/login";
    });
  }, []);

  //IT IS FOR DARK AND WHITE THEME
    useEffect(() => {
      if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light')
        document.body.setAttribute('data-theme', 'light')
      } else {
        document.body.setAttribute('data-theme', localStorage.getItem('theme'))

     }
   }, [])
  return (
    <div>
      <Suspense
        fallback={
          <div className="Loading">
            <span class="loader">
            </span>
          </div>
        }
      >
        <Toast />
        <LoadingData />
        <Navbar />
        <Routes>
          <Route path="/signup" Component={LoginAuth(SignUp)} />
          <Route path="/login" Component={LoginAuth(Login)} />
          <Route path="/forgotpassword" Component={LoginAuth(ForgotPassword)} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/" Component={AuthHoc(Home)} />

          <Route path="/home" Component={AuthHoc(Home)} />
          <Route path="/profiles" Component={AdminDeciderHoc(UserProfiles)} />
          <Route path="/userStory/:projectId/:userStoryId/edit" Component={AuthHoc(EditUserStory)} />
          <Route path="/task/:projectId/:userStoryId/:taskId/edit" Component={AuthHoc(EditTask)} />



        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
