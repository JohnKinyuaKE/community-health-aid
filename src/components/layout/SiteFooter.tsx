export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-foreground/70">
        © {new Date().getFullYear()} CerviConnect · Built with love for better women’s health
      </div>
    </footer>
  );
}
