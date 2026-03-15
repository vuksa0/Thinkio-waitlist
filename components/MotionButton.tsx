"use client";

interface Props {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function MotionButton({ label, onClick, type = "button", disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="motion-btn"
      style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
    >
      <span className="motion-btn-circle" aria-hidden="true" />
      <span className="motion-btn-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
      <span className="motion-btn-label">{label}</span>
    </button>
  );
}
