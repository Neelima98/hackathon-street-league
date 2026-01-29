// components/Pages/Home/TodaySessions.jsx
export default function TodaysSessions() {
  const session = {
    title: "Summer Hackathon",
    time: "10:00 – 12:00",
    location: "Hackathon Room 401",
    mode: "Hybrid",
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Today's Sessions
      </h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-3">
        {/* Header row: title on left, mode pill + action button on right */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            {session.title}
          </h3>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {session.mode}
            </span>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-[#302f2c] px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 transition-colors"
            >
              View Learning Material
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {session.time} — {session.location}
        </p>
      </div>
    </section>
  );
}