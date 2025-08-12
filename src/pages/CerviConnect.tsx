import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MapPin, Calendar, Phone } from "lucide-react";

type Center = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const centers: Center[] = [
  { id: 1, name: "Kenyatta National Hospital", address: "Upper Hill, Nairobi", lat: -1.3006, lng: 36.8065 },
  { id: 2, name: "Mbagathi Hospital", address: "Mbagathi Way, Nairobi", lat: -1.3077, lng: 36.7922 },
  { id: 3, name: "Aga Khan University Hospital", address: "Parklands, Nairobi", lat: -1.2634, lng: 36.8172 },
  { id: 4, name: "Nairobi Hospital", address: "Argwings Kodhek Rd, Nairobi", lat: -1.2959, lng: 36.7993 },
  { id: 5, name: "Mama Lucy Kibaki Hospital", address: "Kangundo Rd, Nairobi", lat: -1.2869, lng: 36.9376 },
];

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371; // km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const c = 2 * Math.asin(
    Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon)
  );
  return R * c;
}

export default function CerviConnect() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCenterId, setSelectedCenterId] = useState<number | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    document.title = "CerviConnect – Find Screening Centers";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => void 0,
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const sorted = useMemo(() => {
    if (!coords) return centers;
    return [...centers].sort((a, b) => haversine(coords, a) - haversine(coords, b));
  }, [coords]);

  const handleBook = (centerId?: number) => {
    if (centerId) setSelectedCenterId(centerId);
    const el = document.getElementById("booking");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCenterId || !name || !phone || !date || !time) return;
    const center = centers.find((c) => c.id === selectedCenterId);
    toast({
      title: "Booking requested",
      description: `${name}, your ${date} ${time} request at ${center?.name} is noted. (Demo)`
    });
    setName("");
    setPhone("");
    setDate("");
    setTime("");
  };

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find a Screening Center</h1>
        <p className="text-muted-foreground">Locate nearby facilities and request a screening slot.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="opacity-70" /> Nearby Centers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sorted.map((c) => {
              const dist = coords ? haversine(coords, c).toFixed(1) + " km" : "";
              return (
                <div key={c.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.address} {dist && `· ${dist}`}</div>
                  </div>
                  <Button variant="hero" onClick={() => handleBook(c.id)}>Book</Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card id="booking" className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="opacity-70" /> Booking Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-3">
                <label className="text-sm">Center</label>
                <select
                  className="h-11 rounded-md border bg-background px-3"
                  value={selectedCenterId}
                  onChange={(e) => setSelectedCenterId(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Select a center
                  </option>
                  {centers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-3">
                <label className="text-sm">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>

              <div className="grid gap-3">
                <label className="text-sm flex items-center gap-2"><Phone className="size-4" /> Phone number</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label className="text-sm">Date</label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm">Time</label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full">Confirm Request</Button>
              <p className="text-xs text-muted-foreground">
                SMS reminders and confirmations will be enabled after connecting Supabase and an SMS provider.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
