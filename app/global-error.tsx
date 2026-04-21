"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#fafaf7",
          color: "#1a1d1d",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5a605f",
              marginBottom: "1rem",
            }}
          >
            Application error
          </p>
          <h1
            style={{
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: "2rem",
              lineHeight: 1.2,
              margin: "0 0 1rem",
            }}
          >
            Something went wrong.
          </h1>
          <p style={{ color: "#5a605f", marginBottom: "1.5rem" }}>
            The page failed to render. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              height: "2.75rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              padding: "0 1.5rem",
              background: "#2f3b3d",
              color: "#fafaf7",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
