// components/Pages/Home/PreviousLearningPlans.jsx

/**
 * PreviousLearningPlans
 * Props:
 * - items: Array<{ id, title, completedOn?, mode?, status? }>
 * - onItemClick: Function (optional)
 * - loading: boolean (optional)
 */

export default function PreviousLearningPlans({
  items = [],
  onItemClick,
  loading = false,
}) {
  // Default previous learning plans
  const defaultItems = [
    {
      id: "lp1",
      title: "Safeguarding Essentials",
      completedOn: "Submitted • 12 Dec 2025",
      mode: "Online",
      status: "Approved",
    },
    {
      id: "lp2",
      title: "Communication Skills",
      completedOn: "Submitted • 05 Nov 2025",
      mode: "In‑Person",
      status: "Rejected",
    },
  ];

  const effectiveItems = items.length > 0 ? items : defaultItems;
  const hasItems = effectiveItems.length > 0;

  return (
    <section
      aria-labelledby="previous-learning-title"
      className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3
          id="previous-learning-title"
          className="text-lg font-semibold text-gray-900"
        >
          Previous Learning Plans
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

      {/* Render Plans */}
      {!loading && (
        <>
          {!hasItems ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600">
                No learning plans found.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {effectiveItems.map((lp) => (
                <li
                  key={lp.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
                  onClick={() => onItemClick?.(lp.id)}
                  role={onItemClick ? "button" : undefined}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {lp.title}
                      </span>

                      {lp.mode && (
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {lp.mode}
                        </span>
                      )}
                    </div>

                    {(lp.completedOn || lp.description) && (
                      <div className="mt-1 text-sm text-gray-600">
                        {lp.completedOn ?? lp.description}
                      </div>
                    )}
                  </div>

                  <PlanStatusPill status={lp.status} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function PlanStatusPill({ status }) {
  const s = (status || "").toLowerCase();
  const map = {
    approved: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    archived: "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200",
  };

  const label = status ?? "Not Available";
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
