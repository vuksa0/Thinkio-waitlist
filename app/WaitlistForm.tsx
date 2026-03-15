"use client";

import { useRef, useState, useTransition } from "react";
import { joinWaitlist } from "./actions";

export default function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await joinWaitlist(formData);
      if (result?.success) {
        setDone(true);
        setError("");
      } else {
        setError(result?.error ?? "Something went wrong.");
      }
    });
  }

  if (done) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        backgroundColor: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.3)",
        borderRadius: 16, padding: "16px 20px",
        maxWidth: 480, margin: "0 auto",
      }}>
        <span style={{ fontSize: 20, color: "#10B981" }}>✓</span>
        <span style={{ fontSize: 15, color: "#10B981", fontWeight: 600 }}>
          You&apos;re on the list! We&apos;ll email you when we launch.
        </span>
      </div>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
      <input
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        className="waitlist-input"
        style={{
          width: "100%",
          padding: "16px 20px",
          fontSize: 15,
          border: "1.5px solid var(--border-color)",
          borderRadius: 16,
          color: "var(--text)",
          backgroundColor: "var(--bg-secondary)",
          fontFamily: "inherit",
          marginBottom: 12,
          display: "block",
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          disabled={isPending}
          className="motion-btn"
          style={isPending ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
        >
          <span className="motion-btn-circle" aria-hidden="true" />
          <span className="motion-btn-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
          <span className="motion-btn-label">{isPending ? "Joining…" : "Join waitlist"}</span>
        </button>
      </div>
      {error && (
        <p style={{ color: "#EF4444", fontSize: 13, marginTop: 10, textAlign: "center" }}>{error}</p>
      )}
    </form>
  );
}
