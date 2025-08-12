import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/cerviconnect", label: "CerviConnect" },
  { to: "/ai-healthbot", label: "AI HealthBot" },
  { to: "/ussd", label: "USSD" },
  { to: "/cancer-wallet", label: "Cancer Wallet" },
  { to: "/shujaastories", label: "ShujaaStories" },
  { to: "/mtaani-watch", label: "Mtaani Watch" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-primary" aria-hidden />
          <span className="text-lg font-semibold">CerviConnect</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-smooth hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/70"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="#learn">Learn more</a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/cerviconnect">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
