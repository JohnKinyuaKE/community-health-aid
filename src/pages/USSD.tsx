import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 type MenuNode = {
  title: string;
  options?: { label: string; next?: MenuNode; action?: () => void }[];
};

const root: MenuNode = {
  title: "CerviConnect USSD",
  options: [
    { label: "1. Screening centers", next: { title: "Send your location via SMS to 12345 to get nearest centers." } },
    { label: "2. Educational content", next: { title: "We will send short tips daily via SMS (reply STOP to opt out)." } },
    { label: "3. Support services", next: { title: "Dial 116 for GBV support or 719 for health hotline." } },
    { label: "0. Back to main", next: undefined },
  ],
};

export default function USSD() {
  const [stack, setStack] = useState<MenuNode[]>([root]);
  const current = stack[stack.length - 1];

  useEffect(() => { document.title = "USSD – Menu Simulation"; }, []);

  const choose = (idx: number) => {
    const opt = current.options?.[idx];
    if (!opt) return;
    if (opt.action) opt.action();
    if (opt.next) setStack((s) => [...s, opt.next!]);
  };

  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const reset = () => setStack([root]);

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto shadow-elevated">
        <CardHeader>
          <CardTitle>USSD Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="mb-2 font-medium">{current.title}</div>
            <div className="space-y-2">
              {current.options?.map((o, i) => (
                <Button key={i} variant="outline" className="w-full justify-start" onClick={() => choose(i)}>
                  {o.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={back}>Back</Button>
            <Button variant="hero" onClick={reset}>Restart</Button>
          </div>
          <p className="text-xs text-muted-foreground">This is a web simulation. Real USSD requires telco integration.</p>
        </CardContent>
      </Card>
    </div>
  );
}
