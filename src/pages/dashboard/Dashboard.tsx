import { IonCard, IonContent, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import "./Dashboard.css";
import "../../core/components/Spacer.css";
import Chart from "react-apexcharts";
import { dailyVisitsInitialData, facultyStaffStatusInitialData, projectStatusInitialData, setDailyVisitsData, setFacultyStaffStatusData, setProjectStatusData, teamStatus } from "./dashboardData";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../core/services/admin_service";
import { setDashboardModel } from "../../core/models/dashboard_model";

const Dashboard = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [dashboard, setDashboard] = useState(setDashboardModel({
        schoolYear: "S.Y. 0000-0000",
        totalStudents: "0",
        totalFaculty: "0"
    }));
    const [projectStatus, setProjectStatus] = useState(projectStatusInitialData);
    const [facultyStaffStatus, setFacultyStaffStatus] = useState(facultyStaffStatusInitialData);
    const [dailyVisits, setDailyVisits] = useState(dailyVisitsInitialData);

    useEffect(() => {
        getDashboardData().then(value => {
            setDashboard(value);
            setProjectStatus(setProjectStatusData(value.approvedProject, value.deniedProject, value.pendingProject));
            setFacultyStaffStatus(setFacultyStaffStatusData(value.availableFaculty, value.unavailableFaculty));
            setDailyVisits(setDailyVisitsData(value.dailyVisitsDates, value.dailyVisits));
        });
    }, []);

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Dashboard" />
                : <MobileMenuAppBar title="Dashboard" />
        }
        {/* CONTENT */}
        <IonContent className="dashboard-content">
            <div className="spacer-h-s" />
            <div className={isDesktop ? "dashboard-upper-part" : "dashboard-upper-part-mobile"}>
                {/* SCHOOL YEAR CARD */}
                <IonCard className={isDesktop ? "dashboard-school-year-card" : "dashboard-school-year-card-mobile"}>
                    <h1 className="dashboard-school-year">{dashboard.schoolYear}</h1>
                </IonCard>
                {/* DAILY VISIT CHART */}
                <IonCard className="dashboard-daily-visit-card">
                    <Chart
                        type="area"
                        options={dailyVisits.options}
                        series={dailyVisits.series}
                        width={isDesktop ? (window.innerWidth * 0.22) : 350}
                        height={200}
                    />
                </IonCard>
                <div className={isDesktop ? "dashboard-total-user-container" : "dashboard-total-user-container-mobile"}>
                    {/* TOTAL FACULTY STAFF CARD */}
                    <IonCard className={isDesktop ? "dashboard-total-user-card" : "dashboard-total-user-card-mobile"}>
                        <IonItem>
                           <IonIcon slot="start" icon="/assets/icon/faculty.svg" className="total-faculty-icon" />
                           <IonLabel>
                                <h1>{dashboard.totalFaculty}</h1>
                                <p>Faculty Staffs</p> 
                           </IonLabel>
                        </IonItem>
                    </IonCard>
                    {/* TOTAL STUDENT CARD */}
                    <IonCard className={isDesktop ? "dashboard-total-user-card" : "dashboard-total-user-card-mobile"}>
                        <IonItem lines="none" className={isDesktop ? "dashboard-total-user-card" : "dashboard-total-user-card-mobile"}>
                           <IonIcon slot="start" icon="/assets/icon/student.svg" className="total-faculty-icon" />
                           <IonLabel>
                                <h1>{dashboard.totalStudents}</h1>
                                <p>Students</p> 
                           </IonLabel>
                        </IonItem>
                    </IonCard>
                </div>
            </div>
            <div className="spacer-h-s" />
            <div className="dashboard-pie-charts-container">
                {/* PROJECT STATUS CHART */}
                <IonCard className="dashboard-pie-charts-card">
                    <Chart
                        options={projectStatus.options}
                        series={projectStatus.series}
                        type="donut"
                        width={isDesktop ? window.innerWidth * 0.325 : 400}
                        height={300}
                    />
                </IonCard>
                {/* FACULTY STAFF STATUS CHART */}
                <IonCard className="dashboard-pie-charts-card">
                    <Chart
                        options={facultyStaffStatus.options}
                        series={facultyStaffStatus.series}
                        type="donut"
                        width={isDesktop ? window.innerWidth * 0.325 : 400}
                        height={300}
                    />
                </IonCard>
            </div>
        </IonContent>
    </IonPage>
}

export default Dashboard;