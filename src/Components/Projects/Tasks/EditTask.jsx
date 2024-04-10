import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import NameGenerator from '../../Common/NameGenerator';
import { formatDate, taskStatuses } from '../../../Utils';
import { Label } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import TaskComments from './TaskComments';
import CloseIcon from '@mui/icons-material/Close';
import './EditTask.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
const EditTask = ({ }) => {
    const [open, setOpen] = useState(true)
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const [newComment, setNewComment] = useState('')
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

    const [IndividualTask, setIndividualTask] = useState(null)
    const { projectId, userStoryId, taskId } = useParams()
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
        navigate('/home')
    };

    const dispatch = useDispatch();
    useEffect(() => {
        if (taskId) {
            ApiServices.getSingleTasks({ taskId: taskId }).then(res => {
                setIndividualTask(res.data)
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
    }, [taskId])


    const [IndividualTaskComment, setIndividualTaskComment] = useState([])
    useEffect(() => {
        if (taskId) {
            ApiServices.gettaskComments({ taskId: taskId }).then(res => {
                setIndividualTaskComment(res.data)
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
    }, [taskId])


    const addTaskComment = async () => {
        await ApiServices.addtaskComments({ taskId: taskId, comment: newComment, commentBy: user_id }).then(res => {
            setIndividualTaskComment(prev => [res.data, ...prev ])
            setNewComment('')
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


    const updateTasks = async () => {
        await ApiServices.updateTasks({ taskId: taskId, owner: IndividualTask?.owner, name: IndividualTask?.name, description: IndividualTask?.description, updatedBy: user_id, status: IndividualTask?.status, due: IndividualTask?.due }).then(res => {
            dispatch(
                setToast({
                    message: "User Story updated",
                    bgColor: ToastColors.success,
                    visible: "yes",
                })
            );
            navigate('/home')

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
        <Dialog fullScreen
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >

            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'fixed', right: '10px', top: '10px', background: 'lightgray', borderRadius: '50%', width: '35px', height: '35px', fontSize: '14px', alignItems: 'center' }}>
                    <CloseIcon style={{ cursor: 'pointer', fontSize: '25px', transform: 'translateX(-3px)' }} onClick={handleClose} />
                </div>
                <div style={{ padding: '10px',  borderLeft: `6px solid ${taskStatuses.filter(f => f.status == IndividualTask?.status)[0]?.color}`}}>
                    {IndividualTask && window.location.pathname.includes('task') &&
                        <div>
                            <div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <AssignmentIcon style={{ color: taskStatuses.filter(f => f.status == IndividualTask?.status)[0]?.color }} /><span style={{ fontSize: '20px', fontWeight: '600' }}>Task {IndividualTask?._id}</span>
                                </div>

                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input type='text' placeholder='Enter name' style={{ fontSize: '16px', width: '100%' }} value={IndividualTask?.name} onChange={(e) => { setIndividualTask((prev) => ({ ...prev, name: e.target.value })) }}></input>
                            </div>


                            <div style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', }} onClick={() => {
                                    document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.add('showuserStoryEditAllUserBox')
                                }}>
                                    <div>
                                        {(IndividualTask?.owner?.image !== undefined && IndividualTask?.owner?.image.url !== "") ? <img
                                            style={{
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                maxWidth: "100%",
                                                height: '35px', width: '35px', marginLeft: '0',
                                                display: 'block'
                                            }}
                                            src={
                                                IndividualTask?.owner?.image !== undefined && IndividualTask?.owner?.image !== "" ? IndividualTask?.owner?.image.url : "/profile.png"
                                            }
                                            alt="Profile"
                                        /> : <NameGenerator userName={IndividualTask?.owner?.userName} sizes={{ height: '35px', width: '35px', fontSize: '8px' }} />}

                                    </div>
                                    <div>{IndividualTask?.owner?.userName} <i className='fas fa-caret-down'></i> (Owner)</div>

                                </div>
                                <div className='userStoryEditAllUserBox' style={{ display: 'none', cursor: 'pointer' }} onMouseLeave={() => {
                                    document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.remove('showuserStoryEditAllUserBox')
                                }}>
                                    {users?.map(d => (
                                        <div onClick={(e) => {
                                            setIndividualTask((prev) => ({ ...prev, owner: d }))
                                            document.getElementsByClassName('userStoryEditAllUserBox')[0].classList.remove('showuserStoryEditAllUserBox')
                                        }}>
                                            {d.userName}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', marginTop: '10px', position: 'relative' }}>
                                <div>
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer' }} onClick={() => {
                                        document.getElementsByClassName('userStoryEditStatus')[0].classList.add('showuserStoryEditStatus')
                                    }}>
                                        <div className='' style={{ borderRadius: '50%', height: '10px', width: '10px', background: taskStatuses.filter(f => f.status == IndividualTask?.status)[0].color }}></div> <div>{IndividualTask?.status} <i className='fas fa-caret-down'></i></div>
                                    </div>
                                    <div className='userStoryEditStatus' style={{ display: 'none', cursor: 'pointer' }}
                                        onMouseLeave={() => {
                                            document.getElementsByClassName('userStoryEditStatus')[0].classList.remove('showuserStoryEditStatus')
                                        }}
                                    >
                                        {taskStatuses?.map(d => (
                                            <div onClick={(e) => {
                                                setIndividualTask((prev) => ({ ...prev, status: d.status }))
                                                document.getElementsByClassName('userStoryEditStatus')[0].classList.remove('showuserStoryEditStatus')
                                            }}>
                                                {d.status}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    Updated by {IndividualTask?.lastUpdatedBy?.userName}, {formatDate(IndividualTask?.updatedAt)}
                                </div>
                            </div>



                        </div>
                    }
                </div>
                <div className='detailsContainer'>
                    <div className='' style={{flex: '1'}}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', padding: '10px' }}>
                                <label>Description</label>
                                <textarea
                                    style={{ resize: "none", outline: 'none', border: '1px solid lightgray', fontSize: '16px', width: '50%', height: '150px', padding: '10px' }} value={IndividualTask?.description} onChange={(e) => { setIndividualTask((prev) => ({ ...prev, description: e.target.value })) }}
                                    id=""
                                    cols="2"
                                    rows="12"
                                    name="message"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <button disabled={IndividualTask?.name == '' || IndividualTask?.description == ''} onClick={updateTasks}>Update {window.location.pathname.includes('userStory') ? 'User Story' : 'Task'}</button>
                        </div>

                        <div style={{ padding: '10px' }}>
                            <label>Discussion</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div>
                                        {(image !== undefined && image !== "") ? <img
                                            style={{
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                maxWidth: "100%",
                                                height: '60px', width: '60px',
                                                display: 'block', marginLeft: '0px',
                                            }}
                                            src={
                                                image !== undefined && image !== "" ? image : "/profile.png"
                                            }
                                            alt="Profile"
                                        /> : <NameGenerator userName={userName} sizes={{ height: '60px', width: '60px', fontSize: '26px' }} />}

                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                                        <textarea
                                            style={{ resize: "none", outline: 'none', border: '1px solid lightgray', fontSize: '16px', width: '400px', padding: '10px' }} value={newComment} onChange={(e) => { setNewComment(e.target.value) }}
                                            id=""
                                            cols="10"
                                            rows="2"
                                            name="message"
                                            placeholder="Description"
                                        ></textarea>
                                        <div style={{ cursor: 'pointer' }} onClick={addTaskComment}><SendIcon /></div>
                                    </div>
                                </div>
                                {IndividualTaskComment?.map(us => (
                                    <TaskComments us={us} />
                                ))}
                            </div>
                        </div>
                    </div>

                    
                </div>

            </div>
        </Dialog>
    )
}

export default EditTask