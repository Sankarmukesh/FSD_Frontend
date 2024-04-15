import React, { useState } from 'react'
import NameGenerator from '../Common/NameGenerator'
import { ApiServices } from '../../Services/ApiServices'
import { useDispatch, useSelector } from "react-redux";
import { setToast } from '../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../Toast/ToastColors';

const UserCard = ({ d, allRoles }) => {
    const [updatedRole, setUpdatedRole] = useState('')
    const dispatch = useDispatch()
    const updateRole = async () => {
        if (updatedRole !== '') {
            await ApiServices.changeUserRoles({ id: d?._id, role: updatedRole }).then(res => {
                d.role = updatedRole
                dispatch(setToast({
                    message: "Role Updated for " + d?.userName,
                    bgColor: ToastColors.success,
                    visible: "yes",
                }))
            }).catch(err => {
                dispatch(setToast({
                    message: "Error occured !",
                    bgColor: ToastColors.failure,
                    visible: "yes",
                }))
            })
        }
    }
  return (
      <div className='singleUserCard'>
          {(d?.image !== undefined && d?.image!=='' && d?.image.url !== '') ? <img
              style={{
                  borderRadius: "50%",
                  maxWidth: "100%",
                  height: '100px', width: '100px',
                  display: 'block',
                  marginLeft: '0px'
              }}
              src={ d?.image.url }
              alt="Profile"
          /> : <NameGenerator userName={d?.userName} sizes={{ height: '80px', width: '80px', fontSize: '26px' }} />}
          <div>
              <div style={{ whiteSpace: 'nowrap', width: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }} className='cardEmail'>{d?.email}</div>
              <div className='cardEmail' style={{ whiteSpace: 'nowrap', width: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{d?.userName}</div>
              <div className=''>
                  <select name="" id="" onChange={(e) => {
                      setUpdatedRole(e.target.value)
                  }}>
                      {allRoles.map(op => (
                          <option value={op.role} selected={op.role===d?.role}>{op.role}</option>
                      ))}
                  </select>
              </div>
              <div>
                  <button disabled={updatedRole == ''} style={{ padding: '5px',  marginTop: '5px'}} onClick={updatedRole!=='' && updateRole}>Update Role</button>
              </div>
          </div>
    </div>
  )
}

export default UserCard