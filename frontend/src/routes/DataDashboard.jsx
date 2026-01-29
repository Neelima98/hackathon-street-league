import { useState, useRef, useEffect } from "react";
import { fetchOutcomes, fetchProgress } from "../api/dataget";

// Custom dropdown for the slay, girrrrl!
function SlayDropdown({ options, value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative min-w-[200px]">
      <button
        type="button"
        className="w-full border rounded px-3 py-2 flex justify-between items-center bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value || label}</span>
        <span
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 max-h-48 overflow-auto animate-fadeIn">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${value === opt ? "bg-blue-50 font-bold" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DataDashboard({ data = {} }) {
  // TEST BUTTON HANDLERS
  const handleFetchOutcomes = async () => {
    const result = await fetchOutcomes();
    console.log("Outcomes result:", result);
  };
  const handleFetchProgress = async () => {
    const result = await fetchProgress();
    console.log("Progress result:", result);
  };
  // Fallbacks for each section
  const engagement = data.engagement || {
    enrolled: 85,
    attended25: 70,
    attended50: 55,
    completed: 55,
    avg: 68,
  };
  const development = data.development || {
    reading: 72,
    spelling: 68,
    spreadsheets: 60,
    cv: 55,
    avg: 64,
  };
  const outcomes = data.outcomes || {
    full: 40,
    part: 32,
    education: 20,
    training: 12,
    avg: 35,
  };
  const barriers = data.barriers || [
    { label: "Financial", value: 29 },
    { label: "Feedback", value: 21 },
    { label: "Housing Instability", value: 18 },
    { label: "Transport Issues", value: 15 },
  ];
  const workshopParticipation = data.workshopParticipation || [
    { theme: "English", value: 250 },
    { theme: "Maths", value: 210 },
    { theme: "Computing", value: 190 },
    { theme: "Problem Solving", value: 160 },
    { theme: "Other", value: 100 },
  ];

  // Slay dropdown state, queen!
  const [city, setCity] = useState("City: All Locations");
  const [programme, setProgramme] = useState("Programme: All Programme Types");
  const cityOptions = [
    "City: All Locations",
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
  ];
  const programmeOptions = [
    "Programme: All Programme Types",
    "Employability",
    "Education",
    "Sports",
    "Digital Skills",
  ];

  return (
    <div className="min-h-screen bg-white p-6 pb-[73px]">
      {/* TEST BUTTONS - REMOVE IN PRODUCTION */}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleFetchOutcomes}
        >
          Test Fetch Outcomes
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleFetchProgress}
        >
          Test Fetch Progress
        </button>
      </div>
      <h1 className="font-heading font-bold text-[28px] mb-6">
        Impact Dashboard
      </h1>
      {/* Filters - now with slay! */}
      <div className="flex flex-wrap gap-2 mb-6">
        <SlayDropdown
          options={cityOptions}
          value={city}
          onChange={setCity}
          label="City: All Locations"
        />
        <SlayDropdown
          options={programmeOptions}
          value={programme}
          onChange={setProgramme}
          label="Programme: All Programme Types"
        />
        <button className="bg-[#262E3C] text-white px-4 py-2 rounded">
          Apply Filters
        </button>
      </div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Engagement */}
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-100 text-blue-700 text-2xl border border-blue-200">
              🤝
            </span>
            Engagement
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="font-medium">Key Progression</span>
              <span className="font-bold text-2xl">100%</span>
            </div>
            <div className="flex justify-between">
              <span>Enrolled</span>
              <span className="font-bold">{engagement.enrolled}%</span>
            </div>
            <div className="flex justify-between">
              <span>Attended 25%</span>
              <span className="font-bold">{engagement.attended25}%</span>
            </div>
            <div className="flex justify-between">
              <span>Attended 50%</span>
              <span className="font-bold">{engagement.attended50}%</span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span className="font-bold">{engagement.completed}%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Avg Engagement <span className="font-bold">{engagement.avg}%</span>
          </div>
        </div>
        {/* Development */}
        <div className="bg-yellow-50 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-yellow-100 text-yellow-700 text-2xl border border-yellow-200">
              🌱
            </span>
            Development
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Reading Comprehension</span>
              <span className="font-bold">{development.reading}%</span>
            </div>
            <div className="flex justify-between">
              <span>Spelling & Grammar</span>
              <span className="font-bold">{development.spelling}%</span>
            </div>
            <div className="flex justify-between">
              <span>Spreadsheets</span>
              <span className="font-bold">{development.spreadsheets}%</span>
            </div>
            <div className="flex justify-between">
              <span>CV Writing</span>
              <span className="font-bold">{development.cv}%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Avg Development{" "}
            <span className="font-bold">{development.avg}%</span>
          </div>
        </div>
        {/* Outcomes */}
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-100 text-green-700 text-2xl border border-green-200">
              🎯
            </span>
            Outcomes
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Full-Time Employment</span>
              <span className="font-bold">{outcomes.full}%</span>
            </div>
            <div className="flex justify-between">
              <span>Part-Time Employment</span>
              <span className="font-bold">{outcomes.part}%</span>
            </div>
            <div className="flex justify-between">
              <span>Further Education</span>
              <span className="font-bold">{outcomes.education}%</span>
            </div>
            <div className="flex justify-between">
              <span>Training Courses</span>
              <span className="font-bold">{outcomes.training}%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Avg Retention <span className="font-bold">{outcomes.avg}%</span>
          </div>
        </div>
      </div>
      {/* Lower Section - matches the image exactly! */}
      <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
        {/* Top Barriers & Insights */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow p-5 flex flex-col min-w-[340px]">
          <h2 className="text-lg font-semibold mb-2">
            Top Barriers & Insights
          </h2>
          <div className="flex flex-col md:flex-row gap-2">
            {/* Barriers (left col) */}
            <div className="flex-1 min-w-[150px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-100 text-blue-700 text-2xl border border-blue-200">
                  💰
                </span>
                <span className="font-medium text-sm">
                  Financial Challenges
                </span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {barriers[0]?.value || 29}%
                  </span>
                  <span>{barriers[0]?.label || "Financial"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {barriers[1]?.value || 21}%
                  </span>
                  <span>{barriers[1]?.label || "Mental Health"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {barriers[2]?.value || 18}%
                  </span>
                  <span>{barriers[2]?.label || "Housing Instability"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {barriers[3]?.value || 15}%
                  </span>
                  <span>{barriers[3]?.label || "Transport Issues"}</span>
                </div>
              </div>
            </div>
            {/* Insights (right col) */}
            <div className="flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-orange-100 text-orange-700 text-2xl border border-orange-200">
                  💬
                </span>
                <span className="font-medium text-sm">Feedback</span>
              </div>
              <ul className="text-sm list-disc list-inside ml-2 text-gray-700">
                <li>Honest, realistic metrics</li>
                <li>Personal barrier context at every stage</li>
                <li>Flagged support for longer term retention</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Workshop Participation */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow p-5 flex flex-col min-w-[340px]">
          <h2 className="text-lg font-semibold mb-4">Workshop Participation</h2>
          <div className="w-full h-48 flex items-end gap-4 px-2">
            {/* Bar chart, hardcoded for now to match image */}
            {workshopParticipation.map((item, idx) => (
              <div
                className="flex flex-col items-center flex-1"
                key={item.theme}
              >
                <div
                  className={`w-8 rounded-t ${
                    idx === 0
                      ? "bg-blue-300"
                      : idx === 1 || idx === 2
                        ? "bg-blue-200"
                        : idx === 3
                          ? "bg-blue-100"
                          : "bg-blue-50"
                  }`}
                  style={{ height: `${160 - idx * 30}px` }}
                ></div>
                <span className="text-xs mt-1 text-center">{item.theme}</span>
                <span className="text-xs text-gray-500">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-sm text-gray-700 font-medium">
            Workshop Themes
          </div>
        </div>
      </div>
    </div>
  );
}
