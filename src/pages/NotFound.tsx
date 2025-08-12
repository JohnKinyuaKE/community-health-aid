import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  useEffect(() => { document.title = "404 – Page not found"; }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>404 – Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <a href="/" className="underline">Return to Home</a>
        </CardContent>
      </Card>
    </div>
  );
}
