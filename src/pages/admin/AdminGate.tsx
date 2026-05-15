import { useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getAdminPassword, setAdminPassword } from "@/lib/admin-auth";

interface Props {
  children: ReactNode;
}

export function AdminGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean>(() => !!getAdminPassword());
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setAdminPassword(value.trim());
    setUnlocked(true);
  }

  if (unlocked) return <>{children}</>;

  return (
    <>
      <Helmet>
        <title>Admin · hlpr ministries</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm p-6">
          <h1 className="text-xl font-semibold">Admin access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the shared admin password to view the SEO dashboard.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="space-y-1">
              <Label htmlFor="pw">Password</Label>
              <Input
                id="pw"
                type="password"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </Card>
      </main>
    </>
  );
}
