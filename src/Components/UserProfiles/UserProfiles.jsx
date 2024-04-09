import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../Services/ApiServices'
import { useDispatch, useSelector } from "react-redux";
import { setToast } from '../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../Toast/ToastColors';
import './UserProfile.css'
import UserProfileFilters from './UserProfileFilters';
import UserCard from './UserCard';

const UserProfiles = () => {
    const [users, setUsers] = useState([])
    const [allRoles, setAllRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [filteredData, setFilteredData]  = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
         ApiServices.getAllUsers({ type: '' }).then(res => {
                setUsers(res.data)
         }).catch(err => {
             setToast({
                 message: "Error occured !",
                 bgColor: ToastColors.failure,
                 visible: "yes",
             })
        })
    }, [])

    useEffect(() => {
        ApiServices.getAllRoles().then(res => {
            setAllRoles(res.data)
        }).catch(err => {
            dispatch(setToast({
                message: "Error occured !",
                bgColor: ToastColors.failure,
                visible: "yes",
            }))
        })
    }, [])


    useEffect(() => {
        if (users.length > 0) {
            if (selectedUser==='') {
                setFilteredData([...users])
            } else {
                setFilteredData(users.filter(us => us.userName === selectedUser))
            }
        }
    }, [selectedUser, users])

  return (
      <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {/* <UserProfileFilters setValue={setSelectedRole} data={allRoles} />  */}
          <UserProfileFilters setValue={setSelectedUser} data={users.map(u=>u.userName)} value={selectedUser} /> 
          <div className='useCardContainer'>
              {filteredData?.map(us => (
                  <UserCard d={us} allRoles={allRoles} />
              ))}
          </div>


      </div>
  )
}

export default UserProfiles