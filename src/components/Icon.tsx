type IconName =
  | "arrow"
  | "arrow-up"
  | "phone"
  | "check"
  | "grass"
  | "landscape"
  | "home"
  | "clock"
  | "location"
  | "close"
  | "menu"
  | "message"
  | "copy";

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    "arrow-up": (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    phone: (
      <path d="m8 3 3 5-3 3c2 3 3 4 6 5l3-3 4 3c0 3-2 5-5 5C9 20 4 15 3 8c0-3 2-5 5-5Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    grass: (
      <>
        <path d="M3 20h18M6 20C7 11 4 8 3 6c6 2 8 7 8 14M12 20C10 9 14 5 18 3c-2 5-2 9-1 17M18 20c0-6 2-8 4-9" />
      </>
    ),
    landscape: (
      <>
        <path d="M2 20h20M3 17l7-10 5 7 3-4 4 7M10 7l-2 3 2 1 2-1" />
        <circle cx="18" cy="5" r="2" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7M5 9v12h14V9M10 21v-7h4v7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    message: <path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 1 1 19 0Z" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="1" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
