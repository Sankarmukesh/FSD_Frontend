import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './AuthReducers/AuthReducer';
import ProjectReducer from './ProjectsReducers/ProjectReducer';



const store = configureStore({
  reducer: {
    auth: AuthReducer,
    proj: ProjectReducer
  },
});

export default store;
