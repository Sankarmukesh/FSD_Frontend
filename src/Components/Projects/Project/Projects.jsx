import React, { useEffect, useRef, useState } from 'react'
import { ApiServices } from '../../../Services/ApiServices'
import { useDispatch } from "react-redux";
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { useSelector } from 'react-redux';
import './Projects.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddProjectPopup from './AddProjectPopup';
import { setAddedToProject, setProjectUsers, setcreateWorkItem } from '../../../redux/ProjectsReducers/ProjectReducer';
const Projects = () => {
  const { email, image, user_id, userName, role } = useSelector(
    (store) => store.auth.loginDetails
  );
  const addedToProject = useSelector((store) => store.proj.addedToProject);
  const [count, setCount] = useState(0);
  const [allProjects, setAllProjects] = useState('')
  const [selectedProject, setSelectedProject] = useState({})
  const dispatch = useDispatch();
  const projectDetailsRef = useRef(null);
  const [type, setType] = useState('')
  const handleClickOutside = (event) => {
    if (
      projectDetailsRef.current &&
      !projectDetailsRef.current.contains(event.target) &&
      event.target.id !== "projectBox"
    ) {
      document.getElementsByClassName('projectDetails')[0].classList.remove('showprojectDetails')

    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    ApiServices.getProjects({role, user_id}).then(res => {
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
    if (addedToProject) {
      ApiServices.getProjects({role, user_id}).then(res => {
        setAllProjects(res.data)
        dispatch(setAddedToProject(null));
      }
      ).catch(err => {
        dispatch(
          setToast({
            message: "Error occured !",
            bgColor: ToastColors.failure,
            visible: "yes",
          })
        );
      })
    }
  }, [addedToProject])
  useEffect(() => {
    if (localStorage.getItem('project') && allProjects.length > 0 && allProjects?.filter(f => f._id == JSON.parse(localStorage.getItem('project'))._id).length>0) {
      setSelectedProject(JSON.parse(localStorage.getItem('project')))
    } else {
      if (allProjects.length > 0) {
        localStorage.setItem('project', JSON.stringify(allProjects[0]))
        setSelectedProject(allProjects[0])
      }
    }
  }, [allProjects])

  const [addPopupopen, setAddPopupopen] = useState(false)

  const deleteProject = async(id) => {
    const result = window.confirm("Are you sure you want to delete? Once the project is deleted, all related user stories will be deleted automatically.");
    if (result === true) {
      await ApiServices.deleteProject({ projectId: id }).then(res => {
        setAllProjects(allProjects?.filter(a => a._id !== id))
        if (id == selectedProject._id && allProjects?.filter(a => a._id !== id).length>0){
          setSelectedProject(allProjects?.filter(a => a._id !== id)[0])
          localStorage.setItem('project', JSON.stringify(allProjects?.filter(a => a._id !== id)[0]));

        }
      }).catch(err => {
        dispatch(
          setToast({
            message: "Error occured !",
            bgColor: ToastColors.failure,
            visible: "yes",
          })
        );
      })
    } else {
      // User clicked Cancel or closed the dialog
      console.log("User clicked Cancel");
    }
  }
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', justifyContent: 'space-between' }}>
      {allProjects.length > 0 ?
        <>
        <div id='projectBox' onClick={(e) => {
          document.getElementsByClassName('projectDetails')[0].classList.add('showprojectDetails');
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><AccountTreeIcon /><span style={{ fontSize: '20px', fontWeight: '400', whiteSpace: 'nowrap', width: '180px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{selectedProject?.name}</span> </div><div><i class="fas fa-caret-down"></i></div>
        </div>
          <div className='projectDetails' style={{ display: 'none', zIndex: '1000' }} ref={projectDetailsRef}>
            {allProjects?.map(d => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={(e) => {
                localStorage.setItem('project', JSON.stringify(d));
                setSelectedProject(d);
                dispatch(setProjectUsers(d.teamMembers))
                document.getElementsByClassName('projectDetails')[0].classList.remove('showprojectDetails');
              }}><div>
                <div style={{ whiteSpace: 'nowrap', width: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{d.name}</div>
              </div>
                <>
                  {role == 'Admin' && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => {
                      localStorage.setItem('project', JSON.stringify(d));
                      setSelectedProject(d);
                      document.getElementsByClassName('projectDetails')[0].classList.remove('showprojectDetails');
                      setAddPopupopen(true)
                      setType('update')
                      setCount(prev=>prev+1)
                    }}>
                      <i class="fas fa-pen"></i>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => deleteProject(d._id)}>
                      <i class="fas fa-trash"></i>
                    </div>
                  </div>}
                </></div>
            ))}
          </div>
        </>
        : <div style={{width: '100%'}}>No Projects assigned to you by admin.</div>
      }
      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        {role == 'Admin' && <button style={{ padding: '10px', whiteSpace: 'nowrap' }} onClick={() => {
          setType('add')

          setAddPopupopen(true)
        }}>Add Project</button>
        }
        {(Object.keys(selectedProject).length > 0 && role!=='individual') && <button style={{ padding: '10px', whiteSpace: 'nowrap' }} onClick={() => {
          dispatch(setcreateWorkItem(true))
        }}>Add Work Item</button>
        }
      </div>
      <AddProjectPopup count={count} type={type} open={addPopupopen} setOpen={setAddPopupopen} setAllProjects={setAllProjects} selectedProject={selectedProject} allProjects={allProjects} setSelectedProject={setSelectedProject} />
    </div>
  )
}

export default Projects