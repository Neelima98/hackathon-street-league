export default function LessonIcon({ active }) {
  const classes = active ? "stroke-dark-primary" : "stroke-light-primary";
  return (
    <div className="group">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V24C22 25.1046 21.1046 26 20 26H4C2.89543 26 2 25.1046 2 24V6Z"
          strokeLinecap="round"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
        <path
          d="M26 8V22C26 23.1046 25.1046 24 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
        <path
          d="M6 10H16M6 15H16M6 20H12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
      </svg>
    </div>
  );
}
