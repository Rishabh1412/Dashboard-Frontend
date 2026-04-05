import React from "react";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full border-t border-border py-6 text-center">
      <p className="text-xs font-medium tracking-tight text-content-muted">
        &copy; {new Date().getFullYear()} FLOW. All rights reserved.
      </p>
    </footer>
  );
}