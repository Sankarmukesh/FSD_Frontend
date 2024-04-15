import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { setProjectId, setProjectUsers } from '../../../redux/ProjectsReducers/ProjectReducer';
import CloseIcon from '@mui/icons-material/Close';


const AddProjectPopup = ({ open, setOpen, setAllProjects, type, selectedProject, allProjects, setSelectedProject }) => {
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const [sendingEmail, setSendingEmail] = useState([])
    const [deletingEmail, setdeletingEmail] = useState([])

    const dispatch = useDispatch();

    const [teamMembers, setTeamMembers] = useState([]);
    const [projectName, setProjectName] = useState('')
    useEffect(() => {
        setTeamMembers([])
        setSendingEmail([])
        setdeletingEmail([])
        dispatch(
            setProjectId(selectedProject)
        );
        if (Object.keys(selectedProject).length > 0 && type == 'update') {
            setProjectName(selectedProject.name)
            setTeamMembers(selectedProject.teamMembers || [])
        } else {
            setProjectName('')
            setProjectId({})
        }
    }, [selectedProject, type])
    const handleClose = () => {
        setTeamMembers([])
        setSendingEmail([])
        setdeletingEmail([])

        setOpen(false);
    };

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

    const addingProject = async () => {
        await ApiServices.addProject({ name: projectName, teamMembers: teamMembers, sendingEmail: sendingEmail }).then(res => {
            setAllProjects((prev) => [...prev, res.data])
            setProjectName('')
            dispatch(
                setToast({
                    message: "Project added",
                    bgColor: ToastColors.success,
                    visible: "yes",
                })
            );
            localStorage.setItem('project', JSON.stringify(res.data));
            setSelectedProject(res.data)
            setTeamMembers([])
            setSendingEmail([])
            setdeletingEmail([])
            setOpen(false)
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

    const updateProject = async () => {
        await ApiServices.updateProject({ projectId: selectedProject._id, name: projectName, teamMembers: teamMembers, sendingEmail: sendingEmail, deletingEmail: deletingEmail }).then(res => {
            // console.log(allProjects.map(a => a._id == selectedProject._id ? { ...a, name: projectName } : a));
            setAllProjects(allProjects.map(a => a._id == selectedProject._id ? { ...a, name: projectName, teamMembers: teamMembers } : a))
            dispatch(
                setToast({
                    message: "Project Updated",
                    bgColor: ToastColors.success,
                    visible: "yes",
                })
            );
            dispatch(setProjectUsers(teamMembers))

            setTeamMembers([])
            setSendingEmail([])
            setdeletingEmail([])
            localStorage.setItem('project', JSON.stringify({ _id: selectedProject._id, name: projectName }));
            setSelectedProject(allProjects.filter(a => a._id == selectedProject._id)[0]);
            setOpen(false)
            setProjectName('')
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


    const addingTeamMembers = (e) => {
        if (!teamMembers?.find((f) => f._id.toString() == e.target.value) && e.target.value!=='') {
            setTeamMembers(prev => [...prev, users?.find((f) => f._id.toString() == e.target.value)])
            setSendingEmail(prev => [...prev, users?.find((f) => f._id.toString() == e.target.value)])
            setdeletingEmail(deletingEmail?.filter((f) => f._id.toString() !== e.target.value))
        }
    }


    const removeTeamMember = (id) => {
        if (teamMembers?.find((f) => f._id.toString() == id)) {
            setdeletingEmail(prev => [...prev, teamMembers?.find((f) => f._id.toString() == id)])
            setSendingEmail(sendingEmail?.filter((f) => f._id.toString() !== id))
            setTeamMembers(teamMembers?.filter((f) => f._id.toString() !== id))
        }
    }
    return (
        <Dialog fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{}}
        >
            <DialogTitle
                id="alert-dialog-title"
                style={{ display: "flex" }}
            >
                <b> {type == 'update' ? "Updating Project" : "Adding Project"}</b>
            </DialogTitle>
            <div style={{padding: ' 5px 25px'}} className='projC'>
                <div style={{ display: "flex", flexDirection: 'column', gap: '5px' }}>
                    <div>
                        <div style={{ color: 'var(--text-total-color)', textAlign: 'start' }}>Project Name</div>
                        <input style={{ width: '100%' }} type="text" name="" id="" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder='Enter Project Name' />
                    </div>

                    <div>
                        <div style={{ color: 'var(--text-total-color)', textAlign: 'start' }}>Team</div>
                        <select style={{ padding: '15px', borderRadius: '5px' }} name="" id="" onChange={(e) => {
                            addingTeamMembers(e)
                        }}>
                            <option value="">Select</option>
                            {users.map((op, i) => (
                                <option value={op._id} id={i}>{op.userName}</option>
                            ))}
                        </select></div>
                    <div className='teamContainer'>
                        {teamMembers?.map((t) => (
                            <div>
                                <div className='teamName'>{t.userName}</div>

                                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => removeTeamMember(t._id)} />
                            </div>

                        ))}
                    </div>
                    <button disabled={projectName == ''} style={{ padding: '5px', width: '100%' }} onClick={(Object.keys(selectedProject).length && type == 'update') ? updateProject : addingProject}>{(Object.keys(selectedProject).length && type == 'update') ? 'Update Project' : 'Add Project'}</button>
                </div>
            </div>
        </Dialog>

    );
};

export default AddProjectPopup;
