export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        aria-label="Reclaim logo"
      >
        {/* Circle of wholeness */}
        <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.8" opacity="0.15" />

        {/* Sprouting leaf — healing and renewal */}
        <path
          d="M18 24c3-3.2 5-6.5 5-10a5 5 0 1 0-10 0c0 3.5 2 6.8 5 10Z"
          fill="currentColor"
          opacity="0.9"
        />

        {/* Stem of growth */}
        <path d="M18 24v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <span className="text-xl font-semibold tracking-tight">Reclaim</span>
    </div>
  );
}
