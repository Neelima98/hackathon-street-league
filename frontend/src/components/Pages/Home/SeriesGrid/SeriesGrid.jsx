import React, { useState } from "react";
import SeriesGridItem from "./SeriesGridItem";

const SeriesGrid = React.memo(({ data }) => {
  const gridData = data;
  const [ageRange, setAgeRange] = useState("16-18");
  const [diaspora, setDiaspora] = useState("Any");
  const [deliveryStyle, setDeliveryStyle] = useState("Any");
  const [draggedModule, setDraggedModule] = useState(null);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(null);

  const [timetableData, setTimetableData] = useState([
    { day: "Mon", class: "English", time: "9:00 - 10:30", status: "Fulfilled" },
    { day: "Tues", class: "Math", time: "9:00 - 10:30", status: "Fulfilled" },
    { day: "Wed", class: "Employability Workshop + Presentation", time: "10:00 - 11:00", status: "Fulfilled" },
    { day: "Thur", class: "Employability Workshop", time: "1:00 - 2:00", status: "Fulfilled" },
    { day: "Fri", class: "Safeguarding Workshop", time: "1:00 - 2:00", status: "Fulfilled" },
  ]);

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
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDropOnRow = (e, rowIndex) => {
    e.preventDefault();
    if (draggedModule) {
      const newTimetableData = [...timetableData];
      newTimetableData[rowIndex] = {
        ...newTimetableData[rowIndex],
        class: draggedModule.name,
      };
      setTimetableData(newTimetableData);
      setHighlightedRowIndex(rowIndex);
      setDraggedModule(null);

      // Auto-reset highlight after 2 seconds
      setTimeout(() => {
        setHighlightedRowIndex(null);
      }, 2000);
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
          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery method:</label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>16-18</option>
              <option>18-21</option>
              <option>21+</option>
            </select>
          </div>

          {/* Diaspora */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty level:</label>
            <select
              value={diaspora}
              onChange={(e) => setDiaspora(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Any</option>
              <option>African</option>
              <option>Asian</option>
            </select>
          </div>

          {/* Transport Barriers */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transport Barriers, Low Digital Skill</label>
            <div className="flex gap-2">
              <span className="inline-block px-3 py-1 bg-green-200 text-green-800 text-xs rounded">✓</span>
            </div>
          </div> */}
        </div>

        {/* Delivery Style */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill name:</label>
          <select
            value={deliveryStyle}
            onChange={(e) => setDeliveryStyle(e.target.value)}
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Any</option>
            <option>Online</option>
            <option>In-person</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-[#302f2c] hover:bg-yellow-600 text-white font-semibold rounded-lg transition">
            Generate Programme
          </button>
          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition">
            Reset
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable Section */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Automatic Cohort Timetable</h3>

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
                  <span className="text-green-600">✓</span> {req}
                </li>
              ))}
            </ul>
          </div>
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

            <div className="space-y-3">
              {optionalModules.map((module, idx) => (
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
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        {"⭐".repeat(Math.floor(module.rating))} {module.rating} {module.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <button className="w-full px-6 py-3 bg-[#302f2c] hover:bg-[#1e5edb] text-white cursor-pointer font-semibold rounded-lg transition">
            Submit for Approval
          </button>
        </div>
      </div>

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
