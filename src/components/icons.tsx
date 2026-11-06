const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const MailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const LockIcon = () => (
  <svg {...base}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const UserIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);
export const AlertIcon = () => (
  <svg {...base}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);
export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5Z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.5 5.8c4.4-4.1 7-10.1 7-17.5Z"
    />
    <path
      fill="#FBBC05"
      d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1Z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48Z"
    />
  </svg>
);

// ---- Ícones da tela Descobrir / Navbar (aceitam size e className) ----
type IconProps = { size?: number; className?: string };
const sv = ({ size = 20, className }: IconProps) => ({
  ...base,
  width: size,
  height: size,
  className,
});

export const SearchIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const HeartIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.5 5c2 0 3.5 1.1 5.5 3.2C14 6.1 15.5 5 17.5 5c3.5 0 5.3 3.6 4 6.8C19.5 16.4 12 21 12 21Z" />
  </svg>
);
export const LogoutIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const CakeIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <path d="M4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0M12 12V9M12 3.5c1 1.2 1 2.2 0 3-1-.8-1-1.8 0-3Z" />
  </svg>
);
export const PawIcon = (p: IconProps) => (
  <svg {...sv(p)} fill="currentColor" stroke="none">
    <ellipse cx="12" cy="16" rx="5.2" ry="4.2" />
    <ellipse cx="5" cy="11" rx="2" ry="2.8" />
    <ellipse cx="9" cy="6.5" rx="2" ry="2.8" />
    <ellipse cx="15" cy="6.5" rx="2" ry="2.8" />
    <ellipse cx="19" cy="11" rx="2" ry="2.8" />
  </svg>
);
// Três "raios" que saem do título; use className="-scale-x-100" para espelhar
export const Sparks = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 52"
    width="40"
    height="52"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    className={className}
  >
    <path d="M18 12 6 4M16 26H2M18 40 6 48" />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);
export const ChatIcon = (p: IconProps) => (
  <svg {...sv(p)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
);
