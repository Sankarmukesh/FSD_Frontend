import moment from "moment"

// export const socket_io = "https://beyinc-socket.onrender.com"
export const socket_io = process.env.REACT_APP_SOCKET_IO

export const taskStatuses = [
    { color: '#0078D4', status: 'New' }, // Blue
    { color: '#FF8C00', status: 'Active' }, // Orange
    { color: '#FF0000', status: 'Failed' }, // Red
    { color: '#00FF00', status: 'Fixed' }, // Green
    { color: '#FFFF00', status: 'Assigned/Fix-In-Progress' }, // Yellow
    { color: '#FFD700', status: 'Ready For Retest' }, // Gold
    { color: '#32CD32', status: 'Resolved' }, // Lime Green
    { color: '#808080', status: 'Deferred' }, // Gray
    { color: '#A9A9A9', status: 'Closed' } // Dark Gray
];




export const convertToDate = (inputDate) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = inputDate?.split('-')[1][0] == '0' ? inputDate?.split('-')[1][1] - 1 : inputDate?.split('-')[1] - 1
    return `${months[date]} ${inputDate?.split('-')[0]}`

}


// gives in format 2024-jan-08
export const formatedDate = (inputDate) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = inputDate?.split('-')[1][0] == '0' ? inputDate?.split('-')[1][1] - 1 : inputDate?.split('-')[1] - 1
    return `${inputDate?.split('-')[2].slice(0, 2)} ${months[date]} ${inputDate?.split('-')[0]}`

}

