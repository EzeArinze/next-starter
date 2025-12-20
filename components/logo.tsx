export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        aria-label="Letter N"
      >
        {/* Background circle */}
        <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.8" opacity="0.15" />

        {/* Letter N */}
        <path
          d="M12 26V10L24 26V10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-xl font-semibold tracking-tight">Next Starter</span>
    </div>
  );
}
