// components/Pages/Home/WeeklySessions.jsx
export default function WeeklySchedule() {
  const rows = [
    {
      day: "Mon",
      class: "Maths Workshop",
      time: "9:00 – 10:30",
      delivery: "Hybrid",
      status: "Planned",
    },
    {
      day: "Tue",
      class: "Employability",
      time: "11:00 – 12:30",
      delivery: "In‑Person",
      status: "Planned",
    },
    {
      day: "Wed",
      class: "CV Workshop",
      time: "1:00 – 2:50",
      delivery: "Online",
      status: "Planned",
    },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        This Week’s Schedule
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-900 text-sm font-semibold">
            <tr>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Session Time</th>
              <th className="px-4 py-3">Delivery</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {row.day}
                </td>
                <td className="px-4 py-3">{row.class}</td>
                <td className="px-4 py-3">{row.time}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {row.delivery}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}