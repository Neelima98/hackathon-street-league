// components/Pages/Home/Notes.jsx
import { useEffect, useState } from "react";

/**
 * Notes
 * Props:
 * - initialText: string (optional) - prefill notes
 * - loading: boolean (optional) - show skeleton while fetching
 * - onSave: Function (optional) - called with current text
 * - disabled: boolean (optional) - disable textarea & button
 */
export function Notes({
  initialText = "",
  loading = false,
  onSave,
  disabled = false,
}) {
  const [text, setText] = useState(initialText);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  // keep local state in sync if initialText changes (e.g., refetch)
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = async () => {
    if (disabled || saving) return;
    setSaving(true);
    try {
      await Promise.resolve(onSave?.(text)); // supports sync or async
      setSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      aria-labelledby="notes-title"
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3
          id="notes-title"
          className="text-lg font-semibold text-gray-900"
        >
          Notes
        </h3>

        {savedAt && (
          <span
            className="text-xs text-gray-500"
            aria-live="polite"
            aria-atomic="true"
          >
            Saved {formatRelative(savedAt)}
          </span>
        )}
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div aria-busy="true">
          <div className="h-24 w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="mt-3 h-9 w-28 animate-pulse rounded bg-gray-100" />
        </div>
      ) : (
        <>
          <label htmlFor="notes-textarea" className="sr-only">
            Write down any important notes
          </label>

          <textarea
            id="notes-textarea"
            placeholder="Write down any important notes…"
            className="min-h-[120px] w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:bg-gray-50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {text?.length ? `${text.length} characters` : "No content yet"}
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={disabled || saving}
              className="inline-flex items-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Spinner className="mr-2" />
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function Spinner({ className = "" }) {
  return (
    <svg
      className={`h-4 w-4 animate-spin ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function formatRelative(date) {
  try {
    const diff = Date.now() - date.getTime();
    if (diff < 60_000) return "just now";
    if (diff < 3_600_000) {
      const m = Math.floor(diff / 60_000);
      return `${m} min${m > 1 ? "s" : ""} ago`;
    }
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}