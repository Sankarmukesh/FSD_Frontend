import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import NameGenerator from '../../Common/NameGenerator';
import { taskStatuses } from '../../../Utils';
import { Label } from '@mui/icons-material';

const EditUserStory = ({ }) => {
    const [open, setOpen] = useState(true)
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const [users, setUsers] = useState([])
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

    const [userStory, setUserStory] = useState(null)
    const { projectId, userStoryId } = useParams()
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
        navigate(-1)
    };

    const dispatch = useDispatch();
    useEffect(() => {
        if (userStoryId) {
            ApiServices.getsingleUserStory({ userStoryId: userStoryId }).then(res => {
                setUserStory(res.data)
            }).catch(err => {
                dispatch(
                    setToast({
                        message: "Error occured !",
                        bgColor: ToastColors.failure,
                        visible: "yes",
                    })
                );
            })
        }
    }, [userStoryId])


    const updateUserStory = async () => {
        await ApiServices.updateUserStory({ userStoryid: userStoryId, owner: userStory?.owner, name: userStory?.name, description: userStory?.description, updatedBy: user_id, status: userStory?.status }).then(res => {
            dispatch(
                setToast({
                    message: "User Story updated",
                    bgColor: ToastColors.Success,
                    visible: "yes",
                })
            );
            navigate(-1)
        }).catch(err => {
            dispatch(
                setToast({
                    message: "Error occured !",
                    bgColor: ToastColors.failure,
                    visible: "yes",
                })
            );
        })
    }
  return (
      <Dialog fullWidth
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
              style: {
                  height: '100vh', // Specify the height
              }
          }}
      >
          
          <div>
              <div style={{ padding: '10px' }} className={userStory && window.location.pathname.includes('userStory') && 'popupUserStoryHeader'}>
                  {userStory && window.location.pathname.includes('userStory') &&
                      <div>
                          <div>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <i class="fas fa-book-open" style={{ color: 'blue' }}></i><span style={{ fontSize: '20px', fontWeight: '600' }}>User Story {userStory?._id}</span>
                              </div>

                          </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <input type='text' placeholder='Enter name' style={{fontSize:'16px', width: '100%'}} value={userStory?.name} onChange={(e) => { setUserStory((prev) => ({ ...prev, name: e.target.value })) }}></input>
                          </div>
                         
                         
                          <div style={{position: 'relative' }}>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', }} onClick={() => {
                                  document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.add('showuserStoryEditAllUserBox')
                              }}>
                                  <div>
                                      {(userStory?.owner?.image !== undefined && userStory?.owner?.image.url !== "") ? <img
                                          style={{
                                              borderRadius: "50%",
                                              cursor: "pointer",
                                              maxWidth: "100%",
                                              height: '35px', width: '35px', marginLeft: '0',
                                              display: 'block'
                                          }}
                                          src={
                                              userStory?.owner?.image !== undefined && userStory?.owner?.image !== "" ? userStory?.owner?.image.url : "/profile.png"
                                          }
                                          alt="Profile"
                                      /> : <NameGenerator userName={userStory?.owner?.userName} sizes={{ height: '35px', width: '35px', fontSize: '8px' }} />}

                                  </div>
                                  <div>{userStory?.owner?.userName} <i className='fas fa-caret-down'></i> (Owner)</div>

                              </div>
                              <div className='userStoryEditAllUserBox' style={{ display: 'none', cursor: 'pointer' }} onMouseLeave={() => {
                                  document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.remove('showuserStoryEditAllUserBox')
                              }}>
                                  {users?.map(d => (
                                      <div onClick={(e) => {
                                          setUserStory((prev) => ({ ...prev, owner: d }))
                                          document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.remove('showuserStoryEditAllUserBox')
                                      }}>
                                          {d.userName}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '16px', marginTop: '10px', position: 'relative' }}>
                              <div style={{ display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer' }} onClick={() => {
                                  document.getElementsByClassName('userStoryEditStatus')[0].classList.add('showuserStoryEditStatus')
                              }}>
                                  <div className='' style={{ borderRadius: '50%', height: '10px', width: '10px', background: taskStatuses.filter(f => f.status == userStory?.status)[0].color }}></div> <div>{userStory?.status} <i className='fas fa-caret-down'></i></div>
                              </div>
                              <div className='userStoryEditStatus' style={{ display: 'none', cursor: 'pointer' }}
                                  onMouseLeave={() => {
                                      document.getElementsByClassName('userStoryEditStatus')[0].classList.remove('showuserStoryEditStatus')
                              }}
                              >
                                  {taskStatuses?.map(d => (
                                      <div onClick={(e) => {
                                          setUserStory((prev) => ({ ...prev, status: d.status }))
                                          document.getElementsByClassName('userStoryEditStatus')[0].classList.remove('showuserStoryEditStatus')
                                      }}>
                                          {d.status}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          
                          
                      </div>
                  }
              </div>
              <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' , padding: '10px'}}>
                      <label>Description</label>
                      <textarea
                          style={{ resize: "none", outline: 'none', border: '1px solid lightgray', fontSize: '16px', width: '90%', height: '150px', padding: '10px'}} value={userStory?.description} onChange={(e) => { setUserStory((prev) => ({ ...prev, description: e.target.value })) }}
                          id=""
                          cols="2"
                          rows="12"
                          name="message"
                          placeholder="Description"
                      ></textarea>
                  </div>
              </div>
              <div style={{ padding: '10px' }}>
                  <button disabled={userStory?.name=='' || userStory?.description=='' } onClick={updateUserStory}>Update {window.location.pathname.includes('userStory') ? 'User Story': 'Task'}</button>
              </div>
        </div>
      </Dialog>
  )
}

export default EditUserStory