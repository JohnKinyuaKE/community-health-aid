import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

 type Doc = { id: string; name: string; uploadedAt: string };

export default function CancerWallet() {
  const [name, setName] = useState("");
  const [nhif, setNhif] = useState("");
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => { document.title = "Cancer Wallet – Documents & Benefits"; }, []);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const now = new Date().toISOString();
    const added = Array.from(files).map((f) => ({ id: now + f.name, name: f.name, uploadedAt: now }));
    setDocs((d) => [...added, ...d]);
    toast({ title: "Uploaded (demo)", description: `${files.length} document(s) added.` });
  };

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cancer Wallet</h1>
        <p className="text-muted-foreground">Keep your documents and link benefits from NHIF, SHA, NGOs.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm">Full name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">NHIF / SHA number</label>
              <Input value={nhif} onChange={(e) => setNhif(e.target.value)} placeholder="NHIF-XXXXX" />
            </div>
            <Button variant="hero">Save (demo)</Button>
            <p className="text-xs text-muted-foreground">Authentication and secure storage will be enabled with Supabase.</p>
          </CardContent>
        </Card>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" multiple onChange={onUpload} />
            <ul className="space-y-2">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">Uploaded {new Date(d.uploadedAt).toLocaleString()}</div>
                  </div>
                  <span className="text-xs text-accent">Pending verification</span>
                </li>
              ))}
              {docs.length === 0 && (
                <li className="text-sm text-muted-foreground">No documents yet.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
