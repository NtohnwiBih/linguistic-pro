"use client";

import { useEffect } from "react";

// Last-resort boundary for errors thrown in the root layout. It replaces the layout,
// so it renders its own <html>/<body> and uses no providers or translations.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "1.25rem" }}>Something went wrong</h1>
        <p style={{ color: "#667085" }}>Please try again.</p>
        <button onClick={reset} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
