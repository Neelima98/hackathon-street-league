export default function CalendarIcon({ active }) {
  const classes = active ? "stroke-dark-primary" : "stroke-light-primary";

  return (
    <div className="group">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="17"
          rx="3"
          className={`stroke-[2px] ${classes} group-hover:stroke-text-secondary`}
        />

        <path
          d="M3 10h18"
          className={`stroke-[2px] ${classes} group-hover:stroke-text-secondary`}
        />

        <path
          d="M8 2v4M16 2v4"
          className={`stroke-[2px] ${classes} group-hover:stroke-text-secondary`}
        />

        {/* Dots */}
        <circle cx="8" cy="14" r="1.3" className={`${classes} fill-current`} />
        <circle cx="12" cy="14" r="1.3" className={`${classes} fill-current`} />
        <circle cx="16" cy="14" r="1.3" className={`${classes} fill-current`} />
      </svg>
    </div>
  );
}