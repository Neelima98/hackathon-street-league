import { useState, useEffect, useContext } from "react";
import HomeHeader from "../components/Reusables/Headers/HomeHeader/HomeHeader";
import SearchProvider from "../context/SearchContext";
import MobileHomeHeader from "../components/Reusables/Headers/HomeHeader/MobileHomeHeader";
import { AuthContext } from "../context/AuthContext.jsx";
import HomeGrid from "../components/Pages/Home/Grid/HomeGrid.jsx";
import SeriesGrid from "../components/Pages/Home/SeriesGrid/SeriesGrid.jsx";
import { useTranslation } from "react-i18next";
import { mockSeries } from "../api/mockData";

import { fetchDropdowns } from "../api/dataget";

export default function Lessons() {
  const { t } = useTranslation("lessons");
  const { userInfo } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10); // Items per page

  // State for dropdown filter data
  const [dropdownData, setDropdownData] = useState(null);
  const [dropdownError, setDropdownError] = useState(null);

  // Map dropdownData to filterLists format for NewFilters
  const filterLists = dropdownData
    ? {
        filters: Object.entries(dropdownData).map(([key, values]) => ({
          key,
          values,
        })),
      }
    : { filters: [] };

  // Fetch dropdown data on mount
  useEffect(() => {
    const getDropdowns = async () => {
      const result = await fetchDropdowns();
      if (result.success) {
        setDropdownData(result.data);
        setDropdownError(null);
      } else {
        setDropdownError(result.error);
        setDropdownData(null);
      }
    };
    getDropdowns();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 500); // Shorter delay for demo
    return () => clearTimeout(timer);
  }, []);

  // Fetch paginated lesson plans from API
  useEffect(() => {
    if (activeTab === "videos") {
      const fetchLessonPlans = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:8080/api/lesson-plans?page=${currentPage}&limit=${pageSize}`,
          );
          if (response.ok) {
            let data = await response.json();

            // If API returns all 1000 entries (not paginated), slice them ourselves
            if (Array.isArray(data)) {
              const startIndex = (currentPage - 1) * pageSize;
              const endIndex = startIndex + pageSize;
              const paginatedData = data.slice(startIndex, endIndex);

              setLessonPlans(paginatedData);
              setTotalPages(Math.ceil(data.length / pageSize));
            } else if (data.data) {
              // If API already returns paginated data
              setLessonPlans(data.data);
              setTotalPages(
                data.totalPages || Math.ceil(data.total / pageSize),
              );
            }
          }
        } catch (error) {
          console.error("Error fetching lesson plans:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLessonPlans();
    }
  }, [activeTab, currentPage, pageSize]);

  return (
    <div className="min-h-screen-bg-white">
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
            {/* Fun & Sleek Tab Navigation */}
            <div className="px-4 py-6">
              <div className="flex items-center justify-start">
                <div className="relative flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1.5 shadow-inner border border-gray-200 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveTab("videos")}
                    className={`relative px-6 py-3 text-base font-fun font-semibold rounded-full transition-all duration-300 ease-in-out transform cursor-pointer ${
                      activeTab === "videos"
                        ? "bg-[#302f2c] text-white shadow-lg scale-105 -translate-y-0.5"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <span className="relative z-10">🎬 {t("Lessons")}</span>
                    {activeTab === "videos" && (
                      <div className="absolute inset-0 bg-[#1e2230] rounded-full blur-lg opacity-30 animate-pulse"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("series")}
                    className={`relative px-6 py-3 text-base font-fun font-semibold rounded-full transition-all duration-300 ease-in-out transform cursor-pointer ${
                      activeTab === "series"
                        ? "bg-[#302f2c] text-white shadow-lg scale-105 -translate-y-0.5"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <span className="relative z-10">
                      📚 {t("Smart Planner")}
                    </span>
                    {activeTab === "series" && (
                      <div className="absolute inset-0 bg-[#1e2230] rounded-full blur-lg opacity-30 animate-pulse"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {activeTab === "videos" ? (
              <div>
                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
                  </div>
                )}
                {!loading && lessonPlans.length > 0 && (
                  <>
                    <HomeGrid
                      filterLists={filterLists}
                      data={lessonPlans}
                      hasMoreVideos={false}
                      fetchNextVideos={() => {}}
                      loadingMore={false}
                    />

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 py-8">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg transition"
                      >
                        Previous
                      </button>
                      <span className="text-gray-700 font-semibold">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-[#302f2c] cursor-pointer hover:bg-[#1e5edb] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {!loading && lessonPlans.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No lesson plans found
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <SeriesGrid />
            )}
          </>
        )}
      </SearchProvider>
    </div>
  );
}
