import React from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import AssignmentIcon from '@mui/icons-material/Assignment';

const CreateItemDecider = ({ type, color }) => {
    let icon = null;

    switch (type) {
        case 'task':
            icon = <AssignmentIcon style={{color: color}}/>;
            break;
        case 'bug':
            icon = <BugReportIcon style={{ color: color }} />;
            break;
        default:
            break;
    }

    return <div>{icon}</div>;
};

export default CreateItemDecider;
