import React, { useState } from "react";
import SeriesGridItem from "./SeriesGridItem";

const SeriesGrid = React.memo(() => {
  const Filter = [
    { key: "delivery_method", name: "Delivery Method", values: ["Classroom", "Practical", "Mixed", "One-to-One", "Online", "Group Activity"] },
    { key: "difficulty_level", name: "Difficulty Level", values: ["Intermediate", "Foundation", "Advanced"] },
    { key: "skill_name", name: "Skill Name", values:  ['Reading Comprehension', 'Written Expression', 'Spelling and Grammar', 'Form Completion', 'Email Writing', 'Basic Arithmetic', 'Percentages', 'Money Handling', 'Time Calculations', 'Measurements', 'Computer Basics', 'Internet Navigation', 'Word Processing', 'Spreadsheets', 'Email Management', 'Online Safety', 'Verbal Communication', 'Active Listening', 'Presentation Skills', 'Telephone Skills', 'Body Language', 'Conflict Resolution', 'Time Management', 'Goal Setting', 'Self-Motivation', 'Stress Management', 'Problem Solving', 'Decision Making', 'Adaptability', 'Reliability', 'CV Writing', 'Job Searching', 'Application Forms', 'Interview Preparation', 'Interview Performance', 'Workplace Expectations', 'Professional Appearance', 'Teamwork in Sport', 'Physical Endurance', 'Sports Technique', 'Fair Play', 'Health and Safety Awareness', 'Customer Service', 'Cash Handling', 'Food Hygiene']},
  ];
  
  const [filters, setFilters] = useState(
    Filter.reduce((acc, filter) => {
      acc[filter.key] = "";
      return acc;
    }, {})
  );
  const [draggedModule, setDraggedModule] = useState(null);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(null);
  const [filteredModules, setFilteredModules] = useState([]);
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinningRequirement, setSpinningRequirement] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

  // Mock timetable response from API
  const mockTimetableResponse = [
    { day: "Mon", class: "English", time: "9:00 - 10:30", status: "Fulfilled" },
    { day: "Tues", class: "Math", time: "9:00 - 10:30", status: "Fulfilled" },
    { day: "Wed", class: "Employability Workshop + Presentation", time: "10:00 - 11:00", status: "Fulfilled" },
    { day: "Thur", class: "Employability Workshop", time: "1:00 - 2:00", status: "Fulfilled" },
    { day: "Fri", class: "Safeguarding Workshop", time: "1:00 - 2:00", status: "Fulfilled" },
  ];

  const optionalModules = [
    { name: "CV Writing", rating: 4.6 },
    { name: "Spreadsheet Skills", rating: 4.3},
    { name: "Digital Basics", rating: 4},
    { name: "Travel Planning", rating: 4},
  ];

  const requirementsMet = [
    "240 Mandatory Hours Fulfilled",
    "English & Maths (Fulfilled)",
    "Employability Core (Fulfilled)",
    "Safeguarding Included",
  ];

  // Drag handlers
  const handleDragStart = (e, module) => {
    setDraggedModule(module);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("module", JSON.stringify(module));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDropOnRow = (e, rowIndex) => {
    e.preventDefault();
    
    if (!draggedModule) return;
    
    const duration = draggedModule.actual_duration_minutes || 60;
    const startHour = 9; // Default start time 9:00 AM
    const endHour = startHour + Math.floor(duration / 60);
    const endMinutes = duration % 60;
    
    const timeString = `${startHour}:00 - ${endHour}:${endMinutes.toString().padStart(2, '0')}`;
    
    // Update timetable row
    const updatedTimetable = [...timetableData];
    updatedTimetable[rowIndex] = {
      ...updatedTimetable[rowIndex],
      class: draggedModule.name,
      time: timeString,
      duration: duration,
      code: draggedModule.code,
      skill: draggedModule.skill,
      delivery: draggedModule.delivery,
    };
    
    setTimetableData(updatedTimetable);
    
    // Highlight the row and auto-reset after 2 seconds
    setHighlightedRowIndex(rowIndex);
    setTimeout(() => setHighlightedRowIndex(null), 2000);
    // Trigger requirement check spinner briefly
    setSpinningRequirement(true);
    setTimeout(() => setSpinningRequirement(false), 1400);
    
    setDraggedModule(null);
  };

  const handleSubmitApproval = () => {
    // Clear generated content under the Generate Programme section
    setFilteredModules([]);
    setTimetableData([]);
    // Reset filters to defaults
    setFilters(
      Filter.reduce((acc, filter) => {
        acc[filter.key] = "";
        return acc;
      }, {})
    );

    // Show submitted popup briefly
    setShowSubmitted(true);
    setTimeout(() => setShowSubmitted(false), 1800);
  };

  const handleGenerateProgramme = async () => {
    try {
      setLoading(true);
      // Build query parameters from selected filters
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        // Only add to query if value is not empty and not "Any"
        if (value && value !== "Any" && value !== "") {
          queryParams.append(key, value);
        }
      });

      // Construct the endpoint URL
      const endpoint = `http://localhost:8080/api/lesson-plans${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      console.log("Fetching from:", endpoint);

      // Fetch the filtered data
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log("Filtered data:", data);
        
        // Transform the API response to match the optional modules format
        let modules = [];
        if (Array.isArray(data)) {
          modules = data.map((item) => ({
            name: item.lesson_title || item.name || "Unknown",
            rating: item.difficulty_level ? 4.5 : 4, // Default ratings
            code: item.lesson_code,
            skill: item.skill_name,
            delivery: item.delivery_method,
            day_of_week: item.day_of_week || "Mon",
            actual_duration_minutes: item.actual_duration_minutes || 60,
          }));
        } else if (data.data && Array.isArray(data.data)) {
          modules = data.data.map((item) => ({
            name: item.lesson_title || item.name || "Unknown",
            rating: item.difficulty_level ? 4.5 : 4,
            code: item.lesson_code,
            skill: item.skill_name,
            delivery: item.delivery_method,
            day_of_week: item.day_of_week || "Mon",
            actual_duration_minutes: item.actual_duration_minutes || 60,
          }));
        }
        
        setFilteredModules(modules);
        // Use mock timetable response - replace with actual API call when available
        setTimetableData(mockTimetableResponse);
      } else {
        console.error("Error fetching data:", response.statusText);
        setFilteredModules([]);
        setTimetableData([]);
      }
    } catch (error) {
      console.error("Error generating programme:", error);
      setFilteredModules([]);
      setTimetableData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Smart Programme Planner</h1> */}

      {/* Create Cohort Filter Section */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📅 Create Cohort Filter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Filter.map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.name}:
              </label>
              <select
                value={filters[filter.key]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    [filter.key]: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                {filter.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleGenerateProgramme}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
          >
            Generate Programme
          </button>
          <button 
            onClick={() =>
              setFilters(
                Filter.reduce((acc, filter) => {
                  acc[filter.key] = "";
                  return acc;
                }, {})
              )
            }
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable Section */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Automatic Cohort Timetable</h3>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : timetableData.length > 0 ? (
            <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left font-semibold text-gray-700 pb-3">Day</th>
                    <th className="text-left font-semibold text-gray-700 pb-3">Class</th>
                    <th className="text-left font-semibold text-gray-700 pb-3">Session Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timetableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-200 hover:bg-gray-50 cursor-drop transition-all duration-500 ${
                        highlightedRowIndex === idx
                          ? "bg-green-100 shadow-md ring-2 ring-green-400"
                          : ""
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropOnRow(e, idx)}
                    >
                      <td className="py-3 text-gray-800 font-medium">{row.day}</td>
                      <td className="py-3 text-gray-800 font-semibold">{row.class}</td>
                      <td className="py-3 text-gray-800">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Requirements Met */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <p className="font-semibold text-gray-800 mb-3">Requirements Met: Programme ready for calendar delivery</p>
                <ul className="space-y-2">
                    {requirementsMet.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        {spinningRequirement ? (
                          <span className="text-blue-500">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2"></circle>
                              <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                            </svg>
                          </span>
                        ) : (
                          <span className="text-green-600">✓</span>
                        )} {req}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Select filters and click "Generate Programme" to generate your cohort timetable</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm font-semibold text-gray-800 mb-2">Mandatory hours fulfilled.</p>
            <p className="text-xs text-gray-700">
              Now add optional modules to fulfill 60 additional modules. Drag & drop modules from the list into the timetable to meet cohort needs
            </p>
          </div>

          {/* Optional Modules */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
              Optional Modules
              <span>→</span>
            </h3>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredModules.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {filteredModules.slice(0, Math.max(4, filteredModules.length)).map((module, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => handleDragStart(e, module)}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-100 cursor-move transition-colors border-2 border-transparent hover:border-blue-400"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg">≡</span>
                      <div>
                        <p className="font-medium text-gray-800">{module.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          {module.code && <span className="font-mono">{module.code}</span>}
                          {module.skill && <span className="bg-yellow-100 px-2 py-1 rounded">{module.skill}</span>}
                          {module.delivery && <span className="text-blue-600">{module.delivery}</span>}
                        </div>
                        {module.rating && (
                          <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                            {"⭐".repeat(Math.floor(module.rating))} {module.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Select filters and click "Generate Programme" to see available modules</p>
              </div>
            )}
          </div>

          {/* Requirements Met Summary
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Requirements Met:</h3>
            <ul className="space-y-2">
              {requirementsMet.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-green-600">✓</span> {req}
                </li>
              ))}
            </ul>
          </div> */}

          {/* Submit Button */}
          <button onClick={handleSubmitApproval} className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition">
            Submit for Approval
          </button>
        </div>
      </div>

      {/* Submitted modal */}
      {showSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-lg p-6 flex flex-col items-center shadow-lg">
            <div className="text-green-600 mb-3">
              <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#34D399" strokeWidth="2" fill="#ECFBF5" />
                <path d="M7 12l3 3 7-7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-800">Submitted</div>
          </div>
        </div>
      )}

      {/* Series Grid (Original)
      {gridData && gridData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Series</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8 p-4">
            {gridData.map((item, index) => (
              <SeriesGridItem key={item.id || index} item={item} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
});

export default SeriesGrid;
