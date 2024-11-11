import React, { useEffect, useState } from "react";

const Username = () => {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <div className="whitespace-nowrap">
      <span className="text-secondary">guest</span>
      <span className="text-foreground">@</span>
      <span className="text-primary">{hostname}</span>
      <span className="text-foreground">:$ ~&nbsp;</span>
    </div>
  );
};

export default Username;
