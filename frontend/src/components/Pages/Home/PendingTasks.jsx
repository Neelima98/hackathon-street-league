// components/Pages/Home/PendingTasks.jsx
import { useMemo } from "react";

/**
 * PendingTasks
 * Props:
 * - items: Array<{ id, title, dueDate?, tag?, status? }>
 * - onViewAll: Function (optional)
 * - loading: boolean (optional)
 */
export default function PendingTasks({
  items = [],
  onViewAll,
  loading = false,
}) {
  const hasItems = items && items.length > 0;

  const sortedItems = useMemo(() => {
    // Example: sort by dueDate if present, else by title
    return [...items].sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [items]);

  return (
    <section
      aria-labelledby="pending-tasks-title"
      className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3
          id="pending-tasks-title"
          className="text-lg font-semibold text-gray-900"
        >
          Pending Tasks
        </h3>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View All
          </button>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <ul className="space-y-3" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className="flex items-start justify-between rounded-lg border border-gray-100 p-3"
            >
              <div className="flex-1">
                <div className="mb-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      )}

      {!loading && (
        <>
          {!hasItems ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600">
                No pending tasks — you’re all caught up 🎉
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {sortedItems.map((t) => (
                <li
                  key={t.id}
                  className="flex items-start justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {t.title}
                      </span>
                      {t.tag && (
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {t.tag}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      {t.dueDate ? (
                        <>Due: {formatDate(t.dueDate)}</>
                      ) : (
                        <span className="text-gray-400">No due date</span>
                      )}
                    </div>
                  </div>

                  <StatusPill status={t.status} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function StatusPill({ status }) {
  const s = (status || "").toLowerCase();
  const map = {
    pending:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    blocked: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    inprogress:
      "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200",
    done: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  };

  const label =
    status ??
    "Pending";

  const cls =
    map[s] ||
    "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";

  return (
    <span
      className={`ml-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}

function formatDate(value) {
  try {
    const d = new Date(value);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}
