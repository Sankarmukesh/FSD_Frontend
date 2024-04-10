import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServices } from '../../../Services/ApiServices';
import { setToast } from '../../../redux/AuthReducers/AuthReducer';
import { ToastColors } from '../../Toast/ToastColors';
import { setProjectId } from '../../../redux/ProjectsReducers/ProjectReducer';


const AddProjectPopup = ({ open, setOpen, setAllProjects, type, selectedProject, allProjects , setSelectedProject}) => {
    const { email, image, user_id, userName } = useSelector(
        (store) => store.auth.loginDetails
    );
    const dispatch = useDispatch();

    const [projectName, setProjectName] = useState('')
    useEffect(() => {
        dispatch(
            setProjectId(selectedProject)
        );
        if (Object.keys(selectedProject).length>0 && type=='update') {
            setProjectName(selectedProject.name)
        } else {
            setProjectName('')
            setProjectId({})
        }
    }, [selectedProject, type])
    const handleClose = () => {
        setOpen(false);
    };

    const addingProject = async() => {
        await ApiServices.addProject({ name: projectName }).then(res => {
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
        await ApiServices.updateProject({ projectId: selectedProject._id, name: projectName }).then(res => {
            // console.log(allProjects.map(a => a._id == selectedProject._id ? { ...a, name: projectName } : a));
            setAllProjects(allProjects.map(a => a._id == selectedProject._id ? { ...a, name: projectName } : a))
            dispatch(
                setToast({
                    message: "Project Updated",
                    bgColor: ToastColors.success,
                    visible: "yes",
                })
            );
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
                <b> {type=='update'? "Updating Project" : "Adding Project"}</b>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label>Project Name</label>
                    <input style={{width: '100%'}} type="text" name="" id="" value={projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder='Enter Project Name' />
                    <button disabled={projectName == ''} style={{ padding: '5px', width: '100%' }} onClick={(Object.keys(selectedProject).length && type=='update') ? updateProject: addingProject}>{(Object.keys(selectedProject).length && type=='update') ? 'Update Project' : 'Add Project'}</button>
                </DialogContentText>
            </DialogContent>
        </Dialog>

    );
};

export default AddProjectPopup;
