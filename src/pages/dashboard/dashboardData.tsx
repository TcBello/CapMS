const dailyVisitsInitialData = {
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
            text: "0",
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
        labels: ["Jan 1, 2022", "Jan 2, 2022"]
    },
    series: [
        {
            name: 'Daily Visits',
            data: [0, 1]
        }
    ]
};

function setDailyVisitsData(dates: string[], dailyVisits: number[]){
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
                text: dailyVisits[dailyVisits.length - 1].toString(),
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
            labels: dates
        },
        series: [
            {
                name: 'Daily Visits',
                data: dailyVisits
            }
        ]
    };

    return dailyVisitsData;
}

const projectStatusInitialData = {
    options: {
        chart: {
            id: "project-status-chart",
        },
        title: {
            text: "Topic Proposal",
            style: {
                fontSize: "24px",
            }
        },
        dataLabels: {
            enabled: true
        },
        labels: ["Pending", "Approved", "Denied"],
    },
    series: [5, 5, 5],
};

function setProjectStatusData(approved: number, denied: number, pending: number){
    const projectStatus = {
        options: {
            chart: {
                id: "project-status-chart",
            },
            title: {
                text: "Topic Proposal",
                style: {
                    fontSize: "24px",
                }
            },
            dataLabels: {
                enabled: true
            },
            labels: ["Pending", "Approved", "Denied"],
        },
        series: [pending, approved, denied],
    };

    return projectStatus;
}

const facultyStaffStatusInitialData = {
    options: {
        chart: {
            id: "faculty-staff-chart",
        },
        title: {
            text: "Faculty Status",
            style: {
                fontSize: "24px",
            }
        },
        dataLabels: {
            enabled: true
        },
        labels: ["Available", "Unavailable"],
    },
    series: [5, 5],
};

function setFacultyStaffStatusData(available: number, unavailable: number){
    const facultyStaffStatusInitialData = {
        options: {
            chart: {
                id: "faculty-staff-chart",
            },
            title: {
                text: "Faculty Status",
                style: {
                    fontSize: "24px",
                }
            },
            dataLabels: {
                enabled: true
            },
            labels: ["Available", "Unavailable"],
        },
        series: [available, unavailable],
    };

    return facultyStaffStatusInitialData;
}

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

export {
    dailyVisitsInitialData,
    setDailyVisitsData,
    projectStatusInitialData,
    setProjectStatusData,
    facultyStaffStatusInitialData,
    setFacultyStaffStatusData,
    teamStatus
};