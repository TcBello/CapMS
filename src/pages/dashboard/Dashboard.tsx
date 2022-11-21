import { IonCard, IonContent, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import "./Dashboard.css";
import "../../core/components/Spacer.css";
import Chart from "react-apexcharts";
import { dailyVisitsData, facultyStaffStatus, projectStatus, teamStatus } from "./sampleDashboardData";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    useEffect(() => {
        // do something
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
                    <h1 className="dashboard-school-year">S.Y. 2022-2023</h1>
                </IonCard>
                {/* DAILY VISIT CHART */}
                <IonCard className="dashboard-daily-visit-card">
                    <Chart
                        type="area"
                        options={dailyVisitsData.options}
                        series={dailyVisitsData.series}
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
                                <h1>41</h1>
                                <p>Faculty Staffs</p> 
                           </IonLabel>
                        </IonItem>
                    </IonCard>
                    {/* TOTAL STUDENT CARD */}
                    <IonCard className={isDesktop ? "dashboard-total-user-card" : "dashboard-total-user-card-mobile"}>
                        <IonItem lines="none" className={isDesktop ? "dashboard-total-user-card" : "dashboard-total-user-card-mobile"}>
                           <IonIcon slot="start" icon="/assets/icon/student.svg" className="total-faculty-icon" />
                           <IonLabel>
                                <h1>169</h1>
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
                        width={400}
                        height={250}
                    />
                </IonCard>
                {/* FACULTY STAFF STATUS CHART */}
                <IonCard className="dashboard-pie-charts-card">
                    <Chart
                        options={facultyStaffStatus.options}
                        series={facultyStaffStatus.series}
                        type="donut"
                        width={400}
                        height={250}
                    />
                </IonCard>
                {/* TEAM STATUS CHART */}
                <IonCard className="dashboard-pie-charts-card">
                    <Chart
                        options={teamStatus.options}
                        series={teamStatus.series}
                        type="donut"
                        width={400}
                        height={250}
                    />
                </IonCard>
            </div>
        </IonContent>
    </IonPage>
}

export default Dashboard;