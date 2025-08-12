import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-health.jpg";
import { Link } from "react-router-dom";
import { HeartPulse, MapPin, MessageSquare } from "lucide-react";

const Index = () => {
  const onMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div>
      <section onMouseMove={onMouseMove} className="relative overflow-hidden border-b bg-gradient-primary">
        <div className="spotlight">
          <div className="container grid gap-10 py-20 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">CerviConnect – Women’s Health & Support</h1>
              <p className="text-lg text-primary-foreground/90 md:pr-8">
                Locate screening centers, get AI triage guidance, access USSD, manage your Cancer Wallet, share stories, and report environmental risks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="xl" className="animate-float"><Link to="/cerviconnect">Find Screening</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/ai-healthbot">Try AI HealthBot</Link></Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <Feature icon={<MapPin />} label="Nearby centers" />
                <Feature icon={<MessageSquare />} label="USSD access" />
                <Feature icon={<HeartPulse />} label="Cancer Wallet" />
              </div>
            </div>
            <div className="relative">
              <img src={heroImage} alt="CerviConnect hero – women’s health platform" className="rounded-xl border shadow-elevated" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="container py-16">
        <h2 className="text-2xl font-semibold mb-4">What you can do</h2>
        <p className="text-muted-foreground max-w-3xl">
          CerviConnect brings together access to screening, guidance, and community. Explore the modules via the navigation above.
        </p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "CerviConnect",
        url: "/",
        inLanguage: "en"
      }) }} />
    </div>
  );
};

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-lg border bg-background/70 p-3 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}

export default Index;
