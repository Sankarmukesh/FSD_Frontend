import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { setcreateWorkItem } from '../../../redux/ProjectsReducers/ProjectReducer';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';

const CreatetaskItem = ({ userStory, setallUserStories, projectId, allUserStories, users }) => {
    const [createTask, setCreateTask] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [description, setdescription] = useState('')
    const [due, setdue] = useState('')
    const [owner, setowner] = useState('')
    const { email, user_id } = useSelector((store) => store.auth.loginDetails);
    const textAreaRef = useRef(null)
    


    useEffect(() => {
        if (createTask) {
            textAreaRef?.current?.focus()
        }
    }, [createTask])


    const dispatch = useDispatch()

    const addTask = async () => {
        // projectId: projectId, userStoryId: userStoryId, name: name, description, owner, createdBy: user_id, status: 'New', due 
        if (taskName !== '' && projectId !== undefined && owner !== '') {
            await ApiServices.addTasks({ userStoryId:userStory._id, projectId: projectId, name: taskName, description: description, owner: owner, user_id: user_id, due: due }).then(res => {
                setallUserStories(allUserStories.map(al => al._id == userStory._id ? { ...al, taskIds: [res.data, ...al.taskIds]} : al))
                setTaskName('')
                setdescription('')
                setowner('')
                setCreateTask(false)
                setdue('')
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
      <div>
          {createTask ?
              <div className='userStoryDetails'>
                  <div className='userStoryCard taskCard'>
                  
                  <div >
                      <textarea ref={textAreaRef} placeholder='Enter name' rows={5} columns={6} value={taskName} onChange={(e) => { setTaskName(e.target.value) }}></textarea>

                  </div>
                  <div>
                      <textarea placeholder='Description' rows={5} columns={6} value={description} onChange={(e) => { setdescription(e.target.value) }}></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '5px', width: '96%', padding: '2px 0px', border: 'none', borderRadius: '5px', }}>
                          
                          <input min={new Date().toISOString().split('T')[0]} type="date" name="" id="due" value={due} onChange={(e)=>setdue(e.target.value)} style={{width: '90%'}}/>
                      </div>
                  <div>
                          <select style={{ width: '96%', padding: '8px 0px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} name="" id="" onChange={(e) => {
                          setowner(e.target.value)
                      }}>
                          <option value=''>Select Owner</option>
                          {users.map(op => (
                              <option value={op._id}>{op.userName}</option>
                          ))}
                      </select>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', margin: '5px' }}>
                          <div>
                              <button style={{ padding: '5px' }} onClick={() => {
                                  setTaskName('')
                                  setdescription('')
                                  setowner('')
                                  setCreateTask(false)
                              }}>Close</button>
                          </div>
                          <div style={{ display: (taskName !== '' && projectId !== undefined && owner !== '' && due !== '') ? 'block' : 'none' }}>
                              <button style={{ padding: '5px', width: '50px' }} onClick={addTask}>Add</button>
                          </div>
                      </div>
                  
                  </div>
              </div>
           :
              <button style={{ height: '30px', width: '50px', padding: '5px' }} onClick={()=>setCreateTask(true)}>Add Task</button>}
      </div>
  )
}

export default CreatetaskItem