import moment from "moment"

// export const socket_io = "https://beyinc-socket.onrender.com"
export const socket_io = process.env.REACT_APP_SOCKET_IO

export const taskStatuses = [
    { color: '#0078D4', status: 'New', left: '0'}, // Blue
    { color: '#FF8C00', status: 'Active', left: '260px' }, // Orange
    { color: '#FF0000', status: 'Failed', left: '500px' }, // Red
    { color: '#00FF00', status: 'Fixed', left: '750px' }, // Green
    { color: '#FFFF00', status: 'Assigned/Fix-In-Progress', left: '1000px' }, // Yellow
    { color: '#FFD700', status: 'Ready For Retest', left: '1300px' }, // Gold
    { color: '#32CD32', status: 'Resolved', left: '1530px' }, // Lime Green
    { color: '#808080', status: 'Deferred', left: '1780px' }, // Gray
    { color: '#A9A9A9', status: 'Closed', left: '2020px' } // Dark Gray
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
export function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const inputDate = new Date(date);

    if (inputDate.toDateString() === today.toDateString()) {
        return "Today " + inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (inputDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else if (inputDate.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
    } else {
        return moment(inputDate).format("YYYY-MM-DD");
    }
}

export const dateDayStructure = (d) => {
    const dateString = d;
    const date = new Date(dateString);

    // Get the month, day, and year
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date in "Month Day, Year" format
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate; // Output: "April 20, 2024"

}

