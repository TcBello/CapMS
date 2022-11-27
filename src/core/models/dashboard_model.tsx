interface DashboardModel{
    schoolYear: string,
    dailyVisits: number[],
    dailyVisitsDates: string[],
    totalFaculty: string,
    totalStudents: string,
    pendingProject: number,
    approvedProject: number,
    deniedProject: number,
    availableFaculty: number,
    unavailableFaculty: number
};

function setDashboardModel({
    schoolYear = "",
    dailyVisits = [],
    dailyVisitsDates = [],
    totalFaculty = "",
    totalStudents = "",
    pendingProject = 0,
    approvedProject = 0,
    deniedProject = 0,
    availableFaculty = 0,
    unavailableFaculty = 0
}){
    const dashboardModel: DashboardModel = {
        schoolYear: schoolYear,
        dailyVisits: dailyVisits,
        dailyVisitsDates: dailyVisitsDates,
        totalFaculty: totalFaculty,
        totalStudents: totalStudents,
        pendingProject: pendingProject,
        approvedProject: approvedProject,
        deniedProject: deniedProject,
        availableFaculty: availableFaculty,
        unavailableFaculty: unavailableFaculty
    };

    return dashboardModel;
}

export { setDashboardModel };
export default DashboardModel;