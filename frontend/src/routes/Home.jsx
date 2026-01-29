import { useState, useEffect, useContext } from "react";
import HomeHeader from "../components/Reusables/Headers/HomeHeader/HomeHeader";
import SearchProvider from "../context/SearchContext";
import MobileHomeHeader from "../components/Reusables/Headers/HomeHeader/MobileHomeHeader";
import { AuthContext } from "../context/AuthContext.jsx";
import Layout from "../components/Pages/Home/Layout";
import NewsAnnouncements from "../components/Pages/Home/NewsCards";
import { Notes } from "../components/Pages/Home/Notes";
import TodaysSessions from "../components/Pages/Home/TodaySessions";
import WeeklySchedule from "../components/Pages/Home/WeeklySessions";
import PendingTasks from "../components/Pages/Home/PendingTasks.jsx";
import StaffWorkshops from "../components/Pages/Home/StaffWorkshops.jsx";
import PreviousLearningPlans from "../components/Pages/Home/previousLearningPlans.jsx";

export default function Home() {
  const { userInfo } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 500); // Shorter delay for demo
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen-bg-white pb-[73px]">
      <SearchProvider>
        {/* Header is always rendered */}
        <div className="hidden md:block">
          <HomeHeader userInfo={userInfo} />
        </div>
        <div className="block md:hidden">
          <MobileHomeHeader userInfo={userInfo} />
        </div>

        {/* Spinner for main content */}
        {showSpinner ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
          </div>
        ) : (
          <>
            <Layout
              sidebar={
                <>
                  <Notes />

                  <PendingTasks
                    items={[
                      {
                        id: "t1",
                        title: "Sign off Lesson Plan",
                        dueDate: "2026-01-30",
                        tag: "Admin",
                        status: "Pending",
                      },
                      {
                        id: "t2",
                        title: "Submit Session 8 Attendance",
                        dueDate: "2026-01-29",
                        tag: "Workshop",
                        status: "InProgress",
                      },
                    ]}
                    onViewAll={() => console.log("View all tasks")}
                  />

                  <StaffWorkshops />
                  <PreviousLearningPlans />
                </>
              }
            >
              <div className="space-y-4">
                <NewsAnnouncements />
                <TodaysSessions />
                <WeeklySchedule />
              </div>
            </Layout>
          </>
        )}
      </SearchProvider>
    </div>
  );
}
