import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

 type Message = { role: "user" | "bot"; text: string };
 type Lang = "en" | "sw";

 const prompts = {
  en: {
    welcome: "Hello! I’m your AI HealthBot. Tell me your symptoms.",
    placeholder: "Describe your symptoms...",
    triage: (text: string) => {
      const t = text.toLowerCase();
      if (/(severe|bleeding|faint|chest|difficulty breathing)/.test(t)) return "URGENT: Please seek medical help immediately or visit the nearest facility.";
      if (/(fever|pain|persistent|worsening)/.test(t)) return "ADVICE: Consider seeing a clinician soon for assessment.";
      return "INFO: Monitor at home, rest, hydrate, and seek care if symptoms worsen.";
    },
  },
  sw: {
    welcome: "Hujambo! Mimi ni AI HealthBot. Tafadhali eleza dalili zako.",
    placeholder: "Eleza dalili zako...",
    triage: (text: string) => {
      const t = text.toLowerCase();
      if (/(kali|damu|kuzimia|kifua|kupumua)/.test(t)) return "DHARURA: Tafuta huduma ya matibabu mara moja au tembelea kituo kilicho karibu.";
      if (/(homa|maumivu|kuendelea|kuongezeka)/.test(t)) return "USHAURI: Zuru kliniki hivi karibuni kwa tathmini.";
      return "TAARIFA: Fuata hali nyumbani, pumzika, kunywa maji, na utafute huduma iwapo dalili zitaongezeka.";
    },
  },
 } as const;

export default function AIHealthBot() {
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "AI HealthBot – Symptom Triage"; }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const copy = useMemo(() => prompts[lang], [lang]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    const reply = copy.triage(userText);
    setTimeout(() => setMessages((m) => [...m, { role: "bot", text: reply }]), 300);
    setInput("");
  };

  return (
    <div className="container py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI HealthBot</h1>
          <p className="text-muted-foreground">Chat-based symptom guidance. Not a diagnosis.</p>
        </div>
        <div className="rounded-lg border p-1">
          <div className="grid grid-cols-2">
            <Button variant={lang === "en" ? "hero" : "ghost"} size="sm" onClick={() => setLang("en")}>English</Button>
            <Button variant={lang === "sw" ? "hero" : "ghost"} size="sm" onClick={() => setLang("sw")}>Kiswahili</Button>
          </div>
        </div>
      </header>

      <Card className="max-w-2xl mx-auto shadow-elevated">
        <CardHeader>
          <CardTitle>{messages.length === 0 ? copy.welcome : "Conversation"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[50vh] overflow-auto pr-1">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={"inline-block rounded-lg border px-3 py-2 " + (m.role === "user" ? "bg-secondary" : "bg-background")}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder={copy.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button variant="hero" onClick={send}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
