import React, { useEffect, useState } from 'react'
import NameGenerator from '../../Common/NameGenerator'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import ImageGenerator from '../../Common/ImageGenerator';

const UserStoryComments = ({ us }) => {
    const [newComment, setNewComment] = useState('')
    const [oldComment, setoldComment] = useState('')

    useEffect(() => {
        if (us.comment !== undefined) {
            setNewComment(us.comment)
            setoldComment(us.comment)
        }
    }, [us])
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const dispatch = useDispatch();
    const updateuserStoryComment = async () => {
        await ApiServices.updateUserStoryComments({ userStoryCommentId: us._id, comment: newComment }).then(res => {
            us.comment = newComment
            setoldComment(newComment)
            dispatch(setToast({
                message: 'Comment updated',
                bgColor: ToastColors.success,
                visible: "yes",
            }))
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
                  {(us?.commentBy?.image !== undefined && us?.commentBy?.image !== "" && us?.commentBy?.image.url !== "") ?
                      <ImageGenerator userName={us?.commentBy?.userName} img={us?.commentBy?.image.url} sizes={{height:'50px', width: '50px'}} />
                    : <NameGenerator userName={us?.commentBy?.userName} sizes={{ height: '40px', width: '40px', fontSize: '26px' }} />}

              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                  <textarea disabled={us?.commentBy?._id !== user_id}
                      style={{ resize: "none", outline: 'none', border: '1px solid lightgray', fontSize: '16px', width: '400px', padding: '10px', color: 'var(--text-total-color)' }} value={newComment} onChange={(e) => { setNewComment(e.target.value) }}
                      id=""
                      cols="30"
                      className='discussionEditUserStory'
                      rows="2"
                      name="message"
                      placeholder="Description"
                  ></textarea>
                  {us?.commentBy?._id == user_id && <div style={{ cursor: 'pointer' }} onClick={updateuserStoryComment}><SendIcon disabled={oldComment==newComment || newComment==''}/></div>}
              </div>
          </div>
    </div>
  )
}

export default UserStoryComments