// components/Pages/Home/StaffWorkshops.jsx

/**
 * StaffWorkshops
 * Props:
 * - items: Array<{ id, title, time?, mode?, status? }>
 * - onItemClick: Function (optional)
 * - loading: boolean (optional)
 */

export default function StaffWorkshops({
  items = [],
  onItemClick,
  loading = false,
}) {
  // Default workshops (your request)
  const defaultItems = [
    {
      id: "w1",
      title: "Cooking For Confidence",
      time: "Tue 10:00",
      mode: "In‑Person",
      status: "Planned",
    },
    {
      id: "w2",
      title: "Youth Mental Health",
      time: "Thu 14:00",
      mode: "Online",
      status: "Planned",
    },
  ];

  const effectiveItems = items.length > 0 ? items : defaultItems;
  const hasItems = effectiveItems.length > 0;

  return (
    <section
      aria-labelledby="staff-workshops-title"
      className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3
          id="staff-workshops-title"
          className="text-lg font-semibold text-gray-900"
        >
          Staff Fit Workshops
        </h3>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <ul className="space-y-3" aria-busy="true">
          {Array.from({ length: 2 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
            >
              <div className="flex-1">
                <div className="mb-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-40 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      )}

      {/* Render Workshops */}
      {!loading && (
        <>
          {!hasItems ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600">
                No workshops scheduled. Check back later.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {effectiveItems.map((w) => (
                <li
                  key={w.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
                  onClick={() => onItemClick?.(w.id)}
                  role={onItemClick ? "button" : undefined}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {w.title}
                      </span>
                      {w.mode && (
                        <span className="rounded bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                          {w.mode}
                        </span>
                      )}
                    </div>

                    {(w.time || w.description) && (
                      <div className="mt-1 text-sm text-gray-600">
                        {w.time ?? w.description}
                      </div>
                    )}
                  </div>

                  <WorkshopStatusPill status={w.status} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function WorkshopStatusPill({ status }) {
  const s = (status || "").toLowerCase();
  const map = {
    planned: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
    ongoing: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200",
    completed: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    canceled: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  };

  const label = status ?? "Planned";
  const cls =
    map[s] ||
    "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";

  return (
    <span
      className={`ml-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}