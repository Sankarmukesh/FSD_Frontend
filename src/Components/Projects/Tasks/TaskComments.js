import React, { useEffect, useState } from 'react'
import NameGenerator from '../../Common/NameGenerator'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';

const TaskComments = ({ us }) => {
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        if (us.comment !== undefined) {
            setNewComment(us.comment)
        }
    }, [us])
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const dispatch = useDispatch();
    const updateTaskComment = async () => {
        await ApiServices.updatetaskComments({ taskId: us._id, comment: newComment }).then(res => {
            us.comment = newComment
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
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                    {(us?.commentBy?.image !== undefined && us?.commentBy?.image !== "" && us?.commentBy?.image.url !== "") ? <img
                        style={{
                            borderRadius: "50%",
                            cursor: "pointer",
                            maxWidth: "100%",
                            height: '60px', width: '60px',
                            display: 'block', marginLeft: '0px',
                        }}
                        src={
                            us?.commentBy?.image !== undefined && us?.commentBy?.image !== "" ? us?.commentBy?.image.url : "/profile.png"
                        }
                        alt="Profile"
                    /> : <NameGenerator userName={us?.commentBy?.userName} sizes={{ height: '60px', width: '60px', fontSize: '26px' }} />}

                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                    <textarea disabled={us?.commentBy?._id !== user_id}
                        style={{ resize: "none", outline: 'none', border: '1px solid lightgray', fontSize: '16px', width: '400px', padding: '10px', color: 'var(--text-total-color)' }} value={newComment} onChange={(e) => { setNewComment(e.target.value) }}
                        id=""
                        cols="30"
                        rows="2"
                        name="message"
                        placeholder="Description"
                    ></textarea>
                    {us?.commentBy?._id == user_id && <div style={{ cursor: 'pointer' }} onClick={updateTaskComment}><SendIcon /></div>}
                </div>
            </div>
        </div>
    )
}

export default TaskComments