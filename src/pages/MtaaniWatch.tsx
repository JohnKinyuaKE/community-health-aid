import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMapEvents } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

 type Report = { id: string; lat: number; lng: number; type: string; note?: string; createdAt: string };

const TYPES = ["Pollution", "Illegal dump", "Industrial smoke"] as const;

function ClickCapture({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MtaaniWatch() {
  const [reports, setReports] = useState<Report[]>([]);
  const [pending, setPending] = useState<{ lat: number; lng: number } | null>(null);
  const [type, setType] = useState<typeof TYPES[number]>("Pollution");
  const [note, setNote] = useState("");

  useEffect(() => { document.title = "Mtaani Watch – Community Reports"; }, []);

  const add = () => {
    if (!pending) return;
    const r: Report = { id: Date.now().toString(), lat: pending.lat, lng: pending.lng, type, note, createdAt: new Date().toISOString() };
    setReports((rs) => [r, ...rs]);
    setPending(null);
    setNote("");
    toast({ title: "Report added (demo)", description: `${r.type} near (${r.lat.toFixed(3)}, ${r.lng.toFixed(3)})` });
  };

  const notify = () => toast({ title: "Notified (demo)", description: "Local authorities and environmental bodies have been notified." });

  const center = useMemo(() => ({ lat: -1.286389, lng: 36.817223 }), []);

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mtaani Watch</h1>
        <p className="text-muted-foreground">Geo-tag pollution, dumps, or industrial threats and raise alerts.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[420px] rounded-lg overflow-hidden border">
              <MapContainer {...({ center: [center.lat, center.lng], zoom: 12, style: { height: "100%", width: "100%" } } as any)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickCapture onClick={(lat, lng) => setPending({ lat, lng })} />
                {reports.map((r) => (
                  <Circle key={r.id} {...({ center: [r.lat, r.lng], radius: 80, color: '#0ea5a3' } as any)}>
                    <Popup>
                      <div className="text-sm">
                        <div className="font-medium">{r.type}</div>
                        <div className="text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                        {r.note && <div className="mt-1">{r.note}</div>}
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm">Type</label>
              <select className="h-11 rounded-md border bg-background px-3" value={type} onChange={(e) => setType(e.target.value as any)}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Note (optional)</label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Eg. Strong smell of smoke..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Selected location</label>
              <div className="rounded-md border p-3 text-sm text-muted-foreground min-h-11">
                {pending ? `${pending.lat.toFixed(5)}, ${pending.lng.toFixed(5)}` : "Tap on the map to select a location"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="hero" onClick={add} disabled={!pending}>Add Report</Button>
              <Button variant="outline" onClick={notify} disabled={reports.length === 0}>Notify Authorities</Button>
            </div>
            <div className="pt-2">
              <div className="text-sm font-medium mb-2">Recent reports</div>
              <ul className="space-y-2 max-h-48 overflow-auto pr-1">
                {reports.map((r) => (
                  <li key={r.id} className="rounded-md border p-3 text-sm flex items-center justify-between">
                    <span>{r.type}</span>
                    <span className="text-muted-foreground">{new Date(r.createdAt).toLocaleTimeString()}</span>
                  </li>
                ))}
                {reports.length === 0 && <li className="text-sm text-muted-foreground">No reports yet.</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
