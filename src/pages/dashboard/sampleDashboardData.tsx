const dailyVisitsData = {
    options: {
        chart: {
            id: "daily-visit-chart",
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            stroke: {
                show: true,
                curve: "straight"
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: "129",
            style: {
                fontSize: "28px"
            }
        },
        subtitle: {
            text: "Daily Visits",
            style: {
                fontSize: "18px"
            }
        },
    },
    series: [
        {
            name: 'Daily Visits',
            data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 129]
        }
    ]
};

const projectStatus = {
    options: {
        chart: {
            id: "project-status-chart",
        },
        title: {
            text: "Project Status",
            style: {
                fontSize: "24px",
            }
        },
        dataLabels: {
            enabled: true
        },
        labels: ["Pending", "Approved", "Denied"],
    },
    series: [50, 90, 20],
};

const facultyStaffStatus = {
    options: {
        chart: {
            id: "faculty-staff-chart",
        },
        title: {
            text: "Faculty Staffs Status",
            style: {
                fontSize: "24px",
            }
        },
        dataLabels: {
            enabled: true
        },
        labels: ["Available", "Unavailable"],
    },
    series: [20, 40],
};

const teamStatus = {
    options: {
        chart: {
            id: "team-status-chart",
        },
        title: {
            text: "Team Status",
            style: {
                fontSize: "24px",
            }
        },
        dataLabels: {
            enabled: true
        },
        labels: ["Has Approved Topic", "None Approved Topic"],
    },
    series: [100, 20],
};

export { dailyVisitsData, projectStatus, facultyStaffStatus, teamStatus };