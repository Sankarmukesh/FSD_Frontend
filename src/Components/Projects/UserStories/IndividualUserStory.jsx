import React from 'react'
import { taskStatuses } from '../../../Utils'
import ListIcon from '@mui/icons-material/List';
import { ApiServices } from '../../../Services/ApiServices';
import { useSelector, useDispatch } from 'react-redux';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { useNavigate } from 'react-router-dom';
import NameGenerator from '../../Common/NameGenerator';

const IndividualUserStory = ({ projectId, setallUserStories, au, allUserStories }) => {
    const { email, role } = useSelector((store) => store.auth.loginDetails);

    const navigate=  useNavigate()
    const dispatch = useDispatch()
    const deleteUserStory = async () => {
        const result = window.confirm("Are you sure you want to delete? Once the User Story is deleted, all related tasks will be deleted automatically.");
        if (result === true) {
            await ApiServices.deleteUserStory({ userStoryid: au._id }).then(res => {
                setallUserStories(allUserStories.filter(allU => allU._id !== au._id))
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
    <div className='userStoryDetails'>
            <div className='userStoryCard minimalUserStoryCard' style={{ borderLeft: `3px solid ${taskStatuses.filter(f => f.status == au.status)[0]?.color}`}}>
                <div style={{position: 'absolute', right: '8px', fontSize: '12px', cursor: 'pointer'}} onClick={(e)=>{
                    document.getElementById(`userStoryMenucard${au._id}`).classList.toggle('show')
                }}>
                    <ListIcon />
                </div>
                <div className={`userStoryMenucard`} id={`userStoryMenucard${au._id}`} style={{ display: 'none' }} onMouseLeave={() => {
                    document.getElementById(`userStoryMenucard${au._id}`).classList.remove('show')

                }}>
                    <div onClick={() => {
                        navigate(`/userStory/${projectId}/${au._id}/edit`)
                    }}>Edit</div>
                    {role !== 'individual' && <div onClick={deleteUserStory}>Delete</div>}
                </div>
                <div onClick={() => {
                    navigate(`/userStory/${projectId}/${au._id}/edit`)
                }} style={{display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer'}} className='textUnderLinehover'>
                    <i class="fas fa-book-open" style={{ color: taskStatuses.filter(f => f.status == au.status)[0]?.color }}></i><span style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '18px', fontWeight: '600'}}>{au.name}</span>
                </div>
                <div onClick={() => {
                    navigate(`/userStory/${projectId}/${au._id}/edit`)
                }} className='textUnderLinehover' style={{ fontSize: '14px', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                   {au.description}
                </div>
                <div onClick={() => {
                    navigate(`/userStory/${projectId}/${au._id}/edit`)
                }} style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '10px' }} className='textUnderLinehover'>
                   <div className='' style={{borderRadius: '50%', height: '10px', width: '10px' ,background: taskStatuses.filter(f=>f.status==au.status)[0]?.color}}></div> <div>{au.status} </div>
                </div>
                <div onClick={() => {
                    navigate(`/userStory/${projectId}/${au._id}/edit`)
                }} className='textUnderLinehover' style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div>
                        {(au.owner?.image !== undefined && au.owner?.image!="" && au.owner?.image.url !== "") ? <img
                            style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                maxWidth: "100%",
                                height: '25px', width: '25px', margin: '5px 2px 5px -2px',
                                display: 'block'
                            }}
                            src={
                                au.owner?.image !== undefined && au.owner?.image !== "" ? au.owner?.image.url : "/profile.png"
                            }
                            alt="Profile"
                        /> : <NameGenerator userName={au.owner?.userName} sizes={{ height: '15px', width: '15px', fontSize: '8px' }} />}

                    </div>
                    <div style={{ fontSize: '10px' }}>{au.owner?.userName}</div>
                </div>
                
              </div>
    </div>
  )
}

export default IndividualUserStory