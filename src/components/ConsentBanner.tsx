import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === "unset");
    return subscribeConsent((s) => setVisible(s === "unset"));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm rounded-xl border border-border bg-background/95 backdrop-blur shadow-lg p-4"
    >
      <p className="text-sm text-foreground">
        We use cookies and anonymized session analytics (Microsoft Clarity) to
        understand how visitors use this site and improve it. No personal data
        is sold.{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-primary">
          Learn more
        </a>
        .
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConsent("declined")}
        >
          Decline
        </Button>
        <Button size="sm" onClick={() => setConsent("accepted")}>
          Accept
        </Button>
      </div>
    </div>
  );
}
