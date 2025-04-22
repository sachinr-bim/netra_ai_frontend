export default function ChevronDownIcon({ size = 5, className = "", ...props }){

    return(
        <svg
          className={`h-${size} w-${size} ${className}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      );
}