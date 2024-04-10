import React from 'react'
import { dateDayStructure, formatDate, taskStatuses } from '../../../Utils'
import ListIcon from '@mui/icons-material/List';
import { ApiServices } from '../../../Services/ApiServices';
import { useSelector, useDispatch } from 'react-redux';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { useNavigate } from 'react-router-dom';
import NameGenerator from '../../Common/NameGenerator';
import AssignmentIcon from '@mui/icons-material/Assignment';

const IndividualTaskCard = ({ tasks, projectId, setallUserStories, userStory, allUserStories }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteTasks = async () => {
        const result = window.confirm("Are you sure you want to delete task? ");
        if (result === true) {
            await ApiServices.deleteTasks({ taskId: tasks._id }).then(res => {
                setallUserStories(allUserStories.map(allU => allU._id == userStory._id ? { ...allU, taskIds: allU.taskIds.filter(tf=>tf._id!==tasks._id)} :allU))
            }).catch(err => {
                dispatch(setToast({
                    message: err.response.data.message,
                    bgColor: ToastColors.failure,
                    visible: "yes",
                }))
            })
        }
    }
    return (
        <div className='userStoryDetails' style={{ marginLeft: taskStatuses.filter(f => f.status == tasks?.status)[0]?.left }}>
            <div className='userStoryCard taskCard' style={{ borderLeft: `3px solid ${taskStatuses.filter(f => f.status == tasks?.status)[0]?.color}`}}>
                <div style={{ position: 'absolute', right: '8px', fontSize: '12px', cursor: 'pointer' }} onClick={(e) => {
                    document.getElementById(`userStoryMenucard${tasks._id}`).classList.add('show')
                }}>
                    <ListIcon />
                </div>
                <div className={`userStoryMenucard`} id={`userStoryMenucard${tasks._id}`} style={{ display: 'none' }} onMouseLeave={() => {
                    document.getElementById(`userStoryMenucard${tasks._id}`).classList.remove('show')

                }}>
                    <div onClick={() => {
                        navigate(`/task/${projectId}/${userStory._id}/${tasks._id}/edit`)
                    }}>Edit</div>
                    <div onClick={deleteTasks}>Delete</div>
                </div>
                <div onClick={() => {
                    navigate(`/task/${projectId}/${userStory._id}/${tasks._id}/edit`)
                }} style={{ display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer' }} className='textUnderLinehover'>
                    <AssignmentIcon style={{ color: taskStatuses.filter(f => f.status == tasks?.status)[0]?.color }} /><span style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '18px', fontWeight: '600' }}>{tasks.name}</span>
                </div>
                <div onClick={() => {
                    navigate(`/task/${projectId}/${userStory._id}/${tasks._id}/edit`)
                }} className='textUnderLinehover' style={{ fontSize: '14px', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                    {tasks.description}
                </div>
                <div onClick={() => {
                    navigate(`/task/${projectId}/${userStory._id}/${tasks._id}/edit`)
                }} style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '14px' }} className='textUnderLinehover'>
                    <div className='' style={{ borderRadius: '50%', height: '10px', width: '10px', background: taskStatuses.filter(f => f.status == tasks?.status)[0]?.color }}></div> <div>{tasks?.status} </div>
                </div>
                <div onClick={() => {
                    navigate(`/task/${projectId}/${userStory._id}/${tasks._id}/edit`)
                }} className='textUnderLinehover' style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div>
                        {(tasks.owner.image !== undefined && tasks.owner.image.url !== "") ? <img
                            style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                maxWidth: "100%",
                                height: '25px', width: '25px', marginLeft: '0',
                                display: 'block'
                            }}
                            src={
                                tasks.owner.image !== undefined && tasks.owner.image !== "" ? tasks.owner.image.url : "/profile.png"
                            }
                            alt="Profile"
                        /> : <NameGenerator userName={tasks.owner.userName} sizes={{ height: '15px', width: '15px', fontSize: '8px' }} />}

                    </div>
                    <div>
                        <div>{tasks.owner.userName}</div>
                        <div>Due date- {dateDayStructure(tasks.due)}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default IndividualTaskCard