import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { taskStatuses } from '../../../Utils';
import './UserStories.css'
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { setcreateTaskItem, setcreateWorkItem } from '../../../redux/ProjectsReducers/ProjectReducer';
import IndividualUserStory from './IndividualUserStory';
import CloseIcon from '@mui/icons-material/Close';
import EditUserStory from './EditUserStory';
import CreatetaskItem from '../Tasks/CreatetaskItem';
import IndividualTaskCard from '../Tasks/IndividualTaskCard';
const UserStories = () => {
  const project = useSelector(state => state.proj.projectId)
  const createWorkItem = useSelector(state => state.proj.createWorkItem)

  const [userStoryName, setUsereStoryName] = useState('')
  const [description, setdescription] = useState('')
  const [owner, setowner] = useState('')
  const { email, user_id } = useSelector((store) => store.auth.loginDetails);
  const [users, setUsers] = useState([])
  const textAreaRef = useRef(null)

  useEffect(() => {
    if (createWorkItem) {
      textAreaRef?.current?.focus()
    }
  }, [createWorkItem])


  const dispatch = useDispatch()

  const [allUserStories, setallUserStories] = useState([])
  useEffect(() => {
    if (project._id !== undefined) {
      ApiServices.getUserStoryBasedOnProject({ projectId: project._id }).then(res => {
        // console.log(res.data)
        setallUserStories(res.data)
      }).catch(err => {
        dispatch(setToast({
          message: "Error occured !",
          bgColor: ToastColors.failure,
          visible: "yes",
        }))
      })
    }
  }, [project._id])
  useEffect(() => {
    ApiServices.getAllUsers({ type: '' }).then(res => {
      setUsers(res.data)
    }).catch(err => {
      dispatch(setToast({
        message: "Error occured !",
        bgColor: ToastColors.failure,
        visible: "yes",
      }))
    })
  }, [])

  
  const addUserStory = async () => {
    if (userStoryName !== '' && project._id !== undefined && owner!=='') {
      await ApiServices.addUserStory({ projectId: project._id, name: userStoryName, description: description, owner: owner, user_id: user_id }).then(res => {
        setallUserStories(prev => [res.data, ...prev])
        dispatch(setcreateWorkItem(false))
        setUsereStoryName('')
        setdescription('')
        setowner('')
      }).catch(err => {
        dispatch(setToast({
          message: err.response.data.message,
          bgColor: ToastColors.failure,
          visible: "yes",
        }))
      })
    } else {
      alert('Please fill owner, name to save data')
    }
  }
  return (
    <div style={{ padding: '0px 10px 10px 10px' }} className='userStoriesHeaderContainer'>
      {
        project._id !== undefined &&
        <><div className='userStoriesHeader'>
          <div>User Stories</div>
          {taskStatuses.map(ts => (
            <div>{ts.status}</div>
          ))}

        </div>
          <div className='userStoryDetails'>
            {createWorkItem == true &&
              <div className='userStoryCard'>
                
                <div >
                  <textarea ref={textAreaRef} placeholder='Enter name' rows={5} columns={6} value={userStoryName} onChange={(e) => { setUsereStoryName(e.target.value) }}></textarea>
                  
                </div>
                <div>
                  <textarea placeholder='Description' rows={5} columns={6} value={description} onChange={(e) => { setdescription(e.target.value) }}></textarea>
                </div>
                <div>
                  <select style={{ width: '96%', padding: '8px 0px', border: 'none', borderRadius: '5px', cursor: 'pointer'}} name="" id="" onChange={(e) => {
                    setowner(e.target.value)
                  }}>
                    <option value=''>Select Owner</option>
                    {users.map(op => (
                      <option value={op._id}>{op.userName}</option>
                    ))}
                  </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', margin: '5px'}}>
                  <div>
                    <button style={{ padding: '5px' }} onClick={() => {
                      setUsereStoryName('')
                      setdescription('')
                      setowner('')
                      dispatch(setcreateWorkItem(false))
                    }}>Close</button>
                  </div>
                  <div style={{ display: (userStoryName !== '' && project._id !== undefined && owner !== '') ? 'block' : 'none' }}>
                    <button style={{ padding: '5px', width: '50px' }} onClick={addUserStory}>Add</button>
                  </div>
                </div>
           </div>}
          </div>
          {allUserStories?.map(au => (
            <div style={{display: 'flex', gap: '10px'}}>
              <IndividualUserStory projectId={project._id} au={au} setallUserStories={setallUserStories} allUserStories={allUserStories} />
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <CreatetaskItem users={users} userStory={au} setallUserStories={setallUserStories} projectId={project._id} allUserStories={allUserStories} />
                {au.taskIds?.map(tasks => (
                  <IndividualTaskCard tasks={tasks} projectId={project._id} userStory={au} setallUserStories={setallUserStories} allUserStories={allUserStories} />
                ))}
              </div>
            </div>
          ))}
        </>
      }
   </div>
  )
}

export default UserStories