import axiosInstance from "../Components/axiosInstance";

export const ApiServices = {
  verifyAccessToken: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/verifyApiAccessToken`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  
  updateuserProfileImage: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userDetails/updateProfileImage`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  deleteuserProfileImage: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userDetails/deleteProfileImage`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  refreshToken: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/refresh-token`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  sendOtp: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/sendEmailOtp`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  sendMobileOtp: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/sendMobileOtp`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  verifyOtp: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/verifyOtp`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  register: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/register`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  SSORegister: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/ssoRegister`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  getProfile: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userDetails/getUser`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  getProjects: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/projectDetails/getAllProjects`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  deleteProject: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/projectDetails/deleteProject`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  getsingleProject: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/projectDetails/getsingleProject`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  addProject: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/projectDetails/addProject`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  updateProject: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/projectDetails/updateProject`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },




  getUserStoryBasedOnProject: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryDetails/getAllUserStories`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  deleteUserStory: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryDetails/deleteUserStory`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  getsingleUserStory: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryDetails/getSingleUserStory`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  getUserStoryComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryCommentDetails/getUserStoryComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  addUserStoryComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryCommentDetails/addUserStoryComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  updateUserStoryComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryCommentDetails/updateUserStoryComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },


  addTasks: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskdetails/addTask`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  updateTasks: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskdetails/updateTask`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },


  getSingleTasks: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskdetails/getSingleTask`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  deleteTasks: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskdetails/deleteTask`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },


  gettaskComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskCommentDetails/gettaskComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  addtaskComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskCommentDetails/addtaskComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  updatetaskComments: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/taskCommentDetails/updatetaskComment`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  addUserStory: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryDetails/addUserStory`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  updateUserStory: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userStoryDetails/updateUserStory`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },




  login: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/login`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  mobileLogin: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/mobile/login`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  resetPassword: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/auth/forgotPassword`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  getAllUsers: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userDetails/getUsers`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  getAllRoles: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/role/getAllRoles`)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },
  changeUserRoles: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/userDetails/updateUserRole`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  getAllNotification: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/notification/getNotification`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  },


  changeNotification: (obj) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/notification/notificationStatusChange`, obj)
        .then((res) => {
          if (res) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  }
};
